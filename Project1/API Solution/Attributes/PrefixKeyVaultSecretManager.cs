// <copyright file="PrefixKeyVaultSecretManager.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>
using MCAPSHelpVnext.Api.Attributes;



namespace MCAPSHelpVnext.Api.Attributes
{
    using global::Azure.Extensions.AspNetCore.Configuration.Secrets;
    using global::Azure.Security.KeyVault.Secrets;

    /// <summary>
    /// The <see cref="KeyVaultSecretManager"/> to support application wide prefix.
    /// </summary>
    public class PrefixKeyVaultSecretManager : KeyVaultSecretManager
    {
        private readonly string prefix;

        /// <summary>
        /// Initializes a new instance of the <see cref="PrefixKeyVaultSecretManager"/> class.
        /// </summary>
        /// <param name="prefix">The key prefix to use.</param>
        public PrefixKeyVaultSecretManager(string prefix)
            => this.prefix = $"{prefix}--";

        public override bool Load(SecretProperties secret)
        {
            if (secret == null)
            {
                throw new ArgumentNullException(nameof(secret));
            }

            return secret.Name.StartsWith(this.prefix);
        }

        public override string GetKey(KeyVaultSecret secret)
        {
            if (secret == null)
            {
                throw new ArgumentNullException(nameof(secret));
            }

            return secret.Name[this.prefix.Length..].Replace("--", ConfigurationPath.KeyDelimiter);
        }
    }
}
