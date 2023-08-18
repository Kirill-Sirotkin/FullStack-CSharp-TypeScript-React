using System.Security.Claims;

namespace WebApi.Core;

public static class VerificationService
{
    public static (bool, bool) VerifyIdAndRole(ClaimsIdentity? identity, Guid id, string[] roles)
    {
        if (identity is null) return (false, false);
        var clientId = identity.Claims.First(c => c.Properties.First().Value == "nameid").Value;
        var clientRole = identity.Claims.First(c => c.Properties.First().Value == "role").Value;

        var idVerified = clientId == id.ToString();
        var roleVerified = roles.Contains(clientRole);
        return (idVerified, roleVerified);
    }
}