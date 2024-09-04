// <copyright file="TaxonomyDetailsWithIncentivePlanHierarchy.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    /// <summary>
    /// TaxonomyDetailsWithIIncentivePlanHierarchy Model
    /// </summary>
    public class TaxonomyDetailsWithIncentivePlanHierarchy
    {

        /// <summary>Gets or sets the taxonomyInfoDetails.</summary>
        [DataMember(Name = "taxonomyInfoDetails")]
        public List<TaxonomyInfoDetails?> TaxonomyInfoDetails { get; set; } = new List<TaxonomyInfoDetails?>();

    }

}
