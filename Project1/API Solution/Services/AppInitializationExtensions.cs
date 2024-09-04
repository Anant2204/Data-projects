// <copyright file="AppInitializationExtensions.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Api.Services
{
    using System.Diagnostics;
    using System.Diagnostics.CodeAnalysis;
    using System.Security.Principal;
    using System.Text.RegularExpressions;
    using global::Azure.Identity;

    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.OpenApi.Models;

    using MCAPSHelpVnext.Api.Attributes;
    using Microsoft;
    using MCAPSHelpVnext.Common.Logging;
    using System.Reflection;
    using Swashbuckle.AspNetCore.SwaggerUI;
    using CommandLine.Text;

    /// <summary>
    /// Contains extension methods for app builder.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public static class AppInitializationExtensions
    {
        private static readonly Regex TagExpression = new("^\"|\"$");

        /// <summary>
        /// Gets the user alias from the claims identity.
        /// </summary>
        /// <param name="identity">The claims identity.</param>
        /// <returns>The user alias.</returns>
        public static string GetAlias(this IIdentity identity)
        {
            Requires.NotNull(identity, nameof(identity));

            var alias = identity.Name;

            if (alias?.IndexOf('@') > 0)
            {
                alias = alias[..alias.IndexOf('@')];
            }

            return alias ?? "ADMIN";
        }

        /// <summary>
        /// Trims the enclosing quotes from etag.
        /// </summary>
        /// <param name="tag">The ETag.</param>
        /// <returns>The user alias.</returns>
        public static string FormatEtag(this string tag)
        {
            Requires.NotNull(tag, nameof(tag));
            return TagExpression.Replace(tag, string.Empty);
        }

        /// <summary>
        /// Initialize instrumentation component for the application.
        /// </summary>
        /// <param name="builder">The Web Application.</param>
        public static void InitializeLogging(this WebApplicationBuilder builder)
        {
            var traceLevel = builder.Configuration.GetSection("ApplicationInsights")["TraceLevel"];
            if (!Enum.TryParse(traceLevel, out TraceLevel level))
            {
                level = TraceLevel.Warning;
            }

            var useConnectionString = true;
            var key = builder.Configuration.GetSection("ApplicationInsights")["ConnectionString"];
            if (string.IsNullOrWhiteSpace(key))
            {
                useConnectionString = false;
                key = builder.Configuration.GetSection("ApplicationInsights")["InstrumentationKey"];
            }

            Requires.NotNull(key, nameof(key));
            Instrument.Initialize("MCAPSHelp API", level, useConnectionString, key);
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

                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "MCAPSHelp API",
                    Version = "v1",
                    Description = "MCAPSHelp API",
                   
                });

                // Include XML comments for Swagger
                var xmlFile = $"{typeof(AppInitializationExtensions).Assembly.GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

                // Include annotations for Swagger
                c.EnableAnnotations();

            });
        }

        /// <summary>
        /// Initialize instrumentation component for the application.
        /// </summary>
        /// <param name="app">The Web Application.</param>
        /// <returns>The <see cref="WebApplication"/>.</returns>
        public static IApplicationBuilder InitializeSwagger(this WebApplication app)
        {
            return app.UseSwagger()
               .UseSwaggerUI(c =>
               {
                   c.SwaggerEndpoint("/swagger/v1/swagger.json", "MCAPSHelp API");
                   c.OAuthClientId(app.Configuration["Swagger:ClientId"]);
                   c.OAuthAppName("MCAPSHELPDEVAPI");
                   c.OAuthScopeSeparator(" ");
                   c.DisplayRequestDuration();
               });
        }
    }
}
