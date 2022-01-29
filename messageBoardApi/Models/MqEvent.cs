namespace messageBoardApi.Models
{
  public class MqEvent
  {
    public string Event { get; set; }
    public Message Payload { get; set; }

    public MqEvent(string e, Message m) {
      Event = e;
      Payload = m;
    }
  }
}
