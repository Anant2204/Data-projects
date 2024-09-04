// <copyright file="CustomDbContextFactory.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Context;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace MCAPSHelpVNext.UserGroupSync
{
    public class CustomDbContextFactory : IDbContextFactory<BSODBContext>
    {
        private readonly IConfiguration _configuration;

        public CustomDbContextFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public BSODBContext CreateDbContext()
        {

            IConfiguration configuration = new ConfigurationBuilder()
           .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
           .Build();

         
            string connectionString = configuration["ConnectionStrings:DefaultConnection"];
           

            var optionsBuilder = new DbContextOptionsBuilder<BSODBContext>();
            SqlAuthenticationProvider.SetProvider(
                SqlAuthenticationMethod.ActiveDirectoryDeviceCodeFlow,
                new CustomAzureSQLAuthProvider());
            var sqlConnection = new SqlConnection(connectionString);
            optionsBuilder.UseSqlServer(sqlConnection);

            return new BSODBContext(optionsBuilder.Options);
        }
    }

}
