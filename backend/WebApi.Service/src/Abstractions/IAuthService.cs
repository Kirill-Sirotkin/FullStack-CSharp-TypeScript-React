namespace WebApi.Service;

public interface IAuthService
{
    Task<string> VerifyCredentials(UserCredentialsDto credentials);
}