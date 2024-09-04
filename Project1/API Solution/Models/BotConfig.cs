// <copyright file="BotConfig.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Models
{
    /// <summary>
    /// BotConfig
    /// </summary>
    public class BotConfig
    {
        /// <summary>
        ///      Property Name - token.
        ///  </summary>
        public string token { get; set; }
        /// <summary>
        ///      Property Name - UserId.
        ///  </summary>
        public string UserId { get; set; }
        /// <summary>
        ///      Property Name - DisplayName.
        ///  </summary>
        public string DisplayName { get; set; }
        /// <summary>
        ///      Property Name - EmailAddress.
        ///  </summary>
        public string EmailAddress { get; set; }
        /// <summary>
        ///      Property Name - IrisBaseApiUrl.
        ///  </summary>
        public string IrisBaseApiUrl { get; set; }
    }
}
