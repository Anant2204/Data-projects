// <copyright file="MsxSettingOptions.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Api.Attributes
{
    /// <summary>
    /// The MSX Settings Options type.
    /// </summary>
    public class MsxSettingOptions
    {
        /// <summary>
        /// Gets or sets the Base Url of Msx End Point.
        /// </summary>
        public Uri BaseUrl { get; set; }

        /// <summary>
        /// Gets or sets the Authority Id of the Msx Auth Service.
        /// </summary>
        public string AuthorityId { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the Client Id for Authentication.
        /// </summary>
        public string ClientId { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the Client Secret for Authentication.
        /// </summary>
        public string ClientSecret { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the Azure AD End point.
        /// </summary>
        public string IdentityProvider { get; set; } = string.Empty;
    }
}
