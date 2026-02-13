using Microsoft.AspNetCore.Mvc;

namespace GestionDemandesAzure.Web.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}