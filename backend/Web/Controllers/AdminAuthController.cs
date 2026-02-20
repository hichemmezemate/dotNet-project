using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace GestionDemandesAzure.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminAuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AdminLoginRequest request)
    {
        var adminUser = Environment.GetEnvironmentVariable("ADMIN_USERNAME") ?? "admin";
        var adminPass = Environment.GetEnvironmentVariable("ADMIN_PASSWORD") ?? "admin123";

        if (request.Username == adminUser && request.Password == adminPass)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, adminUser),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var claimsIdentity = new ClaimsIdentity(claims, "AdminScheme");
            var authProperties = new AuthenticationProperties { IsPersistent = true };

            await HttpContext.SignInAsync("AdminScheme", new ClaimsPrincipal(claimsIdentity), authProperties);

            return Ok(new { message = "Connexion Admin réussie" });
        }

        return Unauthorized("Identifiants incorrects");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync("AdminScheme");
        return Ok();
    }
}

public class AdminLoginRequest { public string Username { get; set; } = ""; public string Password { get; set; } = ""; }