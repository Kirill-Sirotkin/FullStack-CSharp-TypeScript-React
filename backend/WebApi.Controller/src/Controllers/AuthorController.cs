using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

public class AuthorController : LibraryControllerBase<Author, AuthorReadDto, AuthorCreateUpdateDto, AuthorCreateUpdateDto>
{
    public AuthorController(IAuthorService baseService) : base(baseService) { }
}