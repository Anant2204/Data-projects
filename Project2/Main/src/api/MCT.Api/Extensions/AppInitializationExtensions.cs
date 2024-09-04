// <copyright file="AppInitializationExtensions.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Security.Claims;
using System.Security.Principal;
using global::Azure.Identity;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Microsoft.Services.Tools.Infrastructure.Logging;
using Validation;


namespace MCT.API.Extensions
{

    /// <summary>
    /// Contains extension methods for app builder.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public static class AppInitializationExtensions
    {

        /// <summary>
        /// Gets the user firstname and lastname from the claims identity.
        /// </summary>
        /// <param name="claims"></param>
        /// <returns>The user fullname</returns>
        public static string? GetFullName(this IEnumerable<Claim> claims)
        {
            Requires.NotNull(claims, nameof(claims));

            if (claims != null)
            {          
                var givenNameClaim = claims.FirstOrDefault(x => x.Type == "given_name");
                var surnameClaim = claims.FirstOrDefault(x => x.Type == "family_name");

                string givenName = givenNameClaim?.Value ?? string.Empty;
                string surname = surnameClaim?.Value ?? string.Empty;

                string fullname = $"{givenName} {surname}";

                return fullname;

            }

            return null;
        }

        /// <summary>
        /// Initialize instrumentation component for the application.
        /// </summary>
        /// <param name="builder">The Web Application.</param>
        public static void InitializeLogging(this WebApplicationBuilder builder)
        {
            var traceLevel = builder.Configuration.GetValue<string>("ApplicationInsights:TraceLevel");

            if (!Enum.TryParse(traceLevel, out TraceLevel level))
            {
                level = TraceLevel.Warning;
            }

            var useConnectionString = true;
            var key = builder.Configuration.GetValue<string>("ApplicationInsights:ConnectionString");
   
            if (string.IsNullOrWhiteSpace(key))
            {
                useConnectionString = false;
                key = builder.Configuration.GetValue<string>("ApplicationInsights:InstrumentationKey");

            }

            Requires.NotNull(key, nameof(key));
            Instrument.Initialize("MCT API", level, useConnectionString, key);
        }

        /// <summary>
        /// Initializes cosmos client for the application.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <param name="configuration">The configuration manager.</param>
        /// <returns>The <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddSwagger(this IServiceCollection services, ConfigurationManager configuration)
        {
            return services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows()
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri($"https://login.microsoftonline.com/{configuration["AzureAD:TenantId"]}/oauth2/v2.0/authorize"),
                            Scopes = new Dictionary<string, string> { { $"api://{configuration["AzureAD:ClientId"]}/user_impersonation", "Access API" } },
                        },
                    },
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Scheme = "Bearer",
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" },
                            Scheme = "Bearer",
                            Type = SecuritySchemeType.Http,
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string> { $"api://{configuration["AzureAD:ClientId"]}/user_impersonation" }
                    },
                });
            });
        }

        /// <summary>
        /// Initialize instrumentation component for the application.
        /// </summary>
        /// <param name="app">The Web Application.</param>
        /// <returns>The <see cref="WebApplication"/>.</returns>
        public static IApplicationBuilder InitializeSwagger(this WebApplication app)
        {
            app.UseSwagger();

            if (app.Environment.IsDevelopment()) // Enable Swagger UI only in local dev env
            {
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Manager Conversation Tool");
                    c.OAuthClientId(app.Configuration["Swagger:ClientId"]);
                    c.OAuthAppName("MCT API V1");
                    c.OAuthScopeSeparator(" ");
                });
            }

            return app;
        }
    }
}
