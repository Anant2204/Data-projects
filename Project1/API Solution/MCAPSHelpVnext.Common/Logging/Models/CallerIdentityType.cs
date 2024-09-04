// <copyright file="CallerIdentityType.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    /// <summary>
    /// Known identity types.
    /// </summary>
    public enum CallerIdentityType
    {
        /// <summary>
        /// The UPN.
        /// </summary>
        UPN = 1,

        /// <summary>
        /// The PUID.
        /// </summary>
        PUID = 2,

        /// <summary>
        /// The object identifier.
        /// </summary>
        ObjectID = 3,

        /// <summary>
        /// The certificate.
        /// </summary>
        Certificate = 4,

        /// <summary>
        /// The claim.
        /// </summary>
        Claim = 5,

        /// <summary>
        /// The username.
        /// </summary>
        Username = 6,

        /// <summary>
        /// The key name.
        /// </summary>
        KeyName = 7,

        /// <summary>
        /// The subscription identifier
        /// </summary>
        SubscriptionID = 8,
    }
}