// <copyright file="ConfidenceLevelQuestion.cs" company="Microsoft Corporation">
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
    public class ConfidenceLevelQuestion
    {
        /// <summary>
        /// Gets or sets the Id.
        /// </summary>
        [DataMember(Name = "id")]
        public string? Id { get; set; }

        /// <summary>
        /// Gets or sets the Confidence Level Question.
        /// </summary>
        [DataMember(Name = "question")]
        public string? Question { get; set; }

        /// <summary>
        /// Gets or sets the Confidence Level for the specified question.
        /// </summary>
        [DataMember(Name = "confidenceLevel")]
        public string? ConfidenceLevel { get; set; }

        /// <summary>
        /// Gets or sets the overall confidence level score for the questions.
        /// </summary>
        [DataMember(Name = "score")]
        public double Score { get; set; } = 0.0;
    }
}
