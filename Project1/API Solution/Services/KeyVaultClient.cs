// <copyright file="KeyVaultClient.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Services
{

    using System.Collections.Concurrent;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;
    using global::Azure.Identity;
    using global::Azure.Security.KeyVault.Secrets;
    using global::Microsoft.Extensions.Options;
    using global::Microsoft;


    /// <summary>
    /// The KeyVaultManager type.
    /// </summary>
    public class KeyVaultClient : IKeyVaultClient
    {
        /// <summary>
        /// The secret clients.
        /// </summary>
        private static readonly ConcurrentDictionary<string, SecretClient> SecretClients = new ConcurrentDictionary<string, SecretClient>();

       

        /// <summary>
        /// The key vault setting.
        /// </summary>
        private readonly KeyVaultSettings keyVaultSettings;

        /// <summary>
        /// The key to refer to the SecretClients collection.
        /// </summary>
        private readonly string key;
        
        /// <summary>
        /// Initializes a new instance of the <see cref="KeyVaultClient"/> class.
        /// </summary>
        /// <param name="keyVaultSettings"></param>
        public KeyVaultClient(IOptions<KeyVaultSettings> keyVaultSettings)
        {
            Requires.NotNull(keyVaultSettings?.Value, nameof(keyVaultSettings));
            Requires.NotNullOrEmpty(keyVaultSettings.Value.TenantId, nameof(KeyVaultSettings.TenantId));
            Requires.NotNullOrEmpty(keyVaultSettings.Value.ClientId, nameof(KeyVaultSettings.ClientId));
            this.keyVaultSettings = keyVaultSettings.Value;
            this.key = $"{this.keyVaultSettings.KeyVaultPath.Host}_{this.keyVaultSettings.AuthenticationMode}";
        }
       

        /// <summary>
        /// Gets the secret value.
        /// </summary>
        /// <param name="secretName">Name of the secret.</param>
        /// <returns>The secret value as string.</returns>
        public string GetSecret(string secretName)
        {
            var secretClient = this.GetKeyVaultSecretClient();
            var secret = secretClient.GetSecret(secretName);
            return secret.Value.Value;
        }

        /// <summary>
        /// Gets the secret value.
        /// </summary>
        /// <param name="secretName">Name of the secret.</param>
        /// <returns>A <see cref="Task"/> representing the secret value.</returns>
        public async Task<string> GetSecretAsync(string secretName)
        {
            var secretClient = this.GetKeyVaultSecretClient();
            var secret = await secretClient.GetSecretAsync(secretName).ConfigureAwait(false);
            return secret.Value.Value;
        }

        /// <summary>
        /// Gets the key vault secret client.
        /// </summary>
        /// <returns>The <see cref="SecretClient"/>.</returns>
        private SecretClient GetKeyVaultSecretClient()
        {
            if (!SecretClients.TryGetValue(this.key, out SecretClient secretClient))
            {
                secretClient = new SecretClient(this.keyVaultSettings.KeyVaultPath, new DefaultAzureCredential());
            }

            return secretClient;
        }
    }
}

