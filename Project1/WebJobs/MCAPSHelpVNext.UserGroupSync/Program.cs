// <copyright file="Program.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.WebJobs.Extensions.Storage;
using MCAPSHelpVNext.DataRepository.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using System.Data.Entity.Infrastructure;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using MCAPSHelpVNext.DataRepository.HelperModel;
using System.Text.RegularExpressions;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.Identity.Client;
using MCAPSHelpVNext.DataRepository.Configurations;
using System.Net;
//using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.IO;
using System.Reflection;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Web.Http.Results;
using Newtonsoft.Json;
using MCAPSHelpVNext.API.Utility;
using System.Resources;
using System.ComponentModel.Design;
using System.Collections.ObjectModel;

namespace MCAPSHelpVNext.UserGroupSync
{
    public class Program
    {

        private static IConfiguration _configuration = null;
        
        private static readonly string _correlationID;

       // static ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(Program).Assembly);
        


        static Program()
        {
            _correlationID = CorrelationSettings.CorrelationId;
        }


        static async Task Main(string[] args)
        {

            var builder = new HostBuilder()
            .ConfigureWebJobs(webJobsBuilder =>
            {
                webJobsBuilder.AddTimers();
            })
            .ConfigureAppConfiguration((context, config) =>
            {

                var builder = new ConfigurationBuilder()
                    .SetBasePath(context.HostingEnvironment.ContentRootPath)
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .AddJsonFile($"appsettings.{context.HostingEnvironment.EnvironmentName}.json", optional: true)
                    .AddEnvironmentVariables();
                config.AddConfiguration(builder.Build());
            })
            .ConfigureServices((context, services) =>
            {
                _configuration = context.Configuration;
                
                services.AddSingleton<IConfiguration>(context.Configuration);
            })
            .ConfigureLogging((context, loggingBuilder) =>
            {
                loggingBuilder.AddConsole();
            })
            .Build();

            using (builder)
            {
                builder.Run();
            }
        }

        
        /// <summary>
        /// GetAllTheUserInOnce([TimerTrigger("%WebJob:TriggerDuration%")] TimerInfo timerInfo)
        /// </summary>
        /// <param name="timerInfo"></param>
        /// <returns></returns>
        public static async Task GetAllTheUserInOnce([TimerTrigger("%WebJob:TriggerDuration%")] TimerInfo timerInfo)
        {
           //string _logDescription = rm.GetString("userGroupProgramKey1");

            try
            {
                Console.WriteLine($"Task Started at {DateTime.Now}");
                var serviceProvider = ConnectionEstablished();
                var token = await AccessTokenGenerator();

                if (!string.IsNullOrEmpty(token))
                {
                    using (var scope = serviceProvider.CreateScope())
                    {
                        var userService = scope.ServiceProvider.GetRequiredService<UserService>();
                        var getGroups = scope.ServiceProvider.GetRequiredService<UserADGroupService>();

                        var groups = getGroups.GetAll();
                        List<string> nonNullGroupIDs = groups.Where(x => x.GroupID != null).Select(x => x.GroupID).ToList();

                        Console.WriteLine($"UserADGroups {nonNullGroupIDs} ");
                        var users = userService.GetAll();

                        Console.WriteLine($"Total Users {users} ");

                        await ProcessUsers((IEnumerable<dynamic>)users, nonNullGroupIDs, serviceProvider, token);

                        Console.WriteLine($"Task Ended at {DateTime.Now}");
                       // Logging.LogRequest(_correlationID, _logDescription, "WebJob", "200", true);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred in GetAllTheUserInOnce {ex} ");

            }
        }

        /// <summary>
        /// ProcessUsers(IEnumerable<UserDTO> users, List<string> nonNullGroupIDs, IServiceProvider serviceProvider, string token)
        /// </summary>
        /// <param name="users"></param>
        /// <param name="nonNullGroupIDs"></param>
        /// <param name="serviceProvider"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        private static async Task ProcessUsers(IEnumerable<dynamic> users, List<string> nonNullGroupIDs, IServiceProvider serviceProvider, string token)
        {
            foreach (var user in users)
            {
                try
                {
                    if (!String.IsNullOrEmpty(user.Oid))
                    {
                        await ProcessUser(user, nonNullGroupIDs, serviceProvider, token);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred for user {user.Oid}: {ex}");
                    // Log the error if needed
                }
            }
        }

        /// <summary>
        /// ProcessUser(UserDTO user, List<string> nonNullGroupIDs, IServiceProvider serviceProvider, string token)
        /// </summary>
        /// <param name="user"></param>
        /// <param name="nonNullGroupIDs"></param>
        /// <param name="serviceProvider"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        private static async Task ProcessUser(dynamic user, List<string> nonNullGroupIDs, IServiceProvider serviceProvider, string token)
        {
            var result = await getTheGroupsFromEndPoint(_configuration, nonNullGroupIDs, user.Oid, token);
            MyJsonObject jsonData = JsonConvert.DeserializeObject<MyJsonObject>(result);
            Console.WriteLine($"result of groups {jsonData.UserID} .");
            if (jsonData.Value.Count > 0)
            {
                Console.WriteLine($"result of groups {result} .");
                if (jsonData.Value.Count > 0)
                {
                    AddTheUserInfo(serviceProvider, jsonData.Value, user.Oid);
                }
                Console.WriteLine($"Iteration for user {user.Oid} completed.");
            }
        }


        private static void AddTheUserInfo(IServiceProvider serviceProvider, List<string> _lst, string OID)
        {
          // string _logDescription = rm.GetString("userGroupProgramKey2");

            using (var scope = serviceProvider.CreateScope())
            {
                try
                {
                    var userService = scope.ServiceProvider.GetRequiredService<UserService>();
                    Console.WriteLine($"total groups for add {_lst} OID {OID}");
                    userService.UpdateUserByObjectID(OID, _lst);

                    //Logging.LogRequest(_correlationID, _logDescription, "WebJob", "200", true);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"AddTheUserInfo: {ex.Message}");
                }
            }
        }

        public static async Task<string> AccessTokenGenerator()//(IConfiguration configuration)
        {
           // string _logDescription = rm.GetString("userGroupProgramKey3");
            string clientId = _configuration.GetValue<string>("WebJob:ClientId");
           
            string clientSecret = _configuration.GetValue<string>("WebJob:ClientSecret");
            string authority = _configuration.GetValue<string>("WebJob:Authority");
            string scope = _configuration.GetValue<string>("WebJob:Scope");
            string tenentId = _configuration.GetValue<string>("WebJob:Tenant");

            var cca = ConfidentialClientApplicationBuilder
                     .Create(clientId)
                     .WithClientSecret(clientSecret)
                     .WithTenantId(tenentId)
                     .WithAuthority(new Uri(authority))
                     .Build();
            string[] scopes = new string[] { scope };
            try
            {
                var result = await cca.AcquireTokenForClient(scopes)
                   .ExecuteAsync();

                //Logging.LogRequest(_correlationID, _logDescription, "WebJob", "200", true);
                return result.AccessToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"AccessTokenGenerator: {ex.Message}");
                return "";
            }
        }


        public static IServiceProvider ConnectionEstablished()
        {
           // string _logDescription = rm.GetString("userGroupProgramKey4");

            try
            {
                var connectionString = _configuration.GetValue<string>("ConnectionStrings:DefaultConnection");
                var serviceProvider = new ServiceCollection()
               .AddDbContext<BSODBContext>(options =>
                   {
                       SqlAuthenticationProvider.SetProvider(
                           SqlAuthenticationMethod.ActiveDirectoryDeviceCodeFlow,
                           new CustomAzureSQLAuthProvider());

                       var sqlConnection = new SqlConnection(connectionString);
                       options.UseSqlServer(sqlConnection);
                   })
                   .AddScoped<Microsoft.EntityFrameworkCore.IDbContextFactory<BSODBContext>, CustomDbContextFactory>()
                   .AddScoped<UserService>()
                    .AddScoped<UserADGroupService>() // Assuming UserService depends on BSODBContext
                   .BuildServiceProvider();
               // Logging.LogRequest(_correlationID, _logDescription, "WebJob", "200", true);
                return serviceProvider;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ConnectionEstablished {ex} ");
                return null;
            }
        }


        public static async Task<string> getTheGroupsFromEndPoint(IConfiguration configuration, ICollection<string> groupIds, string userId, string accessToken)
        {
           // string _logDescription = rm.GetString("userGroupProgramKey5");

            string apiUrl = configuration.GetValue<string>("WebJob:ApiEndPoint");
            string apikey = configuration.GetValue<string>("WebJob:ApiKey");

            using (HttpClient client = new HttpClient())
            {
                // Add API key to headers
                client.DefaultRequestHeaders.Add("api-key", apikey);

                // Assuming you have a bearer token, add it to the Authorization header
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                // Create the request content
                var requestContent = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(groupIds), System.Text.Encoding.UTF8, "application/json");

                // Construct the URL with the userid query parameter
                string requestUrl = $"{apiUrl}?userid={userId}";

              
                Uri requestUri = new Uri(requestUrl);

                // Make the POST request
                var response = await client.PostAsync(requestUri, requestContent);

                // Check the response status
                if (response.IsSuccessStatusCode)
                {
                    // Parse the response content into a collection
                    var responseBody = await response.Content.ReadAsStringAsync();
                    string responseCollection = Newtonsoft.Json.JsonConvert.DeserializeObject<string>(responseBody);
                  //  Logging.LogRequest(_correlationID, _logDescription, "WebJob", "200", true);
                    return responseCollection;
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return "";
                }
            }
        }

        public class MyJsonObject
        {
            [JsonProperty("userID")]
            public string? UserID { get; set; }


            [JsonProperty("value")]
            public List<string>? Value { get; private set; }

        }
        }
}
