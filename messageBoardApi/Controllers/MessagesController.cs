#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Probst.AspNetCore.Nats;
using messageBoardApi.Models;

namespace messageBoardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly MessageBoardContext _context;
        private readonly IJsonEncodedConnection _natsConnection;
        private readonly string _topic;

        public MessagesController(MessageBoardContext context
          , IJsonEncodedConnection natsConnection, IConfiguration config)
        {
            _context = context;
            _natsConnection = natsConnection;
            _topic = config["Nats:Topic"];
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(long id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        // POST: api/Messages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(Message message)
        {
            message.CreatedAt = DateTime.Now.ToUniversalTime();
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            _natsConnection.Publish(_topic, new MqEvent("created", message));
            return CreatedAtAction("GetMessage", new { id = message.Id }, message);
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(long id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();
            _natsConnection.Publish(_topic, new MqEvent( "deleted", new Message {
                Id = message.Id
              }
            ));

            return NoContent();
        }

        private bool MessageExists(long id)
        {
            return _context.Messages.Any(e => e.Id == id);
        }
    }
}
