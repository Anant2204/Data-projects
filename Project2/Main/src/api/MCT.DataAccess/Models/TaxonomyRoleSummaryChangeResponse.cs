// <copyright file="TaxonomyRoleSummaryChangeResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The request type to TaxonomyRoleSummaryChangeReponse
    /// </summary>
    [DataContract]
    public class TaxonomyRoleSummaryChangeResponse
    {
        /// <summary>Gets or sets the icDetails.</summary>
        [DataMember(Name = "taxonomyDetails")]
        public List<TaxonomyDetails> TaxonomyDetails { get; set; } = new List<TaxonomyDetails>();
    }
}
