// <copyright file="ConversationStatisticsRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The request type to list conversation statistics.
    /// </summary>
    [DataContract]
    public class ConversationStatisticsRequest
    {
        /// <summary>
        /// Gets or sets the list of manager aliases.
        /// </summary>
        [DataMember(Name = "managerAliases")]
        public List<string> ManagerAliases { get; set; } = new List<string>();

             /// <summary>
        /// Gets or sets the completeReportingHierarchy.
        /// </summary>
        [DataMember(Name = "completeReportingHierarchy")]
        public bool CompleteReportingHierarchy { get; set; }
    }
}


