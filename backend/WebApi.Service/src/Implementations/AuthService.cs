using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using WebApi.Core;

namespace WebApi.Service;

public class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;

    public AuthService(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    public async Task<string> VerifyCredentials(UserCredentialsDto credentials)
    {
        var user = await _userRepository.GetByEmail(credentials.Email);
        if (user is null) throw new Exception("No user was found");
        var authSuccess = PasswordService.VerifyPassword(credentials.Password, user.PasswordHash, user.PasswordSalt);
        if (!authSuccess) throw new Exception("Authentication failed");
        return CreateToken(user);
    }

    private string CreateToken(User user)
    {
        var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.FirstName.ToString()),
            new Claim(ClaimTypes.Surname, user.LastName.ToString()),
            new Claim(ClaimTypes.Role, user.UserRole.ToString()),
        };
        var jwtSecret = _configuration["JwtSecret"];
        if (jwtSecret is null) throw new Exception("No secret was found in appsettings");
        var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecret));
        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
        var securityTokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = "library-backend",
            Expires = DateTime.Now.AddMinutes(5),
            Subject = new ClaimsIdentity(claims),
            SigningCredentials = signingCredentials
        };
        var token = jwtSecurityTokenHandler.CreateJwtSecurityToken(securityTokenDescriptor);
        if (token is null) throw new Exception("No token was returned");
        return token.RawData;
    }
}