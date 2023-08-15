using System.Security.Cryptography;
using System.Text;

namespace WebApi.Service;

public static class PasswordService
{
    public static (string, byte[]) HashPassword(string originalPassword)
    {
        var hmac = new HMACSHA256();
        byte[] salt = hmac.Key;
        string hashedPassword = Encoding.UTF8.GetString(hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)));
        return (hashedPassword, salt);
    }

    public static bool VerifyPassword(string originalPassword, string hashedPassword, byte[] salt)
    {
        var hmac = new HMACSHA256(salt);
        var hashedOriginal = Encoding.UTF8.GetString(hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)));
        return hashedOriginal == hashedPassword;
    }
}