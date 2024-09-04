// <copyright file="EstimateTypeEnum.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    /// <summary>
    /// The estimate status.
    /// </summary>
    [JsonConverter(typeof(StringEnumConverter))]
    public enum EstimateTypeEnum
    {
        /// <summary>
        /// Reader role.
        /// </summary>
        [EnumMember(Value = "V2")]
        V2 = 0,

        /// <summary>
        /// Contributor role.
        /// </summary>
        [EnumMember(Value = "Legacy")]
        Legacy = 1,
    }
}
