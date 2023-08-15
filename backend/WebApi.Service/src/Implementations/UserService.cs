using WebApi.Core;

namespace WebApi.Service;

public class UserService : BaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
{
    public UserService(IUserRepository userRepo, IMapper<User, UserReadDto, UserCreateDto> mapper) : base(userRepo, mapper) { }
}