using WebApi.Core;
using WebApi.Service;

namespace WebApi.Infrastructure;

public class AuthorMapper : IAuthorMapper
{
    private readonly DatabaseContext _context;

    public AuthorMapper(DatabaseContext dbContext)
    {
        _context = dbContext;
    }

    public AuthorReadDto MapToRead(Author entity)
    {
        var result = new AuthorReadDto
        {
            Id = entity.Id,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            Biography = entity.Biography,
            BookIds = GetBookIds(entity.Books),
            BookTitles = GetBookTitles(entity.Books)
        };
        return result;
    }

    private List<Guid> GetBookIds(List<Book> books)
    {
        if (books is null) return new List<Guid>();
        if (books.Count < 1) return new List<Guid>();
        return books.Select(b => b.Id).ToList();
    }

    private List<string> GetBookTitles(List<Book> books)
    {
        if (books is null) return new List<string>();
        if (books.Count < 1) return new List<string>();
        return books.Select(b => b.Title).ToList();
    }

    public Author MapFromCreate(AuthorCreateUpdateDto entityCreate)
    {
        var result = new Author
        {
            Id = Guid.NewGuid(),
            FirstName = entityCreate.FirstName,
            LastName = entityCreate.LastName,
            Biography = entityCreate.Biography,
            Books = _context.Books?.Where(b => entityCreate.BookIds.Contains(b.Id)).ToList() ?? new List<Book>()
        };
        return result;
    }

    public Author MapFromUpdate(Author previousEntity, AuthorCreateUpdateDto entityUpdate)
    {
        var result = new Author
        {
            Id = previousEntity.Id,
            FirstName = entityUpdate.FirstName,
            LastName = entityUpdate.LastName,
            Biography = entityUpdate.Biography,
            Books = _context.Books?.Where(b => entityUpdate.BookIds.Contains(b.Id)).ToList() ?? new List<Book>()
        };
        return result;
    }
}