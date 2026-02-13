using System.Security.Claims;
using GestionDemandesAzure.Application.Ports;

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
        return user?.FindFirst("preferred_username")?.Value 
               ?? user?.FindFirst(ClaimTypes.Email)?.Value 
               ?? "utilisateur@inconnu.com";
    }

    public bool IsAuthenticated()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        return user?.Identity?.IsAuthenticated ?? false;
    }
}