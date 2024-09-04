//-----------------------------------------------------------------------
// <copyright file="ConfigureCoreServices.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.API.Configuration
{
    using Microsoft.Extensions.DependencyInjection;
    using Copilot.Backend.API.Filters;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Core.Services;
    using Copilot.Backend.Infrastructure.Logging;

    /// <summary>
    /// Configure Core Services.
    /// </summary>
    public static class ConfigureCoreServices
    {
        /// <summary>
        /// Adds the core services.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <returns>Service Collection.</returns>
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
             // Register the AppInsightsLoggerAdapter
            services.AddScoped(typeof(IAppLogger<>), typeof(AppInsightsLoggerAdapter<>));
            // Register the ApplicationLogging
            services.AddScoped<IApplicationLogging, ApplicationLogging>(); 
            // Register the CopilotBotService
            services.AddScoped<ICopilotBotService, CopilotBotService>();
            // Register the CopilotBotService
            services.AddScoped<ICloudGptAISearchService, CloudGptAISearchService>();
            // Register the IntentFinderService
            services.AddScoped<IIntentFinderService, IntentFinderService>(); 
            // Register the CloudGptService
            services.AddScoped<ICloudGptService, CloudGptService>();
            // Register the AzureAISemanticSearch
            services.AddScoped<IAzureAISemantiSearch, AzureAISemanticSearch>();
            // Register the AIResponseGeneratorService
            services.AddScoped<IAIResponseGeneratorService, AIResponseGeneratorService>(); 
            // Register the HttpClient
            services.AddHttpClient(); 
            // Register the GlobalExceptionFilter
            services.AddScoped<GlobalExceptionFilter>(); 
            // Register the GlobalActionFilter
            services.AddScoped<GlobalActionFilter>(); 
            services.AddMvc(options =>
            {
                // Add the GlobalExceptionFilter to the MVC options
                options.Filters.AddService<GlobalExceptionFilter>(); 
                // Add the GlobalActionFilter to the MVC options
                options.Filters.AddService<GlobalActionFilter>(); 
            });

            return services;
        }
    }
}
