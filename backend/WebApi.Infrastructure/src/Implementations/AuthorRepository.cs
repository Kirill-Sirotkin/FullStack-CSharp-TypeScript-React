using WebApi.Core;

namespace WebApi.Infrastructure;

public class AuthorRepository : BaseRepository<Author>, IAuthorRepository
{
    public AuthorRepository(DatabaseContext dbContext) : base(dbContext) { }
}