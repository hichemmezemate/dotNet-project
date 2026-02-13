using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GestionDemandesAzure.Application.Ports;
using GestionDemandesAzure.Domain.Entities;

namespace GestionDemandesAzure.Web.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DemandeController : ControllerBase
{
    private readonly IDemandeService _demandeService;
    private readonly IUserContexte _userContext;
    private readonly IUserService _userService;

    public DemandeController(IDemandeService demandeService, IUserContexte userContext, IUserService userService)
    {
        _demandeService = demandeService;
        _userContext = userContext;
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyDemandes()
    {
        await _userService.SynchroniserUtilisateurAsync();
        try
        {
            var userEmail = _userContext.GetCurrentEmail();
            var demandes = await _demandeService.RecupererDemandesParEmail(userEmail);
            return Ok(demandes);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Demande demande)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _demandeService.EnregistrerDemande(demande);
            return Ok(new { message = "Demande enregistrée avec succès" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("ping")]
    [AllowAnonymous]
    public IActionResult Ping() => Ok(new { status = "API Online", time = DateTime.Now });
}