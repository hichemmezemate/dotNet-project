namespace GestionDemandesAzure.Application.Ports;

public interface IUserContext
{
    string GetCurrentEmail();
    bool IsAuthenticated();
}