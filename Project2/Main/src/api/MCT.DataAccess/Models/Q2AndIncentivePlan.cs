// <copyright file="Q2AndIncentivePlan.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    /// <summary>
    /// Q2AndIncentivePlan Model
    /// </summary>

    public class Q2AndIncentivePlan
    {
        /// <summary>
        /// Q2
        /// </summary>
        [DataMember(Name = "q2")]
        public string? Q2 { get; set; }

        /// <summary>
        /// incentivePlan
        /// </summary>
        [DataMember(Name = "incentivePlan")]
        public List<string?>? IncentivePlan { get; set; }
    }
}
