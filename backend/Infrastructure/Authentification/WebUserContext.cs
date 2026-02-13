using System.Security.Claims;
using GestionDemandesAzure.Application.Ports;
using Microsoft.AspNetCore.Http;

namespace GestionDemandesAzure.Infrastructure.Authentification;

public class WebUserContext : IUserContexte
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public WebUserContext(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string GetCurrentEmail()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        
        if (user == null || !IsAuthenticated())
        {
            return string.Empty;
        }

        var email = user.FindFirst("preferred_username")?.Value 
               ?? user.FindFirst(ClaimTypes.Upn)?.Value 
               ?? user.FindFirst(ClaimTypes.Email)?.Value 
               ?? user.FindFirst("email")?.Value;

        if (string.IsNullOrEmpty(email))
        {
            Console.WriteLine("--- ATTENTION : Aucun email trouvé dans les claims suivants ---");
            foreach (var c in user.Claims) Console.WriteLine($"Type: {c.Type}, Value: {c.Value}");
        }

        return email ?? string.Empty;
    }

    public bool IsAuthenticated()
    {
        return _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
    }
}