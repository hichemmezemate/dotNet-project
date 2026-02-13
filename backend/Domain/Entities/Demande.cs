namespace GestionDemandesAzure.Domain.Entities;

public class Demande
{
    public int Id { get; set; }
    public string Nom { get; set; } = string.Empty;
    public string Prenom { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Objet { get; set; } = string.Empty; 
    public string Description { get; set; } = string.Empty;
    public DateTime DateSoumission { get; set; }
    public string Status { get; set; } = "En attente";
}