using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

public class UserController : LibraryControllerBase<User, UserReadDto, UserCreateDto, UserUpdateDto>
{
    public UserController(IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto> baseService) : base(baseService)
    {
    }
}