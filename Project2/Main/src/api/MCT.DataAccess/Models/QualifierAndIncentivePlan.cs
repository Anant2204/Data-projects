// <copyright file="QualifierAndIncentivePlan.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    /// <summary>
    /// QualifierAndIncentivePlan 
    /// </summary> 
    public class QualifierAndIncentivePlan
    {
        /// <summary>
        /// Q1
        /// </summary>
        [DataMember(Name = "q1")]
        public string? Q1 { get; set; }

        /// <summary>
        /// q2AndIncentivePlan
        /// </summary>
        [DataMember(Name = "q2AndIncentivePlan")]
        public List<Q2AndIncentivePlan?>? q2AndIncentivePlan { get; set; }
    }
}
