using Microsoft.AspNetCore.Mvc;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

[ApiController]
[Route("api/v1/[controller]s")]
public class LibraryControllerBase<T, TReadDto, TCreateDto, TUpdateDto> : ControllerBase
{
    private readonly IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _baseService;

    public LibraryControllerBase(IBaseService<T, TReadDto, TCreateDto, TUpdateDto> baseService)
    {
        _baseService = baseService;
    }

    [HttpGet]
    public virtual async Task<ActionResult<IEnumerable<TReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
    {
        var result = (await _baseService.GetAll(queryOptions)).ToArray();
        return Ok(result);
    }
}
