using Microsoft.AspNetCore.Mvc;

namespace WebApi.Service;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost]
    public async Task<ActionResult<string>> VerifyCredentials([FromBody] UserCredentialsDto credentials)
    {
        return Ok(await _authService.VerifyCredentials(credentials));
    }
}