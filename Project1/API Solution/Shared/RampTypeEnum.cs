// <copyright file="RampTypeEnum.cs" company="Microsoft Corporation">
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
    /// The ramp type enum.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum RampTypeEnum
    {
        /// <summary>
        /// the start.
        /// </summary>
        [EnumMember(Value = "start")]
        Start = 0,

        /// <summary>
        /// the ramp.
        /// </summary>
        [EnumMember(Value = "ramp")]
        Ramp = 1,

        /// <summary>
        /// the steady state.
        /// </summary>
        [EnumMember(Value = "steadyState")]
        SteadyState = 2,

        /// <summary>
        /// close.
        /// </summary>
        [EnumMember(Value = "close")]
        Close = 3,

        /// <summary>
        /// end.
        /// </summary>
        [EnumMember(Value = "end")]
        End = 4,
    }
}
