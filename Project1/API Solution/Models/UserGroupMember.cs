// <copyright file="UserGroupMember.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Newtonsoft.Json;

namespace MCAPSHelpVNext.API.Models
{
    #nullable enable

    /// <summary>
    /// Property class - UserGroupMember
    /// </summary>
    public class UserGroupMember<T>
    {
        /// <summary>
        /// Property - userID
        /// </summary>
        [JsonProperty("userID")]
        public string? UserID { get; set; }

        /// <summary>
        /// Property - value
        /// </summary>
        [JsonProperty("value")]
        public IEnumerable<T>? Value { get; private set; }
    }
}
