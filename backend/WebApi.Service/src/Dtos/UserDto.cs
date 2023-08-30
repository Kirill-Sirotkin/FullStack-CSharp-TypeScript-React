using WebApi.Core;

namespace WebApi.Service;

public class UserReadDto
{
    public Guid Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public Role Role { get; init; }
}

public class UserCreateDto
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Email { get; init; }
    public required string Password { get; init; }
    public Role Role { get; init; }
}

public class UserUpdateDto
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required Role Role { get; init; }
}

public class UserCredentialsDto
{
    public required string Email { get; init; }
    public required string Password { get; init; }
}