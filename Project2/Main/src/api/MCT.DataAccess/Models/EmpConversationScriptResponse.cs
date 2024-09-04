// <copyright file="EmpConversationScriptResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    ///  EmpConversationScriptResponse
    /// </summary>
    public class EmpConversationScriptResponse
    {
        /// <summary>Gets or sets the emp alias.</summary>
        /// <value>The emp alias.</value>
        [DataMember(Name = "empAlias")]
        public string? EmpAlias { get; set; }

        /// <summary>Gets or sets the name of the emp.</summary>
        /// <value>The name of the emp.</value>
        [DataMember(Name = "empName")]
        public string? EmpName { get; set; }

        /// <summary>Gets or sets the scriptTitle context.</summary>
        /// <value>The scriptTitle context.</value>
        [DataMember(Name = "scriptTitle")]
        public string? ScriptTitle { get; set; }

        /// <summary>Gets or sets the sectionDetails.</summary>
        /// <value>The sectionDetails.</value>
        [DataMember(Name = "sectionDetails")]
        public List<SectionDetails>? SectionDetails { get; set; }

        /// <summary>Gets or sets the cy taxonomy.</summary>
        /// <value>The cy taxonomy.</value>
        [DataMember(Name = "cyTaxonomy")]
        public TaxonomyDto? CYTaxonomy { get; set; }

        /// <summary>Gets or sets the fy taxonomy.</summary>
        /// <value>The fy taxonomy.</value>
        [DataMember(Name = "fyTaxonomy")]
        public TaxonomyDto? FYTaxonomy { get; set; }
    }

    /// <summary>
    ///   SectionDetails
    /// </summary>
    public class SectionDetails
    {
        /// <summary>Gets or sets the sectionName.</summary>
        /// <value>The sectionName.</value>
        [DataMember(Name = "sectionName")]
        public string? SectionName { get; set; }

        /// <summary>Gets or sets the content.</summary>
        /// <value>The content.</value>
        [DataMember(Name = "content")]
        public string? Content { get; set; }


        /// <summary>Gets or sets the displayValue.</summary>
        /// <value>The displayValue.</value>
        [DataMember(Name = "displayValue")]
        public string? DisplayValue { get; set; }
    }
}
