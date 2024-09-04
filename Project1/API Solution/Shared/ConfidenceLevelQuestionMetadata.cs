// <copyright file="ConfidenceLevelQuestionMetadata.cs" company="Microsoft Corporation">
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
    public class ConfidenceLevelQuestionMetadata
    {
        /// <summary>
        /// Gets or sets the Id.
        /// </summary>
        [DataMember(Name = "questionId")]
        public string? QuestionId { get; set; }

        /// <summary>
        /// Gets or sets the relative weight for the question.
        /// </summary>
        [DataMember(Name = "weight")]
        public double Weight { get; set; } = 0.0;

        /// <summary>
        /// Gets or sets the weight associated with the confidence level score.
        /// </summary>
        [DataMember(Name = "scoreWeight")]
        public Dictionary<string, double> ScoreWeight { get; set; } = new Dictionary<string, double>();
    }
}
