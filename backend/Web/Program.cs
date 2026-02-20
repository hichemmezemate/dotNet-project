using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.EntityFrameworkCore;
using DotNetEnv; 
using GestionDemandesAzure.Application.Ports;
using GestionDemandesAzure.Application.Services;
using GestionDemandesAzure.Domain.Interfaces;
using GestionDemandesAzure.Infrastructure.Data;
using GestionDemandesAzure.Infrastructure.Repositories; 
using GestionDemandesAzure.Infrastructure.Authentification;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Configuration["ConnectionStrings:DefaultConnection"] = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
builder.Configuration["AzureAd:Instance"] = Environment.GetEnvironmentVariable("AZURE_INSTANCE");
builder.Configuration["AzureAd:Domain"] = Environment.GetEnvironmentVariable("AZURE_DOMAIN");
builder.Configuration["AzureAd:TenantId"] = Environment.GetEnvironmentVariable("AZURE_TENANT_ID");
builder.Configuration["AzureAd:ClientId"] = Environment.GetEnvironmentVariable("AZURE_CLIENT_ID");

var authBuilder = builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
});

authBuilder.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

authBuilder.AddCookie("AdminScheme", options =>
{
    options.LoginPath = "/api/AdminAuth/login";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IDemandeRepository, SqlDemandeRepository>();
builder.Services.AddScoped<IDemandeService, DemandeService>();
builder.Services.AddScoped<IUserContexte, WebUserContext>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); 
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowReact");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();