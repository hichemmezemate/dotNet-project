namespace GestionDemandesAzure.Application.Ports;

public interface IUserContexte
{
    string GetCurrentEmail();
    bool IsAuthenticated();
}