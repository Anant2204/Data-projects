// <copyright file="GraphController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.API.CachingService;
using MCAPSHelpVNext.API.DTO;
using MCAPSHelpVNext.API.Services;
using MCAPSHelpVNext.API.Utility;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System.Data;
using System.Net.Http.Headers;
using System.Resources;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;
using MCAPSHelpVNext.API.Models;

namespace MCAPSHelpVNext.API.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class GraphController : ControllerBase
    {

        private readonly IConfiguration _configgration;
        private readonly UserService _userService;
        private readonly string _correlationID;
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(GraphController).Assembly);
        private readonly IMemoryCache _memoryCache;

        /// <summary>
        /// Instantiate objects
        /// </summary>
        /// <param name="userService"></param>
        /// <param name="configuration"></param>
        /// <param name="cachingService"></param>
        /// <param name="userWorkSpaceService"></param>
        /// <param name="memoryCache"></param>
        public GraphController(UserService userService, IConfiguration configuration, ICachingService cachingService, UserWorkSpaceService userWorkSpaceService, IMemoryCache memoryCache)
        {
            _userService = userService;
            _configgration = configuration;
            _correlationID = CorrelationSettings.CorrelationId;
            _memoryCache = memoryCache;
        }

        /// <summary>
        /// GetGraphUsersNames
        /// </summary>
        /// <param name="UPN"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        [HttpGet("GraphUserName/{UPN}")]
        public async Task<ActionResult> GetGraphUsersNames(string UPN)
        {
            string _logUserDescription = rm.GetString("graphKey2");

            try
            {
                string requestUrl = _configgration.GetValue<string>("GraphUser:EndPoint");
                try
                {
                    var cachedToken = await GraphToken();

                    using (HttpClient client = new HttpClient())
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", cachedToken);

                        var response = await client.PostAsync(new Uri(requestUrl + UPN), null);

                        if (response.IsSuccessStatusCode)
                        {
                            // Parse the response content into a collection
                            var responseBody = await response.Content.ReadAsStringAsync();

                            UserGraphApiResponse userApiResponse = JsonConvert.DeserializeObject<UserGraphApiResponse>(responseBody);
                            Logging.LogRequest(_correlationID, _logUserDescription, "Graph", "200", true);
                            return Ok(userApiResponse);
                        }
                    }
                    return BadRequest();
                }
                catch (Exception ex)
                {
                    throw new ArgumentException(ex.Message);
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        /// <summary>
        /// GraphUserGroupCheck
        /// </summary>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        [HttpGet("GraphUserGroupCheck")]
        public async Task<ActionResult> GraphUserGroupCheck()
        {
            var _logDescription = rm.GetString("graphKey2");

            try
            {
                var upn = this.User?.Identity.Name;
                var userId = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
                string apiUrl = _configgration.GetValue<string>("WebJob:ApiEndPoint");
                string apikey = _configgration.GetValue<string>("WebJob:ApiKey");
                var securityGroupIds = _configgration.GetSection("SecurityGroupIds").Get<Dictionary<string, Guid>>();
                var groupIds = securityGroupIds.Values.Select(id => id.ToString()).ToList();

                var cachedToken = await GraphToken();

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("api-key", apikey);

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", cachedToken);

                    var requestContent = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(groupIds), System.Text.Encoding.UTF8, "application/json");
                    string requestUrl = $"{apiUrl}?userid={userId}";

                    Uri requestUri = new Uri(requestUrl);

                    var response = await client.PostAsync(requestUri, requestContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // Parse the response content into a collection
                        var responseBody = JsonConvert.DeserializeObject<string>(await response.Content.ReadAsStringAsync());

                        var userApiResponse = JsonConvert.DeserializeObject<UserGroupMember<string>>(responseBody);
                        Logging.LogRequest(_correlationID, _logDescription, "Graph", "200", true);

                        if (userApiResponse.Value.Any()) {
                            _userService.DisableUserAndRelatedData(upn);
                        }

                        return Ok(userApiResponse);
                    }
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        private async Task<string> GraphToken()
        {
            try
            {
                string clientId = _configgration.GetValue<string>("WebJob:ClientId");
                string clientSecret = _configgration.GetValue<string>("WebJob:ClientSecret");
                string authority = _configgration.GetValue<string>("WebJob:Authority");
                string scope = _configgration.GetValue<string>("WebJob:Scope");
                string tenentId = _configgration.GetValue<string>("WebJob:Tenant");

                var userId = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

                string cacheKey = "AccessTokenGraph_" + userId;

                var cachedToken = _memoryCache.Get<string>(cacheKey);

                if (cachedToken == null)
                {

                    var cca = ConfidentialClientApplicationBuilder
                             .Create(clientId)
                             .WithClientSecret(clientSecret)
                             .WithTenantId(tenentId)
                             .WithAuthority(new Uri(authority))
                             .Build();
                    string[] scopes = new string[] { scope };

                    // If token is not in cache, acquire a new token
                    var result = await cca.AcquireTokenForClient(scopes).ExecuteAsync();

                    // Store the token in cache for 20 minutes
                    _memoryCache.Set(cacheKey, result.AccessToken, TimeSpan.FromMinutes(20));

                    // Use the newly acquired token
                    cachedToken = result.AccessToken;
                }

                return cachedToken;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
