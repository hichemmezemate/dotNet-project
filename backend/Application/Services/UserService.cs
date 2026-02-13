using GestionDemandesAzure.Application.Ports;
using GestionDemandesAzure.Domain.Entities;
using GestionDemandesAzure.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GestionDemandesAzure.Application.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task SynchroniserUtilisateurAsync()
    {
        var principal = _httpContextAccessor.HttpContext?.User;
        if (principal?.Identity?.IsAuthenticated != true) return;

        var oid = principal.FindFirst("oid")?.Value ?? principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var email = principal.FindFirst("preferred_username")?.Value ?? principal.FindFirst(ClaimTypes.Email)?.Value;
        var nom = principal.FindFirst(ClaimTypes.Surname)?.Value ?? "";
        var prenom = principal.FindFirst(ClaimTypes.GivenName)?.Value ?? "";

        if (string.IsNullOrEmpty(oid)) return;

        var userExists = await _context.Utilisateurs.AnyAsync(u => u.AzureOid == oid);

        if (!userExists)
        {
            var newUser = new Utilisateur
            {
                AzureOid = oid,
                Email = email ?? "inconnu",
                Nom = nom,
                Prenom = prenom
            };
            _context.Utilisateurs.Add(newUser);
            await _context.SaveChangesAsync();
        }
    }
}