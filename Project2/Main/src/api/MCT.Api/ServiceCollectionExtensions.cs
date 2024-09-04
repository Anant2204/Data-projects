// <copyright file="ServiceCollectionExtensions.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

using System.Globalization;
using MCT.Business.Interfaces;
using MCT.Business.Services;
using MCT.Business.SharedServices;
using MCT.DataAccess.Context;
using MCT.DataAccess.Interfaces;
using MCT.DataAccess.Repository;
using MCT.DataAccess.UnitOfWork;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace MCT.API
{
    /// <summary>
    ///   DI Extenstion class
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>Adds the dependency injection services.</summary>
        /// <param name="services">The services.</param>
        /// <param name="configuration">The configuration.</param>
        /// <returns>
        ///   <br />
        /// </returns>
        public static IServiceCollection AddDIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ConversationContext>(options =>
            {
                string connectionString;
                if (Convert.ToBoolean(configuration["IsSqlADEnabled"], CultureInfo.CurrentCulture))
                {
                    SqlAuthenticationProvider.SetProvider(SqlAuthenticationMethod.ActiveDirectoryIntegrated, new CustomAzureSqlAuthProvider());
                    var builder = new SqlConnectionStringBuilder(configuration.GetValue<string>("ConnectionStrings:ADConversationToolDatabase"));
                    connectionString = builder.ConnectionString;
                }
                else
                {
                    connectionString = configuration.GetValue<string>("ConnectionStrings:ConversationToolDatabase");
                };

                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                options.UseSqlServer(connectionString);
            });

            // Repository Dependencies 
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IManagerRepository, ManagerRepository>();
            services.AddScoped<ISendStayRepository, SendStayRepository>();
            services.AddScoped<IReceiveConversationRepository, ReceiveConversationRepository>();
            services.AddScoped<IFYSummaryRepository, FYSummaryRepository>();
            services.AddScoped<IConversationScriptTaxonomyRepository, ConversationScriptTaxonomyRepository>();
            services.AddScoped<IFutureManagerCorrectionRepository, FutureManagerCorrectionRepository>();
            services.AddScoped<ICommonRepository, CommonRepository>();
            services.AddScoped<ITaxonomyCorrectionRepository, TaxonomyCorrectionRepository>();
            services.AddScoped<ITaxonomyScriptContentRepository, TaxonomyScriptContentRepository>();

            // Services Dependencies 
            services.AddScoped<IManagerService, ManagerService>();
            services.AddScoped<ISendStayConversationService, SendStayConversationService>();
            services.AddScoped<IReceiveConversationService, ReceiveConversationService>();
            services.AddScoped<IFYSummaryService, FYSummaryService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IConversationScriptTaxonomyService, ConversationScriptTaxonomyService>();
            services.AddScoped<ICommonService, CommonService>();
            services.AddScoped<IFutureManagerCorrectionService, FutureManagerCorrectionService>();
            services.AddScoped<ITaxonomyCorrectionService, TaxonomyCorrectionService>();
            services.AddScoped<ITaxonomyScriptContentService, TaxonomyScriptContentService>();

            return services;
        }
    }
}