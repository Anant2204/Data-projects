// <copyright file="MsxEntityEnum.cs" company="Microsoft Corporation">
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
    public enum MsxEntityEnum
    {
        /// <summary>
        /// Status New.
        /// </summary>
        [EnumMember(Value = "All")]
        All = 0,

        /// <summary>
        /// Workload Category
        /// </summary>
        [EnumMember(Value = "WorkloadCategory")]
        WorkloadCategory = 1,

        /// <summary>
        /// Milestone Category
        /// </summary>
        [EnumMember(Value = "MilestoneCategory")]
        MilestoneCategory = 2,

        /// <summary>
        /// Cusotmer Commitment
        /// </summary>
        [EnumMember(Value = "CusotmerCommitment")]
        CusotmerCommitment = 3,

        /// <summary>
        /// Msx Status
        /// </summary>
        [EnumMember(Value = "MsxStatus")]
        MsxStatus = 4,

        /// <summary>
        /// Milestone Status Reason
        /// </summary>
        [EnumMember(Value = "MilestoneStatusReason")]
        MilestoneStatusReason = 5,

        /// <summary>
        /// Capacity Type
        /// </summary>
        [EnumMember(Value = "CapacityType")]
        CapacityType = 6,

        /// <summary>
        /// Help Needed Type
        /// </summary>
        [EnumMember(Value = "HelpNeeded")]
        HelpNeeded = 7,
    }
}
