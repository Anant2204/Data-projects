// <copyright file="EntityLookupEnum.cs" company="Microsoft Corporation">
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
    /// The Msx Entity Types.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum EntityLookupEnum
    {
        /// <summary>
        /// Status New.
        /// </summary>
        [EnumMember(Value = "All")]
        All = 0,

        /// <summary>
        /// Milestone Change Type
        /// </summary>
        [EnumMember(Value = "MilestoneChangeType")]
        MilestoneChangeType = 1,

        /// <summary>
        /// Milestone Type
        /// </summary>
        [EnumMember(Value = "MilestoneType")]
        MilestoneType = 2,

        /// <summary>
        /// Solution Area
        /// </summary>
        [EnumMember(Value = "SolutionCategory")]
        SolutionCategory = 3,

        /// <summary>
        /// Confidence Level Type
        /// </summary>
        [EnumMember(Value = "ConfidenceLevelType")]
        ConfidenceLevelType = 4,
    }
}
