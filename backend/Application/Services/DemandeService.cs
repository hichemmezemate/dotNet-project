using GestionDemandesAzure.Domain.Entities;
using GestionDemandesAzure.Domain.Interfaces;
using GestionDemandesAzure.Application.Ports;

namespace GestionDemandesAzure.Application.Services;

public class DemandeService : IDemandeService
{
    private readonly IDemandeRepository _repository;
    private readonly IUserContexte _userContext;

    public DemandeService(IDemandeRepository repository, IUserContexte userContext)
    {
        _repository = repository;
        _userContext = userContext;
    }

    public async Task EnregistrerDemande(Demande demande)
    {
        var email = _userContext.GetCurrentEmail();

        if (string.IsNullOrEmpty(email))
        {
            Console.WriteLine("---> ERREUR SERVICE : Impossible d'enregistrer, l'email est vide.");
            throw new Exception("L'utilisateur n'a pas d'identifiant valide dans son jeton.");
        }

        demande.Email = email;
        demande.DateSoumission = DateTime.UtcNow;
        demande.Status = "En attente";

        Console.WriteLine($"---> SERVICE : Enregistrement de la demande pour {email}");
        await _repository.SaveAsync(demande);
    }

    public async Task<IEnumerable<Demande>> RecupererDemandesParEmail(string email)
    {
        return await _repository.GetByEmailAsync(email);
    }
}