// <copyright file="KeyVaultAuthenticationMode.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Services
{
    /// <summary>
    /// The KeyVault Authentication Model options.
    /// </summary>
    public enum KeyVaultAuthenticationMode
    {
        /// <summary>
        /// Authentication using ClientSecret.
        /// </summary>
        ClientSecret,

        /// <summary>
        /// Authentication using certificate thumbprint.
        /// </summary>
        Certificate,

        /// <summary>
        /// Authentication using system authenticated.
        /// </summary>
        SystemAuthenticated,
    }
}