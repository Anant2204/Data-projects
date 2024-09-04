// <copyright file="GetTaxonomyCorrectionRequestsResult.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.Runtime.Serialization;
    
    /// <summary>
    /// The Get Taxonomy correction result.
    /// </summary>
    [DataContract]
    public class GetTaxonomyCorrectionRequestsResult
    {
        /// <summary>
        /// Gets or sets the employee alias
        /// </summary>
        [DataMember(Name = "icAlias")]
        public string? IcAlias { get; set; }
        /// <summary>
        /// Gets or sets the employee Name
        /// </summary>
        [DataMember(Name = "employeeName")]
        public string? EmployeeName { get; set; }

        /// <summary>
        /// Gets or sets the request status
        /// </summary>
        [DataMember(Name = "requestStatus")]
        public string? RequestStatus { get; set; }

        /// <summary>
        /// Gets or sets the request by
        /// </summary>
        [DataMember(Name = "requestBy")]
        public string? RequestBy { get; set; }

        /// <summary>
        /// Gets or sets the requested by Ic alias
        /// </summary>
        [DataMember(Name = "requestByIcAlias")]
        public string? RequestByIcAlias { get; set; }

        /// <summary>
        /// Gets or sets the requested date
        /// </summary>
        [DataMember(Name = "requestDate")]
        public DateTime? RequestDate { get; set; }

        /// <summary>
        /// Gets or sets the current year manager.
        /// </summary>
        [DataMember(Name = "cyManagerAlias")]
        public string? CyManagerAlias { get; set; }

        /// <summary>
        /// Gets or sets the current year manager.
        /// </summary>
        [DataMember(Name = "currentYearManager")]
        public string? CurrentYearManager { get; set; }

        /// <summary>
        /// Gets or sets the reviewer 
        /// </summary>

        [DataMember(Name = "reviewer")]
        public string? Reviewer { get; set; }

        /// <summary>
        /// Gets or sets the cyOrg 
        /// </summary>
        [DataMember(Name = "cyOrg")]
        public string? CyOrg { get; set; }

        /// <summary>
        /// Gets or sets the fyOrg 
        /// </summary>
        [DataMember(Name = "fyOrg")]
        public string? FyOrg { get; set; }

        /// <summary>
        /// Gets or sets the proposedOrg 
        /// </summary>
        [DataMember(Name = "proposedOrg")]
        public string? ProposedOrg { get; set; }

        /// <summary>
        /// Gets or sets the cyRoleSummary 
        /// </summary>
        [DataMember(Name = "cyRoleSummary")]
        public string? CyRoleSummary { get; set; }

        /// <summary>
        /// Gets or sets the fyRoleSummary 
        /// </summary>
        [DataMember(Name = "fyRoleSummary")]
        public string? FyRoleSummary { get; set; }

        /// <summary>
        /// Gets or sets the proposedRoleSummary 
        /// </summary>
        [DataMember(Name = "proposedRoleSummary")]
        public string? ProposedRoleSummary { get; set; }

        /// <summary>
        /// Gets or sets the cyQ1 
        /// </summary>
        [DataMember(Name = "cyQ1")]
        public string? CyQ1 { get; set; }

        /// <summary>
        /// Gets or sets the fyQ1
        /// </summary>
        [DataMember(Name = "fyQ1")]
        public string? FyQ1 { get; set; }

        /// <summary>
        /// Gets or sets the proposedQ1
        /// </summary>
        [DataMember(Name = "proposedQ1")]
        public string? ProposedQ1 { get; set; }

        /// <summary>
        /// Gets or sets the cyQ2
        /// </summary>
        [DataMember(Name = "cyQ2")]
        public string? CyQ2 { get; set; }

        /// <summary>
        /// Gets or sets the fyQ2
        /// </summary>
        [DataMember(Name = "fyQ2")]
        public string? FyQ2 { get; set; }

        /// <summary>
        /// Gets or sets the proposedQ2
        /// </summary>
        [DataMember(Name = "proposedQ2")]
        public string? ProposedQ2 { get; set; }

        /// <summary>
        /// Gets or sets the cyCareerStage
        /// </summary>
        [DataMember(Name = "cyCareerStage")]
        public string? CyCareerStage { get; set; }

        /// <summary>
        /// Gets or sets the fyCareerStage
        /// </summary>
        [DataMember(Name = "fyCareerStage")]
        public string? FyCareerStage { get; set; }

        /// <summary>
        /// Gets or sets the ProposedCareerStage
        /// </summary>
        [DataMember(Name = "ProposedCareerStage")]
        public string? ProposedCareerStage { get; set; }

        /// <summary>
        /// Gets or sets the cyCostCenter
        /// </summary>
        [DataMember(Name = "cyCostCenter")]
        public string? CyCostCenter { get; set; }

        /// <summary>
        /// Gets or sets the fyCostCenter
        /// </summary>
        [DataMember(Name = "fyCostCenter")]
        public string? FyCostCenter { get; set; }

        /// <summary>
        /// Gets or sets the ProposedCostCenter
        /// </summary>
        [DataMember(Name = "proposedCostCenter")]
        public string? ProposedCostCenter { get; set; }


        /// <summary>
        /// Gets or sets the fyIncentivePlan
        /// </summary>
        [DataMember(Name = "fyIncentivePlan")]
        public string? FyIncentivePlan { get; set; }

        /// <summary>
        /// Gets or sets the cyIncentivePlan
        /// </summary>
        [DataMember(Name = "cyIncentivePlan")]
        public string? CyIncentivePlan { get; set; }

        /// <summary>
        /// Gets or sets the proposedIncentivePlan
        /// </summary>
        [DataMember(Name = "proposedIncentivePlan")]
        public string? ProposedIncentivePlan { get; set; }

        /// <summary>
        /// Gets or sets the manager comments
        /// </summary>
        [DataMember(Name = "comments")]
        public string? Comments { get; set; }
    }
}
