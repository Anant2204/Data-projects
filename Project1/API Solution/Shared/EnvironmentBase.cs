// <copyright file="EnvironmentBase.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The Environment\Phase type.
    /// </summary>
    [DataContract]
    public abstract class EnvironmentBase
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
        /// Gets or sets the offset relative to Program Start Date.
        /// </summary>
        [DataMember(Name = "start")]
        public int? Start { get; set; }

        /// <summary>
        /// Gets or sets the start month .
        /// </summary>
        [DataMember(Name = "startMonth")]
        public DateTime? StartMonth { get; set; }

        /// <summary>
        /// Gets or Sets Duration.
        /// </summary>
        [DataMember(Name = "duration")]
        public int? Duration { get; set; }

        /// <summary>
        /// Gets or sets the end month .
        /// </summary>
        [DataMember(Name = "endMonth")]
        public DateTime? EndMonth { get; set; }

        /// <summary>
        /// Gets or Sets IsRecurring.
        /// </summary>
        [DataMember(Name = "isRecurring")]
        public bool? IsRecurring { get; set; }

        /// <summary>
        /// Gets or Sets MsxWorkloadCategory.
        /// </summary>
        [DataMember(Name = "msxWorkloadCategory")]
        public string? MsxWorkloadCategory { get; set; }

        /// <summary>
        /// Gets or Sets AssignmentScale.
        /// </summary>
        [DataMember(Name = "assignmentScale")]
        public AssignmentScaleEnum AssignmentScale { get; set; } = AssignmentScaleEnum.MonthEnum;
    }
}
