FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 443
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src/api
RUN curl -L https://raw.githubusercontent.com/Microsoft/artifacts-credprovider/master/helpers/installcredprovider.sh  | sh
ARG FEED_ACCESSTOKEN
ENV VSS_NUGET_EXTERNAL_FEED_ENDPOINTS="{\"endpointCredentials\": [{\"endpoint\":\"https://vsogd.pkgs.visualstudio.com/MCT/_packaging/MCT/nuget/v3/index.json\", \"username\":\"docker\", \"password\":\"${FEED_ACCESSTOKEN}\"}]}"
COPY ["./MCT.API.sln", "."]
COPY ["./nuget.config", "."]
COPY ["./MCT.DataAccess/MCT.DataAccess.csproj", "./MCT.DataAccess/MCT.DataAccess.csproj"]
COPY ["./MCT.Business/MCT.Business.csproj", "./MCT.Business/MCT.Business.csproj"]
COPY ["./MCT.Api/MCT.API.csproj", "./MCT.Api/MCT.API.csproj"]
 
RUN dotnet restore "./MCT.Api/MCT.API.csproj"
COPY ./MCT.DataAccess ./MCT.DataAccess
COPY ./MCT.Business ./MCT.Business
COPY ./MCT.Api ./MCT.Api
RUN dotnet build "./MCT.Api/MCT.API.csproj" -c Release -o /app/build

 
FROM build AS publish
RUN dotnet publish "./MCT.Api/MCT.API.csproj" -c Release -o /app/publish /p:UseAppHost=false
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MCT.API.dll"]