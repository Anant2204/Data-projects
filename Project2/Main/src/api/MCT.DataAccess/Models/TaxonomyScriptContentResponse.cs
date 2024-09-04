// <copyright file="TaxonomyScriptContentResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    ///  TaxonomyScriptContentResponse
    /// </summary>
    [DataContract]
    public class TaxonomyScriptContentResponse
    {
        /// <summary>
        ///   <para>
        /// Gets or sets the taxonomyScriptsContent.
        /// </para>
        /// </summary>
        /// <value>The taxonomyScriptsContent.</value>
        [DataMember(Name = "taxonomyScriptsContent")]
        public List<TaxonomyScriptContent?> TaxonomyScriptsContent { get; set; } = new List<TaxonomyScriptContent?>();


    }


}
