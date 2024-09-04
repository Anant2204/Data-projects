//-----------------------------------------------------------------------
// <copyright file="Program.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

using Azure.Identity;
using Copilot.Backend.API.Attributes;
using Copilot.Backend.API.Configuration;
using Copilot.Backend.Core.Constants;
using Copilot.Backend.Shared.Helpers;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.Configuration.AzureAppConfiguration;
using Microsoft.Extensions.Logging.ApplicationInsights;
using Microsoft.KernelMemory;
using Microsoft.KernelMemory.AI.OpenAI;
using Microsoft.OpenApi.Models;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using System.Reflection;
using Microsoft.IdentityModel.S2S.Extensions.AspNetCore;
using Microsoft.Identity.ServiceEssentials.Extensions.AspNetCoreMiddleware;
var builder = WebApplication.CreateBuilder(args);

Microsoft.Extensions.Configuration.ConfigurationManager configuration = builder.Configuration;

if (!builder.Environment.IsDevelopment() && !string.IsNullOrWhiteSpace(builder.Configuration["KeyVaultName"]))
{
    builder.Configuration.AddAzureKeyVault(
            new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
            new DefaultAzureCredential(new DefaultAzureCredentialOptions { ManagedIdentityClientId = builder.Configuration["UserAssignedClientId"] }),
            new PrefixKeyVaultSecretManager(builder.Configuration["AppId"]));
}
// Add controllers to the service collection
builder.Services.AddControllers();

// Add API explorer endpoints
builder.Services.AddEndpointsApiExplorer();

// Add Swagger documentation generation
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Project Management Copilot API",
        Description = "API definition for Project Management Copilot",
        Contact = new OpenApiContact
        {
            Name = "Virtuoso Engineering Team",
            Url = new Uri("https://aka.ms/descentral"),
        },
    });

    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// Add Application Insights telemetry
builder.Services.AddApplicationInsightsTelemetry();

// Add core services
builder.Services.AddCoreServices();

// Add Cross-Origin Resource Sharing (CORS)
builder.Services.AddCors();

// Configure application configurations
AppConfigurations(builder, configuration);

// Add JWT authentication
AddJwtAuthentication(builder, configuration);

var app = builder.Build();

// Enable Swagger and Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

// Allow any origin, header, and method for CORS
app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

// Redirect HTTP to HTTPS
app.UseHttpsRedirection();

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();
app.UseMise();
// Map controllers
app.MapControllers();

// Run the application
app.Run();

// Add JWT authentication
static void AddJwtAuthentication(WebApplicationBuilder builder, ConfigurationManager configuration)
{
    builder.Services.AddAuthentication(S2SAuthenticationDefaults.AuthenticationScheme)
    .AddMiseWithDefaultAuthentication(builder.Configuration);  
}

// Configure application configurations
static void AppConfigurations(WebApplicationBuilder builder, ConfigurationManager configuration)
{
    if (builder.Environment.IsDevelopment())
    {
        builder.Configuration.AddJsonFile("appsettings.development.json");
    }

    var azureOpenAITextConfig = new AzureOpenAIConfig();
    azureOpenAITextConfig.APIKey = configuration[VirtuosoCopilotConstants.CopilotAzureOpenAITextConfigApiKeykvr];
    var azureOpenAIEmbeddingConfig = new AzureOpenAIConfig();
    azureOpenAIEmbeddingConfig.APIKey = configuration[VirtuosoCopilotConstants.CopilotAzureOpenAITextConfigApiKeykvr];
    var azAISearchConfig = new AzureAISearchConfig();
    azAISearchConfig.APIKey = configuration[VirtuosoCopilotConstants.CopilotAzAISearchConfigApiKeykvr];

    var searchClientConfig = new SearchClientConfig();

    configuration.GetSection("KernelMemory:Services:AzureOpenAIText").Bind(azureOpenAITextConfig);
    configuration.GetSection("KernelMemory:Services:AzureOpenAIEmbedding").Bind(azureOpenAIEmbeddingConfig);
    configuration.GetSection("KernelMemory:Services:AzureAISearch").Bind(azAISearchConfig);
    configuration.GetSection("KernelMemory:Retrieval:SearchClient").Bind(searchClientConfig);

    builder.Services.AddScoped<IKernelMemory>(provider =>
    {
        var indexName = configuration["SuggestQuestionsIndexName"];
        return new KernelMemoryBuilder()
            .With(new KernelMemoryConfig { DefaultIndexName = indexName })
            .WithSearchClientConfig(new SearchClientConfig { EmptyAnswer = "NO_ANSWER_FOUND", Temperature = 0 })
            .WithAzureOpenAITextGeneration(azureOpenAITextConfig, new DefaultGPTTokenizer())
            .WithAzureOpenAITextEmbeddingGeneration(azureOpenAIEmbeddingConfig, new DefaultGPTTokenizer())
            .WithAzureAISearchMemoryDb(azAISearchConfig)
            .Build();
    });

    builder.Services.AddScoped<IKernelMemory>(provider =>
    {
        var aiSearchIndexName = configuration["AISearchIndexName"];
        return new KernelMemoryBuilder()
            .With(new KernelMemoryConfig { DefaultIndexName = aiSearchIndexName })
            .WithSearchClientConfig(new SearchClientConfig { EmptyAnswer = "NO_ANSWER_FOUND", Temperature = 0 })
            .WithAzureOpenAITextGeneration(azureOpenAITextConfig, new DefaultGPTTokenizer())
            .WithAzureOpenAITextEmbeddingGeneration(azureOpenAIEmbeddingConfig, new DefaultGPTTokenizer())
        .WithAzureAISearchMemoryDb(azAISearchConfig)
        .Build();
    });

    ConfigurationHelper.Configuration = configuration;

    ConfigureLogging(builder, configuration);
}

// Configure logging
static void ConfigureLogging(WebApplicationBuilder builder, ConfigurationManager configuration)
{
    var appInsightconfiguration = configuration.GetSection("ConnectionStrings:AppInsightsInstrumentationKey");
    var logLevel = configuration["LogLevl"] ?? "Trace";
    LogLevel parsedLogLevel = (LogLevel)Enum.Parse(typeof(LogLevel), logLevel, true);

    builder.Host.ConfigureLogging((configureLogging) =>
    {
        configureLogging.AddApplicationInsights(appInsightconfiguration.Value);
        TelemetryConfiguration.Active.InstrumentationKey = appInsightconfiguration.Value;
        configureLogging.AddFilter<ApplicationInsightsLoggerProvider>(typeof(Program).FullName, parsedLogLevel);
    });
}