// <copyright file="KeyVaultSettings.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Services
{
    using System;

    /// <summary>
    /// The settings option to connect to key vault.
    /// </summary>
    public class KeyVaultSettings
    {
        /// <summary>
        /// Gets or sets the key vault path.
        /// </summary>
        /// <value>
        /// The key vault path.
        /// </value>
        public Uri KeyVaultPath { get; set; }

        /// <summary>
        /// Gets or sets the tenant identifier.
        /// </summary>
        /// <value>
        /// The tenant identifier.
        /// </value>
        public string TenantId { get; set; }

        /// <summary>
        /// Gets or sets the client identifier.
        /// </summary>
        /// <value>
        /// The client identifier.
        /// </value>
        public string ClientId { get; set; }

        /// <summary>
        /// Gets or sets the client secret.
        /// </summary>
        /// <value>
        /// The client secret.
        /// </value>
        public string ClientSecret { get; set; }

        /// <summary>
        /// Gets or sets the authentication mode.
        /// </summary>
        /// <value>
        /// The authentication mode.
        /// </value>
        public KeyVaultAuthenticationMode AuthenticationMode { get; set; }

        /// <summary>
        /// Gets or sets the thumbprint.
        /// </summary>
        /// <value>
        /// The thumbprint.
        /// </value>
        public string Thumbprint { get; set; }

        /// <summary>
        /// Gets or sets the CDNToken identifier.
        /// </summary>
        /// <value>
        /// The CDNToken identifier.
        /// </value>
        public string CDNToken { get; set; }
    }
}