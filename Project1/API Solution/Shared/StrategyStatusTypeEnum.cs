// <copyright file="StrategyStatusTypeEnum.cs" company="Microsoft Corporation">
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
    /// CtsStrategy Status Type Enum.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum StrategyStatusTypeEnum
    {
        /// <summary>
        /// Not is use state.
        /// </summary>
        [EnumMember(Value = "notinuse")]
        NotInUse = 0,

        /// <summary>
        /// Active State.
        /// </summary>
        [EnumMember(Value = "active")]
        Active = 1,

        /// <summary>
        /// InActive state.
        /// </summary>
        [EnumMember(Value = "inActive")]
        InActive = 2,
    }
}
