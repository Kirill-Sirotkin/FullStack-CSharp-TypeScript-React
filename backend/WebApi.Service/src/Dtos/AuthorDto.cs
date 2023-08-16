using WebApi.Core;

namespace WebApi.Service;

public class AuthorReadDto
{
    public Guid Id { get; init; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Biography { get; set; }
    public required List<Guid> BookIds { get; init; }
    public required List<string> BookTitles { get; init; }
}

public class AuthorCreateUpdateDto
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Biography { get; set; }
    public required List<Guid> BookIds { get; set; }
}