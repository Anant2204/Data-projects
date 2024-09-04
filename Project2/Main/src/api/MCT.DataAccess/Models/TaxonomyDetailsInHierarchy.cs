// <copyright file="TaxonomyDetailsInHierarchy.cs" company="Microsoft">
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
    /// TaxonomyDetailsInHierarchy Model
    /// </summary>
    public class TaxonomyDetailsInHierarchy
    {
        /// <summary>
		/// roleSummary
		/// </summary>
		[DataMember(Name = "roleSummary")]
        public string? RoleSummary { get; set; }

        /// <summary>
        /// qualifierInfoDetails
        /// </summary>
        [DataMember(Name = "qualifierInfoDetails")]
        public List<QualifierInfo> QualifierInfoDetails { get; set; }
    }
}
