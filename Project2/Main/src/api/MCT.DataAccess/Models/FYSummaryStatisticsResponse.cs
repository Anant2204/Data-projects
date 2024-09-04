// <copyright file="FYSummaryStatisticsResponse.cs" company="Microsoft">
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
    /// FY summary statistics response model.
    /// </summary>
    public class FYSummaryStatisticsResponse
    {
        /// <summary>
        /// Total employees count.
        /// </summary>
        [DataMember(Name = "cyTeam")]
        public int CYTeam { get; set; }

        /// <summary>
        /// Total Completed count.
        /// </summary>
        [DataMember(Name = "fyTeam")]
        public int FYTeam { get; set; }

        /// <summary>
        /// Required Pending count.
        /// </summary>
        [DataMember(Name = "joining")]
        public int Joining { get; set; }

        /// <summary>
        /// Required Completed count.
        /// </summary>
        [DataMember(Name = "leaving")]
        public int Leaving { get; set; }
        
        /// <summary>
        /// fyTaxonomyChange.
        /// </summary>
        [DataMember(Name = "fyTaxonomyChange")]
        public int FyTaxonomyChange { get; set; }
    }
}
