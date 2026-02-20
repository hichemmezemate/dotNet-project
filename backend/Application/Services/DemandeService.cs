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
        if (string.IsNullOrEmpty(email)) throw new Exception("L'utilisateur n'a pas d'identifiant valide dans son jeton.");

        demande.Email = email;
        demande.DateSoumission = DateTime.UtcNow;
        demande.Status = "En attente";

        await _repository.SaveAsync(demande);
    }

    public async Task<IEnumerable<Demande>> RecupererDemandesParEmail(string email)
    {
        return await _repository.GetByEmailAsync(email);
    }
    
    public async Task<IEnumerable<Demande>> RecupererToutesLesDemandes()
    {
        return await _repository.GetAllAsync();
    }

    public async Task ChangerStatutDemande(int id, string nouveauStatut)
    {
        var demande = await _repository.GetByIdAsync(id);
        if (demande == null) throw new Exception("Demande non trouvée");

        demande.Status = nouveauStatut;
        await _repository.UpdateAsync(demande);
    }
}