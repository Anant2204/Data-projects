// <copyright file="TblSellerDetail.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class TblSellerDetail
    {
        public string? Alias { get; set; }
        public string? FullName { get; set; }
        public int? PositionNumber { get; set; }
        public int? PersonnelNumber { get; set; }
        public string? Country { get; set; }
        public string? FyManagerAlias { get; set; }
        public string? FyManagerFullName { get; set; }
        public string? FyOrg { get; set; }
        public string? FyRs { get; set; }
        public string? FyQ1 { get; set; }
        public string? FyQ2 { get; set; }
        public string? CyManagerAlias { get; set; }
        public string? CyManagerFullName { get; set; }
        public string? CyOrg { get; set; }
        public string? CyRoleSummary { get; set; }
        public string? CyQ1 { get; set; }
        public string? CyQ2 { get; set; }
        public string? ReviewStatus { get; set; }
        public DateTime? EdmFyenddate { get; set; }
        public DateTime? EdmFystartdate { get; set; }
        public Guid? EdmPlansellerid { get; set; }
        public bool? IspIsbubbled { get; set; }
        public bool? IspIstouched { get; set; }
        public int? IspreviewReason { get; set; }
        public bool? IspReviewed { get; set; }
        public Guid? IspLevel1 { get; set; }
        public Guid? IspLevel2 { get; set; }
        public Guid? IspLevel3 { get; set; }
        public string? ReportsToLevel1Email { get; set; }
        public string? ReportsToLevel1FullName { get; set; }
        public string? ReportsToLevel2Email { get; set; }
        public string? ReportsToLevel2FullName { get; set; }
        public string? ReportsToLevel3Email { get; set; }
        public string? ReportsToLevel3FullName { get; set; }
        public string? ReportsToLevel4Email { get; set; }
        public string? ReportsToLevel4FullName { get; set; }
        public string? ReportsToLevel5Email { get; set; }
        public string? ReportsToLevel5FullName { get; set; }
        public string? ReportsToLevel6Email { get; set; }
        public string? ReportsToLevel6FullName { get; set; }
        public string? ReportsToLevel7Email { get; set; }
        public string? ReportsToLevel7FullName { get; set; }
        public DateTime? IsplastModifiedDate { get; set; }
        public int? Statecode { get; set; }
        public string? FyIncentivePlan { get; set; }
        public string? FyCostCenter { get; set; }
        public string? CyCareerStage { get; set; }
        public string? CyIncentivePlan { get; set; }
        public string? CyCostCenter { get; set; }
        public string? FyCareerStage { get; set; }
    }
}
