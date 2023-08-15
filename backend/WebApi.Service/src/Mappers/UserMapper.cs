using WebApi.Core;

namespace WebApi.Service;

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
            UserRole = user.Role,
            PasswordHash = hashedPassword,
            PasswordSalt = salt
        };
        return result;
    }

    public User MapFromUpdate(User previousUser, UserUpdateDto userUpdate)
    {
        (string hashedPassword, byte[] salt) = PasswordService.HashPassword(userUpdate.Password);
        return new User
        {
            Id = previousUser.Id,
            FirstName = userUpdate.FirstName,
            LastName = userUpdate.LastName,
            Email = previousUser.Email,
            UserRole = previousUser.UserRole,
            PasswordHash = hashedPassword,
            PasswordSalt = salt
        };
    }
}