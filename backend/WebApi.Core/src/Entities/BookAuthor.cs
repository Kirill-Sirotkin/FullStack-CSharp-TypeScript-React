namespace WebApi.Core;

public class BookAuthor
{
    public required Book Book { get; set; }
    public required Author Author { get; set; }
}