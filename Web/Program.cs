using Microsoft.EntityFrameworkCore;
using GestionDemandesAzure.Infrastructure.Authentication;
using GestionDemandesAzure.Infrastructure.Data;
using GestionDemandesAzure.Infrastructure.Repositories;
using GestionDemandesAzure.Domain.Interfaces;
using GestionDemandesAzure.Application.Services;
using GestionDemandesAzure.Application.Ports;
using GestionDemandesAzure.Infrastructure.Authentification;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IUserContext, WebUserContext>();
builder.Services.AddScoped<IDemandeService, DemandeService>();

builder.Services.AddScoped<IDemandeRepository, SqlDemandeRepository>();

var connectionHost = "";


builder.Services.AddAzureAdAuthentication(builder.Configuration);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")
    ?? connectionHost));

builder.Services.AddControllersWithViews();

builder.Services.Configure<Microsoft.AspNetCore.Mvc.Razor.RazorViewEngineOptions>(options =>
{
    options.ViewLocationFormats.Clear();
    options.ViewLocationFormats.Add("/Web/Views/{1}/{0}.cshtml");
    options.ViewLocationFormats.Add("/Web/Views/Shared/{0}.cshtml");
});


var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

// builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
//     .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"));

// options.UseNpgsql("Host=monserveurdemande.postgres.database.azure.com;Database=demandesdb;Username=azure_monserveur_admin;Password=ROOT;Ssl Mode=Require"));


