using WebApi.Core;

namespace WebApi.Service;

public class UserService : IUserService
{
    public Task<UserReadDto> Create(UserCreateDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Delete(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<UserReadDto>> GetAll(QueryOptions queryOptions)
    {
        throw new NotImplementedException();
    }

    public Task<UserReadDto> GetById(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<UserReadDto> Update(Guid id, UserUpdateDto updated)
    {
        throw new NotImplementedException();
    }
}