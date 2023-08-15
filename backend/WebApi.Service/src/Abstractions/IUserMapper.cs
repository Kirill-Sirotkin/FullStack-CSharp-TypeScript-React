using WebApi.Core;

namespace WebApi.Service;

public interface IUserMapper : IMapper<User, UserReadDto, UserCreateDto> { }