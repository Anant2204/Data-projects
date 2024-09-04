// <copyright file="EntityTypeEnum.cs" company="Microsoft Corporation">
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
    /// The supported Entity Types.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum EntityTypeEnum
    {
        /// <summary>
        /// Enum OppoertunityEnum for Oppoertunity
        /// </summary>
        [EnumMember(Value = "Opportunity")]
        Opportunity = 0,

        /// <summary>
        /// Enum ConsumptionEstimateEnum for ConsumptionEstimate
        /// </summary>
        [EnumMember(Value = "ConsumptionEstimate")]
        ConsumptionEstimate = 1,

        /// <summary>
        /// Enum ScenarioEnum for Scenario
        /// </summary>
        [EnumMember(Value = "Scenario")]
        Scenario = 2,

        /// <summary>
        /// Scenario Template entity.
        /// </summary>
        [EnumMember(Value = "ScenarioTemplate")]
        ScenarioTemplate = 3,

        /// <summary>
        /// Scenario Template metadata entity.
        /// </summary>
        [EnumMember(Value = "TemplateMetadata")]
        TemplateMetadata = 4,

        /// <summary>
        /// Environment entity.
        /// </summary>
        [EnumMember(Value = "Environment")]
        Environment = 5,

        /// <summary>
        /// Environment Template entity.
        /// </summary>
        [EnumMember(Value = "EnvironmentTemplate")]
        EnvironmentTemplate = 6,

        /// <summary>
        /// Milestone entity.
        /// </summary>
        [EnumMember(Value = "Milestone")]
        Milestone = 7,

        /// <summary>
        /// Milestone entity from MSX.
        /// </summary>
        [EnumMember(Value = "MsxMilestone")]
        MsxMilestone = 8,

        /// <summary>
        /// Confidence level.
        /// </summary>
        [EnumMember(Value = "ConfidenceLevel")]
        ConfidenceLevel = 9,

        /// <summary>
        /// Estimate Version details.
        /// </summary>
        [EnumMember(Value = "EstimateVersionDetails")]
        EstimateVersionDetails = 10,

        /// <summary>
        /// Estimate Version.
        /// </summary>
        [EnumMember(Value = "EstimateVersion")]
        EstimateVersion = 11,
    }
}
