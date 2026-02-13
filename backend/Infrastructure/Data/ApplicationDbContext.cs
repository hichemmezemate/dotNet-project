using GestionDemandesAzure.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GestionDemandesAzure.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    public DbSet<Demande> Demandes { get; set; }
}