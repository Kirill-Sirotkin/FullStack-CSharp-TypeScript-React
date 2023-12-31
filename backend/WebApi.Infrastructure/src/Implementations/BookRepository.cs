using Microsoft.EntityFrameworkCore;
using WebApi.Core;

namespace WebApi.Infrastructure;

public class BookRepository : BaseRepository<Book>, IBookRepository
{
    public BookRepository(DatabaseContext dbContext) : base(dbContext) { }

    public override async Task<IEnumerable<Book>> GetAll(QueryOptions options)
    {
        if (_context.Books is not null)
        {
            var collection = await _context.Books.Include(b => b.Authors).ToArrayAsync();
            if (options.SearchWord != string.Empty)
                collection =
                    collection.Where(obj => obj.Title.Contains(options.SearchWord.Trim(), StringComparison.OrdinalIgnoreCase)).ToArray();
            return GetCollectionWithOptions(options, collection);
        }
        return Array.Empty<Book>();
    }

    public override async Task<Book?> GetById(Guid id)
    {
        if (_context.Books is not null) return await _context.Books
            .AsNoTracking()
            .Include(b => b.Authors)
            .FirstOrDefaultAsync(entity => entity.Id == id);
        return null;
    }
}