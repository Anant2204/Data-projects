// <copyright file="ComplexityTypesEnum.cs" company="Microsoft Corporation">
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
    /// The complexity types enums.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum ComplexityTypesEnum
    {
        /// <summary>
        /// Enum OppoertunityEnum for Oppoertunity
        /// </summary>
        [EnumMember(Value = "Simple")]
        Simple = 0,

        /// <summary>
        /// Enum ConsumptionEstimateEnum for ConsumptionEstimate
        /// </summary>
        [EnumMember(Value = "Medium")]
        Medium = 1,

        /// <summary>
        /// Enum ScenarioEnum for Scenario
        /// </summary>
        [EnumMember(Value = "Complex")]
        Complex = 2,
    }
}
