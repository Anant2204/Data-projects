// <copyright file="GetTaxonomyScriptContentResult.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The Get Taxonomy Script ContentResult.
    /// </summary>
    [DataContract]
    public class GetTaxonomyScriptContentResult
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The identifier.</value>
        [DataMember(Name = "id")]
        public int Id { get; set; }

        /// <summary>Gets or sets the  scriptContent.</summary>
        /// <value>The scriptContent.</value>
        [DataMember(Name = "scriptContent")]
        public string? ScriptContent { get; set; }

        /// <summary>Gets or sets the script title.</summary>
        /// <value>The script title.</value>
        [DataMember(Name = "scriptTitle")]
        public string? ScriptTitle { get; set; }

        /// <summary>Gets or sets the fy org.</summary>
        [DataMember(Name = "fyOrg")]
        public string? FyOrg { get; set; }

        /// <summary>Gets or sets the fy role summary.</summary>
        [DataMember(Name = "fyRoleSummary")]
        public string? FyRoleSummary { get; set; }

        /// <summary>Gets or sets the fy q1.</summary>
        [DataMember(Name = "fyQ1")]
        public string? FyQ1 { get; set; }

        /// <summary>Gets or sets the fy q2.</summary>
        [DataMember(Name = "fyQ2")]
        public string? FyQ2 { get; set; }

        /// <summary>Gets or sets the cy org.</summary>
        [DataMember(Name = "cyOrg")]
        public string? CyOrg { get; set; }

        /// <summary>Gets or sets the cy role summary.</summary>
        [DataMember(Name = "cyRoleSummary")]
        public string? CyRoleSummary { get; set; }

        /// <summary>Gets or sets the cy q1.</summary>
        [DataMember(Name = "cyQ1")]
        public string? CyQ1 { get; set; }

        /// <summary>Gets or sets the cy q2.</summary>
        [DataMember(Name = "cyQ2")]
        public string? CyQ2 { get; set; }

        /// <summary>Gets or sets the cy IncentivePlan.</summary>
        [DataMember(Name = "cyIncentivePlan")]
        public string? CyIncentivePlan { get; set; }

        /// <summary>Gets or sets the fy IncentivePlan.</summary>
        [DataMember(Name = "fyIncentivePlan")]
        public string? FyIncentivePlan { get; set; }

        /// <summary>Gets or sets the status.</summary>
        /// <value>The status .</value>
        [DataMember(Name = "status")]
        public string? Status { get; set; }

        /// <summary>Gets or sets the modified by.</summary>
        /// <value>The modified by.</value>
        [DataMember(Name = "modifiedBy")]
        public string? ModifiedBy { get; set; } = string.Empty;

        /// <summary>Gets or sets the created date.</summary>
        /// <value>The created date.</value>
        [DataMember(Name = "createdDate")]
        public DateTime? CreatedDate { get; set; }

        /// <summary>Gets or sets the modified date.</summary>
        /// <value>The modified date.</value>
        [DataMember(Name = "modifiedDate")]
        public DateTime? ModifiedDate { get; set; }

        /// <summary>Gets or sets the created by.</summary>
        /// <value>The created by.</value>
        [DataMember(Name = "createdBy")]
        public string? CreatedBy { get; set; }

        /// <summary>Gets or sets the exclusions.</summary>
        /// <value>The exclusions.</value>
        [DataMember(Name = "exclusions")]
        public string? Exclusions { get; set; }

        /// <summary>Gets or sets the scriptAppliedEmplotyeesCount.</summary>
        /// <value>The scriptAppliedEmplotyeesCount.</value>
        [DataMember(Name = "scriptAppliedEmployeesCount")]
        public int ScriptAppliedEmployeesCount { get; set; }
    }
}
