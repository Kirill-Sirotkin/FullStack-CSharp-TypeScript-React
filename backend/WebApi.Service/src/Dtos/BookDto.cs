using WebApi.Core;

namespace WebApi.Service;

public class BookReadDto
{
    public Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Isbn { get; init; }
    public DateTime PublishedDate { get; init; }
    public Guid? AuthorId { get; init; }
    public string? AuthorName { get; init; }
    public string? Description { get; init; }
    public int Quantity { get; init; }
}

public class BookCreateUpdateDto
{
    public required string Title { get; init; }
    public string? Isbn { get; init; }
    public DateTime PublishedDate { get; init; }
    public Guid? AuthorId { get; init; }
    public string? Description { get; init; }
    public int Quantity { get; init; }
}