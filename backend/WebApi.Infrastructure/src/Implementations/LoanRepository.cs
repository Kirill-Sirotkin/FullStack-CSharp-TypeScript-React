using Microsoft.EntityFrameworkCore;
using WebApi.Core;

namespace WebApi.Infrastructure;

public class LoanRepository : BaseRepository<Loan>, ILoanRepository
{
    public LoanRepository(DatabaseContext dbContext) : base(dbContext) { }

    public override async Task<Loan?> GetById(Guid id)
    {
        if (_context.Loans is not null) return await _context.Loans
            .Include(l => l.User)
            .Include(l => l.Book)
            .FirstOrDefaultAsync(l => l.Id == id);
        return null;
    }

    public override async Task<IEnumerable<Loan>> GetAll(QueryOptions options)
    {
        if (_context.Loans is not null) return await _context.Loans
            .Include(l => l.User)
            .Include(l => l.Book)
            .ToArrayAsync();
        return Array.Empty<Loan>(); ;
    }
}