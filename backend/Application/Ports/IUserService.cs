namespace GestionDemandesAzure.Application.Ports;

public interface IUserService
{
    Task SynchroniserUtilisateurAsync();
}