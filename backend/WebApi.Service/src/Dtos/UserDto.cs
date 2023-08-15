using WebApi.Core;

namespace WebApi.Service;

public class UserReadDto
{
    public Guid Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public Role Role { get; set; }
}

public class UserCreateDto
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public Role Role { get; set; }
}

public class UserUpdateDto
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Password { get; set; }
}

public class UserCredentialsDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}