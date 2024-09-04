// <copyright file="ConversationListRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// Conversation list request class.
    /// </summary>
    public class ConversationListRequest
    {
        /// <summary>
        /// Gets or sets the list of manager aliases.
        /// </summary>
        [DataMember(Name = "managerAliases")]
        public List<string> ManagerAliases { get; set; } = new List<string>();

        /// <summary>
        /// Gets or sets pagination Details.
        /// </summary>
        [DataMember(Name = "pagination")]
        public Pagination? PaginationDetails { get; set; }

        /// <summary>
        /// Gets or sets the filter option.
        /// </summary>
        [DataMember(Name = "filterOption")]
        public ConversationFilter? FilterOption { get; set; }

        /// <summary>
        /// Gets or sets the completeReportingHierarchy.
        /// </summary>
        [DataMember(Name = "completeReportingHierarchy")]
        public bool CompleteReportingHierarchy { get; set; }
    }
}
