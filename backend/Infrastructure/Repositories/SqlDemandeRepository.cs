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

    public async Task UpdateAsync(Demande demande)
    {
        _context.Demandes.Update(demande);
        await _context.SaveChangesAsync();
    }

    public async Task<Demande?> GetByIdAsync(int id)
    {
        return await _context.Demandes.FindAsync(id);
    }

    public async Task<IEnumerable<Demande>> GetAllAsync()
    {
        return await _context.Demandes
            .OrderByDescending(d => d.DateSoumission)
            .ToListAsync();
    }
}