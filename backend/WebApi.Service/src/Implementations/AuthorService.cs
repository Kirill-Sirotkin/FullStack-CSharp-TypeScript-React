using WebApi.Core;

namespace WebApi.Service;

public class AuthorService : BaseService<Author, AuthorReadDto, AuthorCreateUpdateDto, AuthorCreateUpdateDto>, IAuthorService
{
    public AuthorService(IAuthorRepository authorRepo, IAuthorMapper mapper) : base(authorRepo, mapper) { }
}