// <copyright file="GetTaxonomyWithIncentiveResult.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The GetTaxonomyWithIncentiveResult response type.
    /// </summary>
    [DataContract]
    public class GetTaxonomyWithIncentiveResult : GetTaxonomyResult
    {
      
        /// <summary>Gets or sets the incentivePlan.</summary>
        [DataMember(Name = "incentivePlan")]
        public string? IncentivePlan { get; set; } 
    }
}

