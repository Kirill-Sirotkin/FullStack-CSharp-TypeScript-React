using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

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
}