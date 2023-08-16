using WebApi.Core;

namespace WebApi.Service;

public class AuthorReadDto
{
    public Guid Id { get; init; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Biography { get; set; }
    public required List<Book> Books { get; set; }
}

public class AuthorCreateUpdateDto
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Biography { get; set; }
    public required List<Guid> BookIds { get; set; }
}