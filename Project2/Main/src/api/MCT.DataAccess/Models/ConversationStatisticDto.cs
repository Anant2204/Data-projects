// <copyright file="ConversationStatisticDto.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using MCT.DataAccess.Models;

    /// <summary>
    /// property to get and set manager alias
    /// </summary>
    public class ConversationStatisticDto
    {
        /// <summary>Gets or sets the send stay models.</summary>
        /// <value>The send stay models.</value>
        public List<ConversationModels>? ConversationModels { get; set; }
        /// <summary>Gets or sets the required completed.</summary>
        /// <value>The required completed.</value>
        public int requiredCompleted { get; set; }
        /// <summary>Gets or sets the required pending.</summary>
        /// <value>The required pending.</value>
        public int requiredPending { get; set; }
        /// <summary>Gets or sets the total completed.</summary>
        /// <value>The total completed.</value>
        public int totalCompleted { get; set; }
        /// <summary>Gets or sets the total employees.</summary>
        /// <value>The total employees.</value>
        public int totalEmployees { get; set; }
    }

}
