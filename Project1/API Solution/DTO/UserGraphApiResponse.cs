// <copyright file="UserGraphApiResponse.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Newtonsoft.Json;

namespace MCAPSHelpVNext.API.DTO
{
    /// <summary>
    /// UserGraphApiResponse
    /// </summary>
    public class UserGraphApiResponse
    {
        /// <summary>
        /// 
        /// </summary>
        [JsonProperty("@odata.context")]
        public string ODataContext { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<UserInfo> Value { get; set; }
    }

    /// <summary>
    /// UserInfo
    /// </summary>
    public class UserInfo
    {
        /// <summary>
        /// displayName
        /// </summary>
        public string displayName { get; set; }
        /// <summary>
        /// givenName
        /// </summary>
        public string givenName { get; set; }
        /// <summary>
        /// surname
        /// </summary>
        public string surname { get; set; }
        /// <summary>
        /// userPrincipalName
        /// </summary>
        public string userPrincipalName { get; set; }
        /// <summary>
        /// mail
        /// </summary>
        public string mail { get; set; }

        /// <summary>
        /// jobTitle
        /// </summary>
        public string? jobTitle { get; set; }

        /// <summary>
        /// mailNickName
        /// </summary>
        public string? mailNickName { get; set; }
    }
}

