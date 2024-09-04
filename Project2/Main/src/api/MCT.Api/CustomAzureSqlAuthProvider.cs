// <copyright file="CustomAzureSqlAuthProvider.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.API
{
    using Azure.Core;
    using Azure.Identity;
    using Microsoft.Data.SqlClient;

    /// <summary>
    /// CustomAzureSqlAuthProvider
    /// </summary>
    public class CustomAzureSqlAuthProvider : SqlAuthenticationProvider
    {
        private static readonly string[] AzureSqlScopes = new[]
        {
            "https://database.windows.net//.default",
        };

        /// <inheritdoc/>
        public override async Task<SqlAuthenticationToken> AcquireTokenAsync(SqlAuthenticationParameters parameters)
        {
            TokenCredential credential = new DefaultAzureCredential();
            var tokenRequestContext = new TokenRequestContext(AzureSqlScopes);
            var tokenResult = await credential.GetTokenAsync(tokenRequestContext, default).ConfigureAwait(false);
            return new SqlAuthenticationToken(tokenResult.Token, tokenResult.ExpiresOn);
        }

        /// <inheritdoc/>
        public override bool IsSupported(SqlAuthenticationMethod authenticationMethod) => authenticationMethod.Equals(SqlAuthenticationMethod.ActiveDirectoryIntegrated);
    }
}
