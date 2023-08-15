namespace WebApi.Core;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmail(string email);
    Task<User> ChangePassword(User updatedUser);
}