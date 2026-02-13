using GestionDemandesAzure.Domain.Entities;
using GestionDemandesAzure.Domain.Interfaces;
using GestionDemandesAzure.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GestionDemandesAzure.Infrastructure.Repositories;

public class SqlDemandeRepository : IDemandeRepository
{
    private readonly ApplicationDbContext _context;

    public SqlDemandeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SaveAsync(Demande demande)
    {
        _context.Demandes.Add(demande);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Demande>> GetByEmailAsync(string email)
    {
        return await _context.Demandes
            .Where(d => d.Email == email)
            .OrderByDescending(d => d.DateSoumission)
            .ToListAsync();
    }
}