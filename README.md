docker run --name postgresdb -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=root -e POSTGRES_DB=demandesdb -p 5433:5432 -d postgres:latest
dotnet run
dotnet ef database update

