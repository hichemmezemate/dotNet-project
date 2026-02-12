using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GestionDemandesAzure.Infrastructure.Authentication;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddAzureAdAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        // Utilise Microsoft.Identity.Web pour simplifier la config Entra ID
        services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApp(configuration.GetSection("AzureAd"));

        return services;
    }
}