using Microsoft.EntityFrameworkCore;
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

    public BookReadDto MapToRead(Book entity)
    {
        var result = new BookReadDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Isbn = entity.Isbn,
            PublishedDate = entity.PublishedDate,
            AuthorIds = new List<Guid>(),
            // AuthorIds = entity.Authors.Select(a => a.Id).ToList(),
            AuthorNames = GetAuthorNames(entity.Authors),
            Description = entity.Description,
            Quantity = entity.Quantity
        };
        return result;
    }

    private List<string> GetAuthorNames(List<Author> authors)
    {
        if (authors is null) return new List<string>();
        if (authors.Count < 1) return new List<string>();
        return authors.Select(a => $"{a.FirstName} {a.LastName}").ToList();
    }

    public Book MapFromCreate(BookCreateUpdateDto entityCreate)
    {
        var result = new Book
        {
            Id = Guid.NewGuid(),
            Title = entityCreate.Title,
            Isbn = entityCreate.Isbn,
            PublishedDate = entityCreate.PublishedDate,
            Authors = _context.Authors?.Where(a => entityCreate.AuthorIds.Contains(a.Id)).ToList() ?? new List<Author>(),
            Description = entityCreate.Description,
            Quantity = entityCreate.Quantity
        };
        return result;
    }

    public Book MapFromUpdate(Book previousEntity, BookCreateUpdateDto entityUpdate)
    {
        var result = new Book
        {
            Id = previousEntity.Id,
            Title = entityUpdate.Title,
            Isbn = entityUpdate.Isbn,
            PublishedDate = entityUpdate.PublishedDate,
            Authors = _context.Authors?.Where(a => entityUpdate.AuthorIds.Contains(a.Id)).ToList() ?? new List<Author>(),
            Description = entityUpdate.Description,
            Quantity = entityUpdate.Quantity
        };
        return result;
    }

    public AuthorReadDto MapToRead(Author entity)
    {
        var result = new AuthorReadDto
        {
            Id = entity.Id,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            Biography = entity.Biography,
            Books = entity.Books
        };
        return result;
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