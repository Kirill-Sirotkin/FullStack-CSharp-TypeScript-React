using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

[EnableCors]
[ApiController]
[Route("api/v1/[controller]s")]
public class LibraryControllerBase<T, TReadDto, TCreateDto, TUpdateDto> : ControllerBase
{
    protected readonly IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _baseService;

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

    [HttpGet("{id:Guid}")]
    public virtual async Task<ActionResult<TReadDto>> GetById([FromRoute] Guid id)
    {
        return Ok(await _baseService.GetById(id));
    }

    [HttpPost]
    public virtual async Task<ActionResult<TReadDto>> Create([FromBody] TCreateDto dto)
    {
        var createdObject = await _baseService.Create(dto);
        return CreatedAtAction(nameof(Create), createdObject);
    }

    [HttpPatch("{id:Guid}")]
    public virtual async Task<ActionResult<TReadDto>> Update([FromRoute] Guid id, [FromBody] TUpdateDto update)
    {
        var updatedObject = await _baseService.Update(id, update);
        return Ok(updatedObject);
    }

    [HttpDelete("{id:Guid}")]
    public virtual async Task<ActionResult<bool>> Delete([FromRoute] Guid id)
    {
        return Ok(await _baseService.Delete(id));
    }
}
