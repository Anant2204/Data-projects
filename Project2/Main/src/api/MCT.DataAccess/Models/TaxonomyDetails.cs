// <copyright file="ManagerListResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// TaxonomyDetails .
    /// </summary>
    public class TaxonomyDetails
    {
        /// <summary>
        /// RoleSummary
        /// </summary>
        [DataMember(Name = "roleSummary")]
        public string? RoleSummary { get; set; }

        /// <summary>
        /// Q1
        /// </summary>
        [DataMember(Name = "q1")]
        public List<string?>? Q1 { get; set; }

        /// <summary>
        /// Q2
        /// </summary>
        [DataMember(Name = "q2")]
        public List<string?>? Q2 { get; set; }
    }
}

