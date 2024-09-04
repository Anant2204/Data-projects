// <copyright file="ConversationCompletionRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    /// <summary>
    /// Conversation complete request.
    /// </summary>
    public class ConversationCompletionRequest
    {
        /// <summary>
        /// Gets or sets the  current year manager alias.
        /// </summary>
        [DataMember(Name = "cymanagerAlias")]
        [Required]
        [RegularExpression("^[A-Za-z]+$")]

        public string CYManagerAlias { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the future year manager alias.
        /// </summary>
        [DataMember(Name = "fymanagerAlias")]
        [Required]
        [RegularExpression("^[A-Za-z]+$")]
        public string FYManagerAlias { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the alias.
        /// </summary>
        [DataMember(Name = "employeeAlias")]
        [Required]
        public string EmployeeAlias { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets a value indicating whether the script was followed.
        /// </summary>
        [DataMember(Name = "scriptFollowed")]
        [Required]
        public bool ScriptFollowed { get; set; }
    }
}