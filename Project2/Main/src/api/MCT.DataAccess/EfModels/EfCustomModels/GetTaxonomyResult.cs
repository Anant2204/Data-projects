// <copyright file="GetTaxonomyResult.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The GetTaxonomyResult response type.
    /// </summary>
    [DataContract]
    public class GetTaxonomyResult
    {
        /// <summary>Gets or sets the roleSummary .</summary>
        [DataMember(Name = "roleSummary")]

        public string? RoleSummary { get; set; }

        /// <summary>Gets or sets the q1.</summary>
        [DataMember(Name = "q1")]

        public string? Q1 { get; set; }

        /// <summary>Gets or sets the q2.</summary>
        [DataMember(Name = "q2")]
        public string? Q2 { get; set; } 
    }
}

