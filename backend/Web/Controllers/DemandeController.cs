using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GestionDemandesAzure.Application.Ports;
using GestionDemandesAzure.Domain.Entities;

namespace GestionDemandesAzure.Web.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DemandeController : ControllerBase
{
    private readonly IDemandeService _demandeService;
    private readonly IUserService _userService;
    private readonly IUserContexte _userContext;

    public DemandeController(IDemandeService demandeService, IUserService userService, IUserContexte userContext)
    {
        _demandeService = demandeService;
        _userService = userService;
        _userContext = userContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Demande demande)
    {
        try 
        {
            await _userService.SynchroniserUtilisateurAsync();

            await _demandeService.EnregistrerDemande(demande);

            return Ok(new { message = "Dossier créé avec succès" });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"---> ERREUR CONTROLLER : {ex.Message}");
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetMyDemandes()
    {
        var email = _userContext.GetCurrentEmail();
        if (string.IsNullOrEmpty(email)) return Unauthorized();

        var result = await _demandeService.RecupererDemandesParEmail(email);
        return Ok(result);
    }
}