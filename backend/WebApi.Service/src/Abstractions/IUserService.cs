using WebApi.Core;

namespace WebApi.Service;

public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto> { }