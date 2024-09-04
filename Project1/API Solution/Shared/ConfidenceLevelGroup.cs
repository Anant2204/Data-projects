// <copyright file="ConfidenceLevelGroup.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The Confidence Level Group type.
    /// </summary>
    [DataContract]
    public class ConfidenceLevelGroup
    {
        /// <summary>
        /// Gets or sets the Id.
        /// </summary>
        [DataMember(Name = "id")]
        public string? Id { get; set; }

        /// <summary>
        /// Gets or sets the Confidence Level Group name.
        /// </summary>
        [DataMember(Name = "criteriaGroup")]
        public string? CriteriaGroup { get; set; }

        /// <summary>
        /// Gets or sets the overall confidence level score for the group.
        /// </summary>
        [DataMember(Name = "score")]
        public double Score { get; set; } = 0.0;

        /// <summary>
        /// Gets or sets the Confidence Level for the specified group.
        /// </summary>
        [DataMember(Name = "confidenceLevel")]
        public string? ConfidenceLevel { get; set; }

        /// <summary>
        /// Gets or sets the list of Confidence Level Questions for the group.
        /// </summary>
        [DataMember(Name = "criteriaGroupQuestions")]
        public List<ConfidenceLevelQuestion> CriteriaGroupQuestions { get; set; } = new List<ConfidenceLevelQuestion>();
    }
}
