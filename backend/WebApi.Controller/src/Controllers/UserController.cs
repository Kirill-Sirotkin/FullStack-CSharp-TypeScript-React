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
    public override Task<ActionResult<UserReadDto>> Create([FromBody] UserCreateDto dto)
    {
        return base.Create(dto);
    }
}