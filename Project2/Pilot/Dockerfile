FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
EXPOSE 80
EXPOSE 443
WORKDIR /app
COPY src/Virtuoso.Copilot.API/published/ ./
ENTRYPOINT ["dotnet", "Virtuoso.Copilot.API.dll"]