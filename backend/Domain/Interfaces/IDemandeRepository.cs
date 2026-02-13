using GestionDemandesAzure.Domain.Entities;

namespace GestionDemandesAzure.Domain.Interfaces;

public interface IDemandeRepository
{
    Task SaveAsync(Demande demande);
}