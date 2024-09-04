// <copyright file="TaxonomyScriptContentUpsertRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    ///  TaxonomyScriptContentUpsertRequest
    /// </summary>
    [DataContract]
    public class TaxonomyScriptContentUpsertRequest
    {
        /// <summary>Gets or sets the tcc. </summary>
        /// <value>The id .</value>
        [DataMember(Name = "id")]
        public int Id { get; set; }

        /// <summary>Gets or sets the scriptContent.</summary>
        /// <value>The scriptContent.</value>
        [DataMember(Name = "scriptContent")]
        public string ScriptContent { get; set; } = string.Empty;

        /// <summary>Gets or sets the fy org.</summary>
        [DataMember(Name = "fyOrg")]
        public string FyOrg { get; set; } = string.Empty ;

        /// <summary>Gets or sets the fy role summary.</summary>
        [DataMember(Name = "fyRoleSummary")]
        public string FyRoleSummary { get; set; } = string.Empty;

        /// <summary>Gets or sets the fy q1.</summary>
        [DataMember(Name = "fyQ1")]
        public string FyQ1 { get; set; } = string.Empty;

        /// <summary>Gets or sets the fy q2.</summary>
        [DataMember(Name = "fyQ2")]
        public string FyQ2 { get; set; } = string.Empty;

        /// <summary>Gets or sets the cy org.</summary>
        [DataMember(Name = "cyOrg")]
        public string CyOrg { get; set; } = string.Empty;

        /// <summary>Gets or sets the cy role summary.</summary>
        [DataMember(Name = "cyRoleSummary")]
        public string CyRoleSummary { get; set; } = string.Empty;

        /// <summary>Gets or sets the cy q1.</summary>
        [DataMember(Name = "cyQ1")]
        public string CyQ1 { get; set; } =string.Empty;

        /// <summary>Gets or sets the cy q2.</summary>
        [DataMember(Name = "cyQ2")]
        public string CyQ2 { get; set; } = string.Empty;

        /// <summary>Gets or sets the cy IncentivePlan.</summary>
        [DataMember(Name = "cyIncentivePlan")]
        public string CyIncentivePlan { get; set; } = string.Empty;

        /// <summary>Gets or sets the fy IncentivePlan.</summary>
        [DataMember(Name = "fyIncentivePlan")]
        public string FyIncentivePlan { get; set; } = string.Empty;

        /// <summary>Gets or sets the title.</summary>
        [DataMember(Name = "title")]
        public string Title { get; set; } = string.Empty;

        /// <summary>Gets or sets the Exclusion.</summary>
        [DataMember(Name = "exclusion")]
        public List<string> Exclusion { get; set; } = new List<string>();

       }
    }
