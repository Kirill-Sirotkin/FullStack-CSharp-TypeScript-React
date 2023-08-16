namespace WebApi.Core;

public class Author : IdBase
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Biography { get; set; }
}