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

    public DemandeController(IDemandeService demandeService)
    {
        _demandeService = demandeService;
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
            return Ok(new { message = "Demande enregistrée avec succès dans PostgreSQL !" });
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