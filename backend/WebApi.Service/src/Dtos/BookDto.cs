using WebApi.Core;

namespace WebApi.Service;

public class BookReadDto
{
    public Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Isbn { get; init; }
    public DateTime PublishedDate { get; init; }
    public required List<Guid> AuthorIds { get; init; }
    public required List<string> AuthorNames { get; init; }
    public string? Description { get; init; }
    public int Quantity { get; init; }
}

public class BookCreateUpdateDto
{
    public required string Title { get; init; }
    public string? Isbn { get; init; }
    public DateTime PublishedDate { get; init; }
    public required List<Guid> AuthorIds { get; init; }
    public string? Description { get; init; }
    public int Quantity { get; init; }
}