using WebApi.Core;

namespace WebApi.Infrastructure;

public class UserRepository : IUserRepository
{
    public Task<User> ChangePassword(User updatedUser)
    {
        throw new NotImplementedException();
    }

    public Task<User> Create(User newEntity)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Delete(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<User>> GetAll(QueryOptions options)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetByEmail(string email)
    {
        throw new NotImplementedException();
    }

    public Task<User?> GetById(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<User> Update(User updatedEntity)
    {
        throw new NotImplementedException();
    }
}