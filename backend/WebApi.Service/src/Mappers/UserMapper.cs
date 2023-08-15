using WebApi.Core;

namespace WebApi.Service;

public static class UserMapper
{
    public static UserReadDto MapToRead(User user)
    {
        return new UserReadDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Role = user.UserRole
        };
    }

    public static User MapFromCreate(UserCreateDto user)
    {
        (string hashedPassword, byte[] salt) = PasswordService.HashPassword(user.Password);
        return new User
        {
            Id = Guid.NewGuid(),
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            UserRole = user.Role,
            PasswordHash = hashedPassword,
            PasswordSalt = salt
        };
    }
}