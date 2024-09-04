// <copyright file="TaxonomyRoleSummaryChangeRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>


namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The request type to TaxonomyRoleSummaryChangeRequest
    /// </summary>
    [DataContract]
    public class TaxonomyRoleSummaryChangeRequest
    {
        /// <summary>
        /// Org
        /// </summary>
        [DataMember(Name = "org")]
        public string Org { get; set; } = string.Empty;

        /// <summary>
        /// Org
        /// </summary>
        [DataMember(Name = "careerStage")]
        public string CareerStage { get; set; } = string.Empty;
    }
}
