using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

[EnableCors]
[Authorize(Roles = "Admin, Librarian")]
public class BookController : LibraryControllerBase<Book, BookReadDto, BookCreateUpdateDto, BookCreateUpdateDto>
{
    public BookController(IBookService baseService) : base(baseService) { }

    [AllowAnonymous]
    [HttpGet]
    public override async Task<ActionResult<IEnumerable<BookReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
    {
        return await base.GetAll(queryOptions);
    }

    [AllowAnonymous]
    [HttpGet("{id:Guid}")]
    public override async Task<ActionResult<BookReadDto>> GetById([FromRoute] Guid id)
    {
        return await base.GetById(id);
    }
}