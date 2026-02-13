using Microsoft.EntityFrameworkCore;
using GestionDemandesAzure.Domain.Entities;

namespace GestionDemandesAzure.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Demande> Demandes { get; set; }
    public DbSet<Utilisateur> Utilisateurs { get; set; } 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Utilisateur>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<Utilisateur>().HasIndex(u => u.AzureOid).IsUnique();
    }
}