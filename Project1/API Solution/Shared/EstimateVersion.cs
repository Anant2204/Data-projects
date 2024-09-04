// <copyright file="EstimateVersion.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The estimate version information.
    /// </summary>
    [DataContract]
    public class EstimateVersion
    {
        /// <summary>
        /// Gets or sets the id of the version entity.
        /// </summary>
        [DataMember(Name = "id")]
        public string? Id { get; set; }

        /// <summary>
        /// Gets or sets the user friendly name of the estimate version.
        /// </summary>
        [DataMember(Name = "versionName")]
        public string? VersionName { get; set; }

        /// <summary>
        /// Gets or sets the user who created the version.
        /// </summary>
        [DataMember(Name = "createdBy")]
        public string? CreatedBy { get; set; }

        /// <summary>
        /// Gets or sets the version creation date.
        /// </summary>
        [DataMember(Name = "createdDateTime")]
        public DateTime CreatedDateTime { get; set; }

        /// <summary>
        /// Gets or Sets ACR.
        /// </summary>
        [DataMember(Name = "programAzureRevenue")]
        public double ProgramAzureRevenue { get; set; } = 0;

        /// <summary>
        /// Gets or sets the program start date.
        /// </summary>
        [DataMember(Name = "programStartDate")]
        public ProgramDate? ProgramStartDate { get; set; }

        /// <summary>
        /// Gets or Sets the duration of the program.
        /// </summary>
        [DataMember(Name = "duration")]
        public int Duration { get; set; } = 0;
    }
}
