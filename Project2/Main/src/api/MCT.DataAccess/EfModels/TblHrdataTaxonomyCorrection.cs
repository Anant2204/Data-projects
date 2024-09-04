// <copyright file="TblHrdataTaxonomyCorrection.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class TblHrdataTaxonomyCorrection
    {
        public int Id { get; set; }
        public string? IcAlias { get; set; }
        public string? IcName { get; set; }
        public string? CyManagerAlias { get; set; }
        public string? FyManagerAlias { get; set; }
        public string? CyOrg { get; set; }
        public string? FyOrg { get; set; }
        public string? ProposedOrg { get; set; }
        public string? CyRoleSummary { get; set; }
        public string? FyRoleSummary { get; set; }
        public string? ProposedRoleSummary { get; set; }
        public string? CyQ1 { get; set; }
        public string? FyQ1 { get; set; }
        public string? ProposedQ1 { get; set; }
        public string? CyQ2 { get; set; }
        public string? FyQ2 { get; set; }
        public string? ProposedQ2 { get; set; }
        public string? CyCareerStage { get; set; }
        public string? FyCareerStage { get; set; }
        public string? ProposedCareerStage { get; set; }
        public string? CyCostCenter { get; set; }
        public string? FyCostCenter { get; set; }
        public string? ProposedCostCenter { get; set; }
        public string? MarkedInReviewByAlias { get; set; }
        public string? MarkedInReviewByName { get; set; }
        public DateTime? MarkedInReviewDate { get; set; }
        public string? Status { get; set; }
        public string? Comments { get; set; }
        public string? ApproverComments { get; set; }
        public string? ApprovedRejectedBy { get; set; }
        public string? ApprovedRejectedDate { get; set; }
        public bool? InReviewEmailSent { get; set; }
        public bool? SubmittedMailSent { get; set; }
        public bool? ApprovedOrRejectedEmailSent { get; set; }
        public bool? IsActive { get; set; }
        public string? CreatedByUserFullName { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string? CyIncentivePlan { get; set; }
        public string? FyIncentivePlan { get; set; }
        public string? ProposedIncentivePlan { get; set; }
    }
}
