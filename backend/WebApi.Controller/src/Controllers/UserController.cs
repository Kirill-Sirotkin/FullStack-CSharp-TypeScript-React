using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

[EnableCors]
[Authorize]
public class UserController : LibraryControllerBase<User, UserReadDto, UserCreateDto, UserUpdateDto>
{
    public UserController(IUserService baseService) : base(baseService) { }

    [AllowAnonymous]
    [HttpPost]
    public override async Task<ActionResult<UserReadDto>> Create([FromBody] UserCreateDto dto)
    {
        return await base.Create(dto);
    }

    [HttpDelete("{id:Guid}")]
    public override async Task<ActionResult<bool>> Delete([FromRoute] Guid id)
    {
        var (idVerified, roleVerified) = VerificationService.VerifyIdAndRole(
            HttpContext.User.Identity as ClaimsIdentity,
            id,
            new string[] { "Admin" }
        );

        if (!idVerified)
            if (!roleVerified) return StatusCode(403, false);
        return await base.Delete(id);
    }

    [HttpPatch("{id:Guid}")]
    public override async Task<ActionResult<UserReadDto>> Update([FromRoute] Guid id, [FromBody] UserUpdateDto update)
    {
        var (idVerified, roleVerified) = VerificationService.VerifyIdAndRole(
            HttpContext.User.Identity as ClaimsIdentity,
            id,
            new string[] { "Admin" }
        );

        if (!idVerified)
            if (!roleVerified) return StatusCode(403);
        return await base.Update(id, update);
    }

    [HttpGet("{id:Guid}")]
    public override async Task<ActionResult<UserReadDto>> GetById([FromRoute] Guid id)
    {
        var (idVerified, roleVerified) = VerificationService.VerifyIdAndRole(
            HttpContext.User.Identity as ClaimsIdentity,
            id,
            new string[] { "Admin", "Librarian" }
        );

        if (!idVerified)
            if (!roleVerified) return StatusCode(403);
        return await base.GetById(id);
    }

    [Authorize(Roles = "Admin, Librarian")]
    [HttpGet]
    public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
    {
        return await base.GetAll(queryOptions);
    }
}