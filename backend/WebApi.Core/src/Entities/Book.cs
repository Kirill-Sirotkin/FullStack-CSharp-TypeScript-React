using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Core;

public class Book : IdBase
{
    public required string Title { get; set; }
    public string? Isbn { get; set; }
    public DateTime PublishedDate { get; set; }
    public Author? Author { get; set; } = null;
    public string? Description { get; set; }
    public int Quantity { get; set; }
}