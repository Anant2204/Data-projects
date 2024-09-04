// <copyright file="Program.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

using Azure.Identity;

using MCT.API;
using MCT.API.Attributes;
using MCT.API.Extensions;
using MCT.DataAccess;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Primitives;
using Microsoft.Services.Tools.Infrastructure.KeyVault;
using Microsoft.Services.Tools.Infrastructure.Logging;

using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

using Microsoft.Identity.Web;
using Microsoft.Identity.ServiceEssentials;
using Microsoft.Identity.ServiceEssentials.Extensions.AspNetCoreMiddleware;
using Microsoft.IdentityModel.S2S.Extensions.AspNetCore;

var builder = WebApplication.CreateBuilder(args);


if (!builder.Environment.IsDevelopment() && !string.IsNullOrWhiteSpace(builder.Configuration["KeyVaultName"]))
{
    builder.Configuration.AddAzureKeyVault(
            new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
            new DefaultAzureCredential(),
            new PrefixKeyVaultSecretManager(builder.Configuration["AppId"]));
}

// Configure Authentication

builder.Services.AddAuthentication(S2SAuthenticationDefaults.AuthenticationScheme)
.AddMiseWithDefaultAuthentication(builder.Configuration);

//builder.Services.AddRequiredScopeAuthorization();
//builder.Services.AddRequiredScopeOrAppPermissionAuthorization();



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

builder.Services.AddApplicationInsightsTelemetry();

builder.Services.AddServiceProfiler();

// Add services to the container.
builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder(S2SAuthenticationDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .Build();

    options.Filters.Add(new AuthorizeFilter(policy));
});

////builder.Services.AddAuthorization(options =>
////{
////    options.AddPolicy("Manager", policy => policy.RequireRole("Manager"));
////    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
////});

builder.Services.AddEndpointsApiExplorer();


// Swagger generation
if (bool.TryParse(builder.Configuration["Swagger:UseSwagger"], out bool useSwagger) && useSwagger)
{
    builder.Services.AddSwagger(builder.Configuration);
}

builder.InitializeLogging();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
    .AddSingleton<IKeyVaultClient, KeyVaultClient>();

builder.Services
    .Configure<KeyVaultSettings>(options =>
    {
        options.TenantId = builder.Configuration["AzureAd:TenantId"];
        options.ClientId = builder.Configuration["AzureAd:ClientId"];
        options.KeyVaultPath = new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/");
        options.AuthenticationMode = KeyVaultAuthenticationMode.SystemAuthenticated;
    });

builder.Services.AddDIServices(builder.Configuration);

builder.Services
    .Configure<ApplicationStateOptions>(builder.Configuration.GetSection(nameof(ApplicationStateOptions)));

var app = builder.Build();

// Configure the HTTP request pipeline.

if (useSwagger)
{
    app.InitializeSwagger();
}

//app.UseHttpsRedirection();

app.UseHsts();

app.UseAuthentication();

app.UseMiddleware<AuthMiddleware>();
app.UseAuthorization();
app.UseMise();
app.UseMiddleware<ExceptionAndLogMiddleware>();

app.MapControllers();

app.Use(async (c, next) =>
{
    var activityId = c.Request.Headers[Microsoft.Services.Tools.Infrastructure.Logging.Constants.ActivityIdHeader];
    if (activityId == StringValues.Empty)
    {
        activityId = Guid.NewGuid().ToString().ToUpperInvariant();
    }

    Instrument.Logger.SetUserId(c.User?.Identity?.Name ?? string.Empty);
    Instrument.Logger.SetActivityId(activityId);
    await next.Invoke();
});

app.Run();