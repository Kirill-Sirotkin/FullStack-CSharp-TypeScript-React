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
    public override async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id)
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if (identity is null) return StatusCode(401, false);
        var clientId = identity.Claims.First(c => c.Properties.First().Value == "nameid").Value;
        var clieantRole = identity.Claims.First(c => c.Properties.First().Value == "role").Value;
        if (clientId != id.ToString())
        {
            if (clieantRole != Role.Admin.ToString()) return StatusCode(403, false);
        }
        return await base.DeleteOneById(id);
    }
}