using Microsoft.EntityFrameworkCore;
using GestionDemandesAzure.Infrastructure.Data;
using GestionDemandesAzure.Infrastructure.Repositories;
using GestionDemandesAzure.Domain.Interfaces;
using GestionDemandesAzure.Application.Services;
using GestionDemandesAzure.Application.Ports;
using GestionDemandesAzure.Infrastructure.Authentification;
using GestionDemandesAzure.Infrastructure.Authentication;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserContexte, WebUserContext>();
builder.Services.AddScoped<IDemandeRepository, SqlDemandeRepository>();
builder.Services.AddScoped<IDemandeService, DemandeService>();

if (!string.IsNullOrEmpty(builder.Configuration["AzureAd:ClientId"]))
{
    builder.Services.AddAzureAdAuthentication(builder.Configuration);
}

builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") 
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowReactApp");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers(); 

app.Run();