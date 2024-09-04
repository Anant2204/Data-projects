// <copyright file="ConversationStatisticsResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// Conversation statistics response model.
    /// </summary>
    public class ConversationStatisticsResponse
    {
        /// <summary>
        /// Total employees count.
        /// </summary>
        [DataMember(Name = "totalEmployees")]
        public int TotalEmployees { get; set; }

        /// <summary>
        /// Total Completed count.
        /// </summary>
        [DataMember(Name = "totalCompleted")]
        public int TotalCompleted { get; set; }

        /// <summary>
        /// Required Pending count.
        /// </summary>
        [DataMember(Name = "requiredPending")]
        public int RequiredPending { get; set; }

        /// <summary>
        /// Required Completed count.
        /// </summary>
        [DataMember(Name = "requiredCompleted")]
        public int RequiredCompleted { get; set; }

        /// <summary>
        /// Required conversations count.
        /// </summary>
        [DataMember(Name = "requiredConversations")]
        public int RequiredConversations { get; set; }

        /// <summary>
        /// Optional Pending count.
        /// </summary>
        [DataMember(Name = "optionalPending")]
        public int OptionalPending { get; set; }

        /// <summary>
        /// Optional completed count.
        /// </summary>
        [DataMember(Name = "optionalCompleted")]
        public int OptionalCompleted { get; set; }

        /// <summary>
        /// Optional conversations count.
        /// </summary>
        [DataMember(Name = "optionalConversations")]
        public int OptionalConversations { get; set; }
    }
}
