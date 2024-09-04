// <copyright file="ManagerListRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The request type to list managers.
    /// </summary>
    [DataContract]
    public class ManagerListRequest
    {
        /// <summary>
        /// Gets or sets the search pattern.
        /// </summary>
        [DataMember(Name = "searchPattern")]
        public string? SearchPattern { get; set; }

        /// <summary>
        /// Gets or sets pagination Details.
        /// </summary>
        [DataMember(Name = "pagination")]
        public Pagination? PaginationDetails { get; set; }

        /// <summary>
        /// Gets or sets the completeReportingHierarchy.
        /// </summary>
        [DataMember(Name = "completeReportingHierarchy")]
        public bool? CompleteReportingHierarchy { get; set; }
    }
}

