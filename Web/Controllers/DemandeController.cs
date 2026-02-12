using GestionDemandesAzure.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GestionDemandesAzure.Application.Ports;

namespace GestionDemandesAzure.Web.Controllers;

[Authorize]
public class DemandeController : Controller
{
    private readonly IDemandeService _service;

    public DemandeController(IDemandeService service) 
    { 
        _service = service; 
    }

    [HttpGet]
    public IActionResult Index() => View();

    [HttpPost]
    public async Task<IActionResult> Index(Demande demande)
    {
        if (ModelState.IsValid)
        {
            await _service.EnregistrerDemande(demande);
            ViewBag.Message = "Demande enregistrée avec succès !";
            return View();
        }
        return View(demande);
    }
}