// <copyright file="UpdateFYManagerCorrectionStatusRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    /// <summary>
    /// UpdateStatus Of Manager Correction Request.
    /// </summary>
    public class UpdateFYManagerCorrectionStatusRequest
    {
        /// <summary>
        /// Gets or sets the  ic alias.
        /// </summary>
        [DataMember(Name = "icAlias")]
        [Required]
        public List<string> IcAlias { get; set; } = new List<string>();

        /// <summary>
        /// Gets or sets the  Id List.
        /// </summary>
        [DataMember(Name = "IdList")]
        [Required]
        public List<int> IdList { get; set; } = new List<int>();

        /// <summary>
        /// Gets or sets the isApproveOrReject.
        /// </summary>
        [DataMember(Name = "isApproveOrReject")]
        [Required]

        public bool IsApproveOrReject { get; set; }

        /// <summary>
        /// Gets or sets the Comments.
        /// </summary>
        [DataMember(Name = "comments")]
        [Required]
        public string Comments { get; set; } = string.Empty;

    }
}