using Microsoft.EntityFrameworkCore;
using WebApi.Core;

namespace WebApi.Infrastructure;

public class AuthorRepository : BaseRepository<Author>, IAuthorRepository
{
    public AuthorRepository(DatabaseContext dbContext) : base(dbContext) { }

    public override async Task<IEnumerable<Author>> GetAll(QueryOptions options)
    {
        if (_context.Authors is not null) return await _context.Authors.Include(a => a.Books).ToArrayAsync();
        return Array.Empty<Author>();
    }
}