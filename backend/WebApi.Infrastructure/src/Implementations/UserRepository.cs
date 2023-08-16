using Microsoft.EntityFrameworkCore;
using WebApi.Core;

namespace WebApi.Infrastructure;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly DbSet<User> _users;

    public UserRepository(DatabaseContext dbContext) : base(dbContext)
    {
        if (dbContext.Users is null) throw new Exception("Users table is null");
        _users = dbContext.Users;
    }

    public async Task<User> ChangePassword(User updatedUser)
    {
        _users.Update(updatedUser);
        await _context.SaveChangesAsync();
        return updatedUser;
    }

    public async Task<User?> GetByEmail(string email)
    {
        return await _users.FirstOrDefaultAsync(u => u.Email == email);
    }
}