using GestionDemandesAzure.Domain.Entities;
using GestionDemandesAzure.Domain.Interfaces;
using GestionDemandesAzure.Application.Ports;

namespace GestionDemandesAzure.Application.Services;

public class DemandeService : IDemandeService
{
    private readonly IDemandeRepository _repository;
    private readonly IUserContext _userContext;

    public DemandeService(IDemandeRepository repository, IUserContext userContext)
    {
        _repository = repository;
        _userContext = userContext;
    }

    public async Task EnregistrerDemande(Demande demande)
    {
        demande.Email = _userContext.GetCurrentEmail();
        demande.DateSoumission = DateTime.UtcNow;
        demande.Status = "En attente";

        await _repository.SaveAsync(demande);
    }
}