// <copyright file="TaxonomyScriptContentStatisticResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;
    
    /// <summary>
    ///  TaxonomyScriptContentResponse
    /// </summary>
    [DataContract]
    public class TaxonomyScriptContentStatisticResponse
    {
        /// <summary>
        /// Total change context scripts count
        /// </summary>
        [DataMember(Name = "totalChangeContextScript")]
        public int TotalChangeContextScript { get; set; }

        /// <summary>
        /// Total ready for review count.
        /// </summary>
        [DataMember(Name = "totalReadyForReview")]
        public int TotalReadyForReview { get; set; }

        /// <summary>
        /// Total approved count.
        /// </summary>
        [DataMember(Name = "totalApproved")]
        public int TotalApproved { get; set; }

       
    }
}
