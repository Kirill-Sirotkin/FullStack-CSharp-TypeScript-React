using WebApi.Core;
using WebApi.Infrastructure;
using WebApi.Service;

namespace WebApi.Tests.src.Infrastructure.Tests;

public class UserMapperTest
{
    [Fact]
    public void MapToRead_ValidData_UserReadDto()
    {
        var userMapper = new UserMapper();
        var id = Guid.NewGuid();
        var user = new User
        {
            Id = id,
            FirstName = "User",
            LastName = "Test",
            Email = "Email",
            UserRole = Role.Librarian,
            PasswordHash = "",
            PasswordSalt = Array.Empty<byte>(),
        };
        var dtoTest = new UserReadDto
        {
            FirstName = "User",
            LastName = "Test",
            Role = Role.Librarian,
            Id = id
        };
        var mappedUser = userMapper.MapToRead(user);
        Assert.Equal(dtoTest.Id, mappedUser.Id);
        Assert.Equal(dtoTest.FirstName, mappedUser.FirstName);
        Assert.Equal(dtoTest.LastName, mappedUser.LastName);
        Assert.Equal(dtoTest.Role, mappedUser.Role);
    }
    [Fact]
    public void MapFromCreate_ValidData_User()
    {
        var userMapper = new UserMapper();
        var userCreate = new UserCreateDto
        {
            FirstName = "User",
            LastName = "Test",
            Email = "Email",
            Password = "Password",
            Role = Role.Customer,
        };
        var userTest = new User
        {
            Id = Guid.NewGuid(),
            FirstName = "User",
            LastName = "Test",
            Email = "Email",
            UserRole = Role.Customer,
            PasswordHash = "",
            PasswordSalt = Array.Empty<byte>(),
        };
        var mappedUser = userMapper.MapFromCreate(userCreate);
        var testPassword = PasswordService.VerifyPassword(userCreate.Password, mappedUser.PasswordHash, mappedUser.PasswordSalt);
        Assert.Equal(userTest.FirstName, mappedUser.FirstName);
        Assert.Equal(userTest.LastName, mappedUser.LastName);
        Assert.Equal(userTest.UserRole, mappedUser.UserRole);
        Assert.Equal(userTest.Email, mappedUser.Email);
        Assert.True(testPassword);
    }
    [Fact]
    public void MapFromUpdate_ValidData_User()
    {
        var userMapper = new UserMapper();
        var userUpdate = new UserUpdateDto
        {
            FirstName = "UserNew",
            LastName = "TestNew",
            Role = Role.Admin,
        };
        var userPreviousTest = new User
        {
            Id = Guid.NewGuid(),
            FirstName = "User",
            LastName = "Test",
            Email = "Email",
            UserRole = Role.Customer,
            PasswordHash = "",
            PasswordSalt = Array.Empty<byte>(),
        };
        var userTest = new User
        {
            Id = Guid.NewGuid(),
            FirstName = "UserNew",
            LastName = "TestNew",
            Email = "EmailNew",
            UserRole = Role.Admin,
            PasswordHash = "",
            PasswordSalt = Array.Empty<byte>(),
        };
        var mappedUser = userMapper.MapFromUpdate(userPreviousTest, userUpdate);
        Assert.Equal(userTest.FirstName, mappedUser.FirstName);
        Assert.Equal(userTest.LastName, mappedUser.LastName);
        Assert.Equal(userTest.UserRole, mappedUser.UserRole);
        Assert.Equal(userPreviousTest.Email, mappedUser.Email);
    }
}