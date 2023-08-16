using Microsoft.EntityFrameworkCore;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Infrastructure;

public class BookMapper : IBookMapper
{
    private readonly DatabaseContext _context;

    public BookMapper(DatabaseContext dbContext)
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
}