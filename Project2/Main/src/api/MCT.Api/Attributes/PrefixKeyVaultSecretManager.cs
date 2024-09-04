// <copyright file="PrefixKeyVaultSecretManager.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Security.KeyVault.Secrets;

namespace MCT.API.Attributes
    {
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

            /// <inheritdoc/>
           public override bool Load(SecretProperties secret)
        {
            if (secret == null)
            {
                throw new ArgumentNullException(nameof(secret));
            }
            if (string.IsNullOrWhiteSpace(secret.Name))
            {
                throw new ArgumentException("KeyVaultSecret input parameter name of Load method is null", nameof(secret));
            }

            return secret.Name.StartsWith(this.prefix);
        }

        /// <inheritdoc/>
        public override string GetKey(KeyVaultSecret secret)
        {
            if (secret == null)
            {
                throw new ArgumentNullException(nameof(secret));
            }
            if (string.IsNullOrWhiteSpace(secret.Name))
            {
                throw new ArgumentException("KeyVaultSecret input parameter name of GetKey method is null", nameof(secret));
            }

            return secret.Name[this.prefix.Length..].Replace("--", ConfigurationPath.KeyDelimiter);
        }
    }
    }

