// <copyright file="Strategy.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The Strategy type.
    /// </summary>
    [DataContract]
    public class Strategy : ICloneable
    {
        /// <summary>
        /// Gets or sets the Name.
        /// </summary>
        [DataMember(Name = "name")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the Id.
        /// </summary>
        [DataMember(Name = "id")]
        public string? Id { get; set; }

        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        [DataMember(Name = "type")]
        public string? Type { get; set; }

        /// <summary>
        /// Gets or sets the Total Units.
        /// </summary>
        [DataMember(Name = "totalUnits")]
        public int? TotalUnits { get; set; }

        /// <summary>
        /// Gets or sets the Acr Average Value.
        /// </summary>
        [DataMember(Name = "acrAverageValue")]
        public double? AcrAverageValue { get; set; }

        /// <summary>
        /// Gets or sets the Acr Override Reason.
        /// </summary>
        [DataMember(Name = "acrOverrideReason")]
        public string? AcrOverrideReason { get; set; }

        /// <summary>
        /// Gets or sets the Workload Category.
        /// </summary>
        [DataMember(Name = "workloadCategory")]
        public string? WorkloadCategory { get; set; }

        /// <summary>
        /// Gets or sets the Complexity.
        /// </summary>
        [DataMember(Name = "complexity")]
        public List<Complexity>? Complexity { get; set; } = new List<Complexity>();

        /// <summary>
        /// Gets or sets the Status.
        /// </summary>
        [DataMember(Name = "status")]
        public StrategyStatusTypeEnum? Status { get; set; }

        /// <summary>
        /// Gets or sets the Order.
        /// </summary>
        [DataMember(Name = "order")]
        public int? Order { get; set; }

        /// <summary>
        /// Gets or sets the Help Text.
        /// </summary>
        [DataMember(Name = "helpText")]
        public string? HelpText { get; set; }

        /// <summary>
        /// Gets or sets the Ramp Plan.
        /// </summary>
        [DataMember(Name = "rampPlan")]
        public List<RampPlan>? RampPlan { get; set; } = new List<RampPlan>();

        /// <summary>
        /// Gets or sets the Acr Allocation.
        /// </summary>
        [DataMember(Name = "acrAllocation")]
        public AcrAllocation AcrAllocation { get; set; } = new AcrAllocation();

        /// <inheritdoc/>
        public object Clone()
        {
            return new Strategy
            {
                Id = this.Id,
                Name = this.Name,
                Status = this.Status,
                Order = this.Order,
                HelpText = this.HelpText,
                RampPlan = this.RampPlan,
                Complexity = this.Complexity,
                AcrOverrideReason = this.AcrOverrideReason,
                Type = this.Type,
                TotalUnits = this.TotalUnits,
                WorkloadCategory = this.WorkloadCategory,
                AcrAverageValue = this.AcrAverageValue,
                AcrAllocation = new AcrAllocation(),
            };
        }

        /// <summary>
        /// Identifies whether the given object is duplicate or not.
        /// </summary>
        /// <param name="cloneStrategy">duplicate object.</param>
        /// <returns>returns true if the object is duplicated.</returns>
        internal bool IsDuplicate(Strategy cloneStrategy)
        {
            if (cloneStrategy == null)
            {
                return false;
            }

            if (!this.AcrAllocation.IsDuplicate(cloneStrategy.AcrAllocation))
            {
                return false;
            }

            if (this.Name != cloneStrategy.Name)
            {
                return false;
            }

            if (this.Order != cloneStrategy.Order)
            {
                return false;
            }

            return true;
        }
    }
}
