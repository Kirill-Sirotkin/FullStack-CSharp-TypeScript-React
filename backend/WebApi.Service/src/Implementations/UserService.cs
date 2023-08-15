using WebApi.Core;

namespace WebApi.Service;

public class UserService : BaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>, IUserService
{
    public UserService(IUserRepository userRepo, IUserMapper mapper) : base(userRepo, mapper) { }
}