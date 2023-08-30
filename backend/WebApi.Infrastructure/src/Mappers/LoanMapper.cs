using Microsoft.EntityFrameworkCore;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Infrastructure;

public class LoanMapper : ILoanMapper
{
    private readonly DatabaseContext _context;

    public LoanMapper(DatabaseContext dbContext)
    {
        _context = dbContext;
    }

    public Loan MapFromCreate(LoanCreateUpdateDto entityCreate)
    {
        if (_context.Users is null) throw new Exception("Users table is null");
        if (_context.Books is null) throw new Exception("Users table is null");
        var result = new Loan
        {
            Id = Guid.NewGuid(),
            User = _context.Users.AsNoTracking().First(u => u.Id == entityCreate.UserId),
            Book = _context.Books.AsNoTracking().First(b => b.Id == entityCreate.BookId),
            TakenDate = entityCreate.TakenDate,
            DueDate = entityCreate.DueDate,
            ReturnedDate = entityCreate.ReturnedDate,
            Status = entityCreate.Status
        };
        return result;
    }

    public Loan MapFromUpdate(Loan previousEntity, LoanCreateUpdateDto entityUpdate)
    {
        if (_context.Users is null) throw new Exception("Users table is null");
        if (_context.Books is null) throw new Exception("Users table is null");
        var result = new Loan
        {
            Id = previousEntity.Id,
            User = _context.Users.AsNoTracking().First(u => u.Id == entityUpdate.UserId),
            Book = _context.Books.AsNoTracking().First(b => b.Id == entityUpdate.BookId),
            TakenDate = entityUpdate.TakenDate,
            DueDate = entityUpdate.DueDate,
            ReturnedDate = entityUpdate.ReturnedDate,
            Status = entityUpdate.Status
        };
        return result;
    }

    public LoanReadDto MapToRead(Loan entity)
    {
        var result = new LoanReadDto
        {
            Id = entity.Id,
            UserId = entity.User.Id,
            BookId = entity.Book.Id,
            TakenDate = entity.TakenDate,
            DueDate = entity.DueDate,
            ReturnedDate = entity.ReturnedDate,
            Status = entity.Status
        };
        return result;
    }
}