// <copyright file="ServiceCollectionExtensions.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Azure.Core;
using Azure.Identity;
using ManagedIdentityDemo;
using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Data.Entity;
using System.Linq;
namespace MCAPSHelpVNext.API.Utility
{
    public static class ServiceCollectionExtensions
    {
          
            public static IServiceCollection AddCustomDbContext(this IServiceCollection services, IConfiguration configuration)
            {
                string connectionString = configuration["ConnectionStrings:DefaultConnection"];
                services.AddDbContext<BSODBContext>(options =>
                {
                    SqlAuthenticationProvider.SetProvider(
                        SqlAuthenticationMethod.ActiveDirectoryDeviceCodeFlow,
                        new CustomAzureSQLAuthProvider());
                    var sqlConnection = new SqlConnection(connectionString);
                    options.UseSqlServer(sqlConnection);
                });

                services.AddScoped<IDbContextFactory<BSODBContext>, CustomDbContextFactory>(); // Registering the factory
                return services;
            }


    }

}
