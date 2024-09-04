//-----------------------------------------------------------------------
// <copyright file="KeyVaultHelper.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using System.Globalization;

namespace Copilot.Backend.Integration.Tests;

/// <summary>
/// Key Vault Helper class
/// </summary>
public static class KeyVaultHelper
{
    /// <summary>
    /// The is key vault enabled
    /// </summary>
    private static readonly bool IsKeyVaultEnabled = Convert.ToBoolean(Environment.GetEnvironmentVariable("IsAzureKeyVaultEnabled"), CultureInfo.CurrentCulture);

    /// <summary>
    /// Gets the secret value.
    /// </summary>
    /// <param name="keyName">The secret node.</param>
    /// <param name="keyVaultName">The key vault to be accessed.</param>
    /// <param name="log">The log.</param>
    /// <returns>The Value</returns>
    public static string GetSecretValue(string keyName, string keyVaultName)
    {
        try
        {
            if (IsKeyVaultEnabled)
            {
                keyName += "-kv";
                ApplicationLogHelper.LogInformation($"{Constants.CopilotIntegrationTest} KeyVault - Trying to access KeyVault for {keyName}");
                var endpointKeyVault = $"https://{keyVaultName}.vault.azure.net";
                var keyvaultClient = new SecretClient(new Uri($"{endpointKeyVault}"), new DefaultAzureCredential());
                ApplicationLogHelper.LogInformation($"{Constants.CopilotIntegrationTest} KeyVault - Retrieved value for key {keyName} from KeyVault");
                string secretValue = keyvaultClient.GetSecret(keyName).Value.Value;
                return secretValue;
            }
            else
            {
                ApplicationLogHelper.LogInformation($"{Constants.CopilotIntegrationTest} Fetching value for key {keyName} from app settings");
                return Environment.GetEnvironmentVariable(keyName) ?? string.Empty;
            }
        }
        catch (Exception e)
        {
            ApplicationLogHelper.LogInformation(e.Message);
            throw;
        }
    }
}
