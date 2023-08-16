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
            AuthorId = entity.Author?.Id,
            AuthorName = $"{entity.Author?.FirstName} {entity.Author?.LastName}",
            Description = entity.Description,
            Quantity = entity.Quantity
        };
        return result;
    }

    public Book MapFromCreate(BookCreateUpdateDto entityCreate)
    {
        var result = new Book
        {
            Id = Guid.NewGuid(),
            Title = entityCreate.Title,
            Isbn = entityCreate.Isbn,
            PublishedDate = entityCreate.PublishedDate,
            Author = _context.Authors?.FirstOrDefault(a => a.Id == (entityCreate.AuthorId ?? Guid.Empty)),
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
            Author = _context.Authors?.FirstOrDefault(a => a.Id == (entityUpdate.AuthorId ?? Guid.Empty)),
            Description = entityUpdate.Description,
            Quantity = entityUpdate.Quantity
        };
        return result;
    }
}