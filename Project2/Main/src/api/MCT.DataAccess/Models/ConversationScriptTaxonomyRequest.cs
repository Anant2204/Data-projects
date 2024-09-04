// <copyright file="ConversationScriptTaxonomyRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The request type to conversation ScriptTaxonomy.
    /// </summary>
    [DataContract]
    public class ConversationScriptTaxonomyRequest
    {
        /// <summary>
        /// Gets or sets the list of empAlias .
        /// </summary>
        [DataMember(Name = "empAlias")]
        public string EmpAlias { get; set; } = string.Empty;
    }
}


