// <copyright file="TaxonomyDetailsInHierarchyResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace MCT.DataAccess.Models
{
    /// <summary>
    /// TaxonomyDetails .
    /// </summary>
    public class TaxonomyDetailsInHierarchyResponse
    {

        /// <summary>
        /// taxonomyDeatils
        /// </summary>
        [DataMember(Name = "taxonomyDetails")]
        public List<TaxonomyDetailsInHierarchy> TaxonomyDetails { get; set; } = new List<TaxonomyDetailsInHierarchy>();

    }
}
