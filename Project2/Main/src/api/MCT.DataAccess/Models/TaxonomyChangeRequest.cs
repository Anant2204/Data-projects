// <copyright file="TaxonomyChangeRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    /// <summary>
    /// The request type to TaxonomyChangeRequest
    /// </summary>
    [DataContract]
    public class TaxonomyChangeRequest
    {
        /// <summary>
        /// Gets or sets the  ic alias.
        /// </summary>
        [DataMember(Name = "icAlias")]
        [Required]
        public string IcAlias { get; set; } = string.Empty;

        /// <summary>
        /// Role Summary
        /// </summary>
        [DataMember(Name = "roleSummary")]
        public string RoleSummary { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the qualifier1.
        /// </summary>
        [DataMember(Name = "q1")]
        [Required]
        public string Q1 { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the qualifier2.
        /// </summary>
        [DataMember(Name = "q2")]
        [Required]
        public string Q2 { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the Comments.
        /// </summary>
        [DataMember(Name = "comments")]
        public string Comments { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the request from.
        /// </summary>
        /// <value>
        /// The request from.
        /// </value>
        [DataMember(Name = "requestFrom")]
        [Required]
        public string RequestFrom { get; set; } = string.Empty;
    }
}
