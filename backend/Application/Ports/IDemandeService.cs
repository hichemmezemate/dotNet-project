using GestionDemandesAzure.Domain.Entities;

namespace GestionDemandesAzure.Application.Ports;

public interface IDemandeService
{
    Task EnregistrerDemande(Demande demande);
    Task<IEnumerable<Demande>> RecupererDemandesParEmail(string email);
}