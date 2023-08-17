using System.Security.Cryptography;
using System.Text;

namespace WebApi.Service;

public static class PasswordService
{
    public static (string, byte[]) HashPassword(string password)
    {
        var hmac = new HMACSHA256();
        byte[] salt = hmac.Key;
        string hashedPassword = Encoding.UTF8.GetString(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
        return (hashedPassword, salt);
    }

    public static bool VerifyPassword(string checkedPassword, string hashedPassword, byte[] salt)
    {
        var hmac = new HMACSHA256(salt);
        var hashedOriginal = Encoding.UTF8.GetString(hmac.ComputeHash(Encoding.UTF8.GetBytes(checkedPassword)));
        return hashedOriginal == hashedPassword;
    }
}