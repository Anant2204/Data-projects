// <copyright file="RampPlan.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The RampPlan.
    /// </summary>
    [DataContract]
    public class RampPlan
    {
        /// <summary>
        /// Gets or sets the Order.
        /// </summary>
        [DataMember(Name = "order")]
        public int? Order { get; set; }

        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        [DataMember(Name = "type")]
        public RampTypeEnum? Type { get; set; }

        /// <summary>
        /// Gets or sets the Name.
        /// </summary>
        [DataMember(Name = "name")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the Start Month.
        /// </summary>
        [DataMember(Name = "startMonth")]
        public int? StartMonth { get; set; }

        /// <summary>
        /// Gets or sets the No Of Months.
        /// </summary>
        [DataMember(Name = "noOfMonths")]
        public int? NoOfMonths { get; set; }

        /// <summary>
        /// Gets or sets the velocity.
        /// </summary>
        [DataMember(Name = "velocity")]
        public int? Velocity { get; set; }

        /// <summary>
        /// Gets or sets the Acr Allocation.
        /// </summary>
        [DataMember(Name = "acrAllocation")]
        public double? AcrAllocation { get; set; }
    }
}
