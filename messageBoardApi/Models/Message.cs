namespace messageBoardApi.Models
{
  public class Message
  {
    public long Id { get; set; }
    public string? Name { get; set; }
    public string? Content { get; set; }
    public DateTime? CreatedAt { get; set; }
  }
}
