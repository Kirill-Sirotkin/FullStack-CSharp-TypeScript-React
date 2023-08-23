using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

[Authorize(Roles = "Admin, Librarian")]
public class AuthorController : LibraryControllerBase<Author, AuthorReadDto, AuthorCreateUpdateDto, AuthorCreateUpdateDto>
{
    public AuthorController(IAuthorService baseService) : base(baseService) { }

    [AllowAnonymous]
    [HttpGet]
    public override async Task<ActionResult<IEnumerable<AuthorReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
    {
        return await base.GetAll(queryOptions);
    }

    [AllowAnonymous]
    [HttpGet("{id:Guid}")]
    public override async Task<ActionResult<AuthorReadDto>> GetById([FromRoute] Guid id)
    {
        return await base.GetById(id);
    }
}