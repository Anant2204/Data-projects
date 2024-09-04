// <copyright file="StatusEnum.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// The estimate status.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum StatusEnum
    {
        /// <summary>
        /// Status New.
        /// </summary>
        [EnumMember(Value = "New")]
        New = 0,

        /// <summary>
        /// Status Active
        /// </summary>
        [EnumMember(Value = "Active")]
        Active = 1,

        /// <summary>
        /// Status Published
        /// </summary>
        [EnumMember(Value = "Published")]
        Published = 2,
    }
}
