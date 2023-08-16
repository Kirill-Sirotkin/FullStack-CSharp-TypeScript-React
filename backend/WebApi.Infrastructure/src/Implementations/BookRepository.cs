using WebApi.Core;

namespace WebApi.Infrastructure;

public class BookRepository : BaseRepository<Book>, IBookRepository
{
    public BookRepository(DatabaseContext dbContext) : base(dbContext) { }
}