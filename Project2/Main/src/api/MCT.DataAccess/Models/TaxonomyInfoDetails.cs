// <copyright file="TaxonomyInfoDetails.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// TaxonomyInfoDetails .
    /// </summary>
    public class TaxonomyInfoDetails
    {
        /// <summary>
        /// roleSummary
        /// </summary>
        [DataMember(Name = "roleSummary")]
        public string? RoleSummary { get; set; }

        /// <summary>
        /// qualifierAndIncentivePlan
        /// </summary>
        [DataMember(Name = "qualifierAndIncentivePlan")]
        public List<QualifierAndIncentivePlan?>? QualifierAndIncentivePlan { get; set; }
    }
}

