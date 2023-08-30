using WebApi.Core;
using WebApi.Service;

namespace WebApi.Infrastructure;

public class UserMapper : IUserMapper
{
    public UserReadDto MapToRead(User user)
    {
        var result = new UserReadDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Role = user.UserRole
        };
        return result;
    }

    public User MapFromCreate(UserCreateDto user)
    {
        (string hashedPassword, byte[] salt) = PasswordService.HashPassword(user.Password);
        var result = new User
        {
            Id = Guid.NewGuid(),
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            UserRole = Role.Customer,
            PasswordHash = hashedPassword,
            PasswordSalt = salt
        };
        return result;
    }

    public User MapFromUpdate(User previousUser, UserUpdateDto userUpdate)
    {
        return new User
        {
            Id = previousUser.Id,
            FirstName = userUpdate.FirstName,
            LastName = userUpdate.LastName,
            Email = previousUser.Email,
            UserRole = userUpdate.Role,
            PasswordHash = previousUser.PasswordHash,
            PasswordSalt = previousUser.PasswordSalt
        };
    }
}