using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace messageBoardApi.Models
{
  public class MessageBoardContext : DbContext
  {
    public MessageBoardContext(DbContextOptions<MessageBoardContext> options)
      : base(options)
    {
    }
    public DbSet<Message> Messages { get; set; } = null;
  }
}
