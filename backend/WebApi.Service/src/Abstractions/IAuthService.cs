using System.IdentityModel.Tokens.Jwt;

namespace WebApi.Service;

public interface IAuthService
{
    Task<string> VerifyCredentials(UserCredentialsDto credentials);
}