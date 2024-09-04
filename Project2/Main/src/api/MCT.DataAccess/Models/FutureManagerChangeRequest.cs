// <copyright file="FutureManagerChangeRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    ///  Hr Data Tool Request
    /// </summary>
    public class FutureManagerChangeRequest
    {
        /// <summary>
        /// Gets or sets the r2 f y23 correct manager.
        /// </summary>
        /// <value>
        /// The Updated Manager.
        /// </value>
        [Required]
        public string UpdatedManager { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the r2 comments.
        /// </summary>
        /// <value>
        /// The r2 comments.
        /// </value>
        public string Comments { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the ic.
        /// </summary>
        /// <value>
        /// The ic.
        /// </value>
        [Required]
        public string empAlias { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the request from.
        /// </summary>
        /// <value>
        /// The request from.
        /// </value>
        [Required]
        public string RequestFrom { get; set; } = string.Empty;
    }
}
