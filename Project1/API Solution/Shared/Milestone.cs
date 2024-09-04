// <copyright file="Milestone.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The ACR Milestone type.
    /// </summary>
    [DataContract]
    public partial class Milestone
    {
        /// <summary>
        /// Gets or Sets Id.
        /// </summary>
        [DataMember(Name = "id")]
        public string? Id { get; set; }

        /// <summary>
        /// Gets or Sets Name.
        /// </summary>
        [DataMember(Name = "name")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the associated environment id.
        /// </summary>
        [DataMember(Name = "environmentId")]
        public string? EnvironmentId { get; set; }

        /// <summary>
        /// Gets or sets the associated scenario id.
        /// </summary>
        [DataMember(Name = "scenarioId")]
        public string? ScenarioId { get; set; }

        /// <summary>
        /// Gets or sets the associated environment id.
        /// </summary>
        [DataMember(Name = "environmentName")]
        public string? EnvironmentName { get; set; }

        /// <summary>
        /// Gets or sets the associated scenario id.
        /// </summary>
        [DataMember(Name = "scenarioName")]
        public string? ScenarioName { get; set; }

        /// <summary>
        /// Gets or Sets the workload.
        /// </summary>
        /// <remarks>By default, msxWorkloadCategory from the associated environment.</remarks>
        [DataMember(Name = "workload")]
        public string? Workload { get; set; }

        /// <summary>
        /// Gets or Sets the Milestone Category. Refers to master data from MSX.
        /// </summary>
        [DataMember(Name = "milestoneCategory")]
        public string? MilestoneCategory { get; set; }

        /// <summary>
        /// Gets or Sets the Customer Commitment. Refers to master data from MSX.
        /// </summary>
        [DataMember(Name = "customerCommitment")]
        public string? CustomerCommitment { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the milestone is of recurring kind.
        /// </summary>
        [DataMember(Name = "isRecurring")]
        public bool IsRecurring { get; set; } = true;

        /// <summary>
        /// Gets or sets the milestone established date.
        /// </summary>
        /// <remarks> This will be environment start date in case of recurring. For non-recurring n number of entries will be created, one for each period.</remarks>
        [DataMember(Name = "milestoneDate")]
        public DateTime? MilestoneDate { get; set; }

        /// <summary>
        /// Gets or sets the associated change type.
        /// </summary>
        /// <remarks>Accepted values - User\ACR.</remarks>
        [DataMember(Name = "changeType")]
        public string? ChangeType { get; set; }

        /// <summary>
        /// Gets or sets the associated change value.
        /// </summary>
        [DataMember(Name = "changeValue")]
        public double? ChangeValue { get; set; }

        /// <summary>
        /// Gets or Sets the Milestone Type. Refers to master data from MSX.
        /// </summary>
        [DataMember(Name = "milestoneType")]
        public string? MilestoneType { get; set; }

        /// <summary>
        /// Gets or Sets the Preferred Region. This will be defaulted to environment location.
        /// </summary>
        [DataMember(Name = "preferredRegion")]
        public string? PreferredRegion { get; set; }

        /// <summary>
        /// Gets or Sets the milestone status. Refers to master data from MSX.
        /// </summary>
        [DataMember(Name = "status")]
        public string? Status { get; set; }

        /// <summary>
        /// Gets or Sets the milestone status reason.
        /// </summary>
        [DataMember(Name = "milestoneStatusReason")]
        public string? MilestoneStatusReason { get; set; }

        /// <summary>
        /// Gets or Sets the associated risk. Freetext and mandatory for certain status.
        /// </summary>
        [DataMember(Name = "risks")]
        public string? Risks { get; set; }

        /// <summary>
        /// Gets or Sets the milestone Capacity Type. Refers to master data from MSX.
        /// </summary>
        [DataMember(Name = "capacityType")]
        public string? CapacityType { get; set; }

        /// <summary>
        /// Gets or Sets the milestone help text. Refers to master data from MSX.
        /// </summary>
        [DataMember(Name = "helpNeeded")]
        public string? HelpNeeded { get; set; }

        /// <summary>
        /// Gets or Sets the milestone owner.
        /// </summary>
        [DataMember(Name = "owner")]
        public string? Owner { get; set; }

        /// <summary>
        /// Gets or sets the associated milestone id from MSX system.
        /// </summary>
        [DataMember(Name = "msxMilestoneId")]
        public string? MsxMilestoneId { get; set; }

        /// <summary>
        /// Gets the list of milestonae alerts for the associated line item.
        /// </summary>
        [DataMember(Name = "alerts")]
        public IList<string> Alerts { get; } = new List<string>();
    }
}
