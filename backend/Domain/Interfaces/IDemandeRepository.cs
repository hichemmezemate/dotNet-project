using GestionDemandesAzure.Domain.Entities;

namespace GestionDemandesAzure.Domain.Interfaces;

public interface IDemandeRepository
{
    Task SaveAsync(Demande demande);
    Task<IEnumerable<Demande>> GetByEmailAsync(string email);
}