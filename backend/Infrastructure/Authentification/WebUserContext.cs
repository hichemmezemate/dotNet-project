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
        
        if (!IsAuthenticated())
        {
            throw new Exception("L'utilisateur n'est pas authentifié.");
        }

        return user?.FindFirst("preferred_username")?.Value 
               ?? user?.FindFirst(ClaimTypes.Email)?.Value 
               ?? throw new Exception("Impossible d'extraire l'email du jeton d'authentification.");
    }

    public bool IsAuthenticated()
    {
        return _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
    }
}