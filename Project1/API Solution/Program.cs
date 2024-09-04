// <copyright file="Program.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text.Json.Serialization;
using WebApi.Helpers;
using Azure.Identity;
using Microsoft.Identity.Web;
using MCAPSHelpVnext.Common.Logging;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json.Converters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.OpenApi.Models;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.Primitives;
using MCAPSHelpVnext.Api.Services;
using Microsoft.Extensions.Logging.ApplicationInsights;
using MCAPSHelpVNext.Api.Auth;
using Owin;
using MCAPSHelpVNext.Api.Services;
using MCAPSHelpVnext.Api.Attributes;
using System.Diagnostics.Tracing;
using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.EntityFrameworkCore;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.API.Utility;
using MCAPSHelpVNext.API.Helpers;
using MCAPSHelpVNext.API.CachingService;
using MCAPSHelpVNext.DataRepository.Configurations;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

const string scopesToRequest = "user.read";
// Configure Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"))
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddMicrosoftGraph()
    .AddInMemoryTokenCaches();


builder.Services.AddScoped<IAuthorizationHandler, AuthorizationGroupHandler>();


builder.Services.AddCustomDbContext(builder.Configuration);

MyLibraryConfiguration.Initialize();

builder.Services.AddEndpointsApiExplorer();


builder.Services.AddScoped<ConfigService>()
    .AddScoped<AreaService>()
    .AddScoped<RoleService>()
    .AddScoped<SegmentServices>()
    .AddScoped<ServiceMappingService>()
    .AddScoped<ServiceService>()
    .AddScoped<SubSegmentService>()
    .AddScoped<UserService>()
    .AddScoped<UserADGroupService>()
    .AddScoped<ServiceOwnerServiceRepository>()
    .AddScoped<ServiceOwnerRepository>()
    .AddScoped<UserWorkSpaceService>()
    //.AddScoped<MyHelpDashboardService>()
    .AddScoped<SupportRequest>()
    .AddScoped<AboutRepository>()
    .AddScoped<FeedbackReposiroty>()
    .AddScoped<AnnouncementService>()
    .AddScoped<NewsRepository>();

// Setup KeyVault
if (!string.IsNullOrWhiteSpace(builder.Configuration["KeyVaultName"]))
{
    builder.Configuration.AddAzureKeyVault(
            new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
            new DefaultAzureCredential(),
            new PrefixKeyVaultSecretManager(builder.Configuration["AppId"]));
}

// Use Newtonsoft
builder.Services
    .AddMvc(options =>
    {
        options.InputFormatters.RemoveType<Microsoft.AspNetCore.Mvc.Formatters.SystemTextJsonInputFormatter>();
        options.OutputFormatters.RemoveType<Microsoft.AspNetCore.Mvc.Formatters.SystemTextJsonOutputFormatter>();
    })
    .AddNewtonsoftJson(opts =>
    {
        opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        opts.SerializerSettings.Converters.Add(new StringEnumConverter(new CamelCaseNamingStrategy()));
    })
    .AddXmlSerializerFormatters();

// Anti forgery
builder.Services.AddAntiforgery();

// Hsts
builder.Services.AddHsts(options =>
{
options.Preload = true;
options.IncludeSubDomains = true;
options.MaxAge = TimeSpan.FromDays(60);
});

// App Insights profiler
builder.Services.AddApplicationInsightsTelemetry();

builder.Services.AddServiceProfiler();
builder.Services.AddHttpContextAccessor();

//Chaching
builder.Services.AddSingleton<ICachingServiceFactory, InMemoryCachingServiceFactory>();

builder.Services.AddSingleton<ICachingService>(provider =>
{
    var factory = provider.GetRequiredService<ICachingServiceFactory>();
    return factory.CreateCachingService();
});



// Controllers with Authorize policy
builder.Services.AddControllers(options =>
{
var policy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
    .RequireAuthenticatedUser()
    .Build();

});
builder.Services
    .AddSingleton<IAuthorizationHandler, AuthorizationGroupHandler>();

builder.Services.AddAuthorization(options =>
{
    
    string _correlationID = Guid.NewGuid().ToString();
    Stopwatch stopwatch = new Stopwatch();
    stopwatch.Start();

    options.AddPolicy(nameof(CommonConst.GetMCAPSHelpAPIAuthorization), policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("appid", builder.Configuration["AuthorizationAppID:MCAPSHelpUIAppID"], builder.Configuration["AuthorizationAppID:MCAPSHelpAPIAppID"]);
    });

    options.AddPolicy(CommonConst.IRISAPIAuthorization, policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("appid", builder.Configuration["AuthorizationAppID:IRISAPIAppID"]);
    });

    stopwatch.Stop();
    Logging.LogRequest(_correlationID, $"User Auth End In {stopwatch.ElapsedMilliseconds}", "GET", "200", true);

});

// Endpoint API Explorer
builder.Services.AddEndpointsApiExplorer();

// Swagger generation
if (bool.TryParse(builder.Configuration["Swagger:UseSwagger"], out bool useSwagger) && useSwagger)
{
    builder.Services.AddSwagger(builder.Configuration);
}

// Initialize App Instrumentation
builder.InitializeLogging();

builder.Services
    .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
    .AddSingleton<ITelemetryInitializer, TelemetryEnrichment>();



// add services to DI container
{
    var services = builder.Services;
    var env = builder.Environment;
 
    services.AddCors();
    services.AddControllers().AddJsonOptions(x =>
    {
        // serialize enums as strings in api responses (e.g. Role)
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

        // ignore omitted parameters on models to enable optional params (e.g. User update)
        x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

}
builder.Services.AddMemoryCache();

// Register API services
builder.Services

    .AddSingleton<IKeyVaultClient, KeyVaultClient>()    
    .AddHttpClient();

try
{
    builder.Services
        .Configure<KeyVaultSettings>(options =>
        {
            options.TenantId = builder.Configuration["AzureAd:TenantId"];
            options.ClientId = builder.Configuration["AzureAd:ClientId"];
            options.KeyVaultPath = new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/");
            options.AuthenticationMode = KeyVaultAuthenticationMode.SystemAuthenticated;
            options.CDNToken = builder.Configuration["StorageSASTokenCDN"];
        });
}
catch (Exception ex)
{
    Instrument.Logger.LogMessage(EventLevel.Informational,builder.Configuration["ApplicationInsights:InstrumentationKey"], "initializing object error: " + ex.Message,  $"GetUserRole:Starting");

}

var app = builder.Build();

app.UseAuthentication();

app.Use(async (context, next) =>
{
    Thread.CurrentPrincipal = context.User;
    await next(context);
});
app.UseAuthorization();


app.UseExceptionHandler("/Error");


if (useSwagger)
{
    app.InitializeSwagger();
}

app.UseHttpsRedirection();

app.UseHsts();



// configure HTTP request pipeline
{
    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // global error handler
  

    // retry on exception  
    app.UseMiddleware<RetryWithErrorHandler>(3, TimeSpan.FromSeconds(2));

    app.MapControllers();
}

app.Run();