// <copyright file="FYSummaryDto.cs" company="Microsoft">
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
    using System.Xml.Linq;

    /// <summary>
    /// FY summary DTO.
    /// </summary>
    [DataContract]
    public class FYSummaryDto
    {
        /// <summary>Gets or sets the full name of the employee.</summary>
        [DataMember(Name = "fullName")]
        public string? FullName { get; set; }

        /// <summary>Gets or sets the alias.</summary>
        [DataMember(Name = "alias")]
        public string? Alias { get; set; }

        /// <summary>Gets or sets the role summary.</summary>
        [DataMember(Name = "roleSummary")]
        public string? RoleSummary { get; set; }

        /// <summary>Gets or sets the q1.</summary>
        [DataMember(Name = "Q1")]
        public string? Q1 { get; set; }

        /// <summary>Gets or sets the q2.</summary>
        [DataMember(Name = "Q2")]
        public string? Q2 { get; set; }

        /// <summary>Gets or sets the q2.</summary>
        [DataMember(Name = "isMoving")]
        public bool IsMoving { get; set; }

        /// <summary>Gets or sets the hasTaxonomyChange.</summary>
        [DataMember(Name = "hasTaxonomyChange")]
        public bool HasTaxonomyChange { get; set; }
    }
}
