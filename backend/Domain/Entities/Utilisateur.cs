namespace GestionDemandesAzure.Domain.Entities;

public class Utilisateur
{
    public int Id { get; set; }
    public string AzureOid { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Nom { get; set; } = string.Empty;
    public string Prenom { get; set; } = string.Empty;
    public DateTime DateCreation { get; set; } = DateTime.UtcNow;
}