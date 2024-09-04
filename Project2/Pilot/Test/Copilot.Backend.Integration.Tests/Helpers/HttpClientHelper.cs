//-----------------------------------------------------------------------
// <copyright file="HttpClientHelper.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;

namespace Copilot.Backend.Integration.Tests;

/// <summary>
/// The Http Client Helper Class.
/// </summary>
public class HttpClientHelper
{
    /// <summary>
    /// The Client ID
    /// </summary>
    private static readonly string ClientId = Environment.GetEnvironmentVariable("ClientId") ?? string.Empty;

    /// <summary>
    /// The Copilot API App key
    /// </summary>
    private static readonly string CopilotApiAppKey = "CopilotApi-AppKey";

    /// <summary>
    /// The bearer header
    /// </summary>
    private static readonly string Bearer = "Bearer";

    /// <summary>
    /// The Tenant ID
    /// </summary>
    private static readonly string TenantId = Environment.GetEnvironmentVariable("TenantId") ?? string.Empty;

    /// <summary>
    /// The AD instances
    /// </summary>
    private static readonly string ADInstances = Environment.GetEnvironmentVariable("ADInstances") ?? string.Empty;

    /// <summary>
    /// The Copilot API Base Url
    /// </summary>
    private static readonly string CopilotApiBasicUri = Environment.GetEnvironmentVariable("CopilotApiBaseUrl") ?? string.Empty;

    /// <summary>
    /// The Copilot Api Resource
    /// </summary>
    private static readonly string CopilotApiResource = Environment.GetEnvironmentVariable("CopilotApi-Resource") ?? string.Empty;

    ///// <summary>
    ///// Initialize a new instance of <see cref="HttpClientHelper"/> class
    ///// </summary>
    //protected HttpClientHelper()
    //{
    //}

    /// <summary>
    /// Post the data to Copilot API
    /// </summary>
    /// <typeparam name="TRequest">The Request Type</typeparam>
    /// <typeparam name="TResponse">The Response Type</typeparam>
    /// <param name="api">The API Url</param>
    /// <param name="contentValue">The Content Value</param>
    /// <param name="log">The Log</param>
    /// <returns>The reponse received after posting to API</returns>
    public static async Task<TResponse> PostCopilotApiAsync<TRequest, TResponse>(string api, TRequest contentValue)
    {
        ApplicationLogHelper.LogInformation(Constants.GettingTokenStartedMessage);

        try
        {
            var keyVaultName = Environment.GetEnvironmentVariable(Constants.BuddyKeyVaultName) ?? string.Empty;
            var token = await TokenHelper.GetAddTokenAsync(ClientId, KeyVaultHelper.GetSecretValue(CopilotApiAppKey, keyVaultName), ADInstances, TenantId, CopilotApiResource).ConfigureAwait(false);
            ApplicationLogHelper.LogInformation(Constants.TokenReceivedMessage);

            using (var client = new HttpClient())
            {
                ApplicationLogHelper.LogInformation($"{Constants.CopilotIntegrationTest} Started calling API {nameof(PostCopilotApiAsync)} - {api}");

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(Bearer, token);
                client.BaseAddress = new Uri(CopilotApiBasicUri);

                var content = new StringContent(JsonConvert.SerializeObject(contentValue), System.Text.Encoding.UTF8, Constants.AppJson);
                var response = await client.PostAsync(new Uri(api, UriKind.Relative), content).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    if (json is not null && json != string.Empty)
                    {
                        return await Task.Factory.StartNew(() => JsonConvert.DeserializeObject<TResponse>(json)).ConfigureAwait(false);
                    }
                }

                ApplicationLogHelper.LogInformation($"{Constants.CopilotIntegrationTest} Successful response received from {nameof(PostCopilotApiAsync)} - {api}.");
                response.EnsureSuccessStatusCode();
            }

            return JsonConvert.DeserializeObject<TResponse>(string.Empty);
        }
        catch (Exception e)
        {
            ApplicationLogHelper.LogInformation(e.StackTrace ?? e.Message);
            throw;
        }
    }

}
