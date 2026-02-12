using GestionDemandesAzure.Application.Ports;
using Microsoft.AspNetCore.Http;

namespace GestionDemandesAzure.Infrastructure.Authentification;

public class WebUserContext : IUserContext
{
    private readonly IHttpContextAccessor _accessor;
    public WebUserContext(IHttpContextAccessor accessor) => _accessor = accessor;

    public string GetCurrentEmail() => _accessor.HttpContext?.User?.Identity?.Name ?? "Anonyme";
    public bool IsAuthenticated() => _accessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
}