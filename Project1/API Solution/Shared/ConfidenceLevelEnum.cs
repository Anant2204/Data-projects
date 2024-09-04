// <copyright file="ConfidenceLevelEnum.cs" company="Microsoft Corporation">
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
    public enum ConfidenceLevelEnum
    {
        /// <summary>
        /// Confidence Level - High.
        /// </summary>
        [EnumMember(Value = "High")]
        High = 0,

        /// <summary>
        /// Confidence Level - Medium.
        /// </summary>
        [EnumMember(Value = "Medium")]
        Medium = 1,

        /// <summary>
        /// Confidence Level - Low.
        /// </summary>
        [EnumMember(Value = "Low")]
        Low = 2,
    }
}
