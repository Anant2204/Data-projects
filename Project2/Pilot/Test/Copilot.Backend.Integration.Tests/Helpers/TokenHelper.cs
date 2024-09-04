//-----------------------------------------------------------------------
// <copyright file="TokenHelper.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

using Newtonsoft.Json.Linq;
using System.Globalization;
using Microsoft.Identity.Client;

namespace Copilot.Backend.Integration.Tests;

/// <summary>
/// The Token Helper class
/// </summary>
public class TokenHelper
{
    /// <summary>
    /// Initializes a new instance of the <see cref="TokenHelper"/> class
    /// </summary>
    protected TokenHelper()
    {
    }

    /// <summary>
    /// Gets the add token
    /// </summary>
    /// <param name="clientId">The client identifier.</param>
    /// <param name="appkey">The app key.</param>
    /// <param name="instances">The instances.</param>
    /// <param name="tenant">The tenant.</param>
    /// <param name="todoResourceid">The to do resource id.</param>
    /// <param name="log">The logger.</param>
    /// <returns>The string token</returns>
    public static async Task<string> GetAddTokenAsync(string clientId, string appkey, string instances, string tenant, string todoResourceid)
    {
        try
        {
            var authority = string.Format(CultureInfo.InvariantCulture, instances, tenant);
            var msal = ConfidentialClientApplicationBuilder.Create(clientId)
                  .WithClientId(clientId)
                  .WithClientSecret(appkey)
                  .WithAuthority(new Uri(authority))
                  .Build();
            var scope = new[] { $"{todoResourceid}/.default" };
            var result = await msal.AcquireTokenForClient(scope).ExecuteAsync().ConfigureAwait(false);
            ApplicationLogHelper.LogInformation($"{Constants.CopilotIntegrationTest} Token acquiring succesfull");
            return result.AccessToken;

        }
        catch (Exception e)
        {
            ApplicationLogHelper.LogInformation(e.StackTrace ?? e.Message);
            throw;
        }

    }

    /// <summary>
    /// Gets the access token via sending username and password
    /// </summary>
    /// <param name="clientId">The client identifier.</param>
    /// <param name="appkey">The app key.</param>
    /// <param name="instances">The instances.</param>
    /// <param name="tenant">The tenant.</param>
    /// <param name="resource">The resource.</param>
    /// <param name="log">The logger.</param>
    /// <param name="username">Username from appconfig</param>
    /// <param name="password">Password from keyvault</param>
    /// <returns>The string token</returns>
    public static async Task<string> GetAccessTokenAsync(string clientId, string appkey, string instances, string tenant, string resource, string username, string password)
    {
        var token = string.Empty;
        var headers = new Dictionary<string, string>
        {
            { "grant_type", "client_credentials" },
            { "resource", resource },
            { "client_id", clientId },
            { "client_secret", appkey },
            { "username", username },
            { "password", password }
        };

        var url = string.Concat(string.Format(CultureInfo.InvariantCulture, instances, tenant), "/oauth2/token");
        using (HttpClient client = new HttpClient())
        {
            using (HttpContent content = new FormUrlEncodedContent(headers))
            {
                try
                {
                    using (HttpResponseMessage response = await client.PostAsync(new Uri(url), content).ConfigureAwait(false))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            ApplicationLogHelper.LogInformation($"{Constants.CopilotIntegrationTest} Access Token successfully acquired");
                            var payload = JObject.Parse(await response.Content.ReadAsStringAsync());
                            token = payload.Value<string>("access_token");
                        }
                        else
                        {
                            ApplicationLogHelper.LogInformation($"{Constants.CopilotIntegrationTest} Access token acquiring failed");
                        }
                    }
                }
                catch (Exception e)
                {
                    ApplicationLogHelper.LogInformation(e.StackTrace ?? e.Message);
                    throw;
                }
            }
        }

        return token ?? string.Empty;
    }
}
