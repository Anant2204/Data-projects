// <copyright file="VwHrdatum.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class VwHrdatum
    {
        public int Id { get; set; }
        public string? Ic { get; set; }
        public string? IcFullName { get; set; }
        public string? Location { get; set; }
        public string? RoleChange { get; set; }
        public string? CyManagerAlias { get; set; }
        public string? CyManagerFullName { get; set; }
        public string? CyOrg { get; set; }
        public string? CyRoleSummary { get; set; }
        public string? CyQ1 { get; set; }
        public string? CyQ2 { get; set; }
        public string? CyCareerStage { get; set; }
        public string? CyIncentivePlan { get; set; }
        public string? CyCostCenter { get; set; }
        public string? FyManagerAlias { get; set; }
        public string? FyManagerFullName { get; set; }
        public string? FyOrg { get; set; }
        public string? FyRoleSummary { get; set; }
        public string? FyQ1 { get; set; }
        public string? FyQ2 { get; set; }
        public string? FyIncentivePlan { get; set; }
        public string? FyCostCenter { get; set; }
        public string? FyCareerStage { get; set; }
        public string FymanagerChange { get; set; } = null!;
        public string R1managerChange { get; set; } = null!;
        public string R2managerChange { get; set; } = null!;
        public string? R1Fy23correctManager { get; set; }
        public string? R1ConversationStatus { get; set; }
        public string? R1Edmvalidation { get; set; }
        public string? R1Comments { get; set; }
        public string? R1Org { get; set; }
        public string? R1Rs { get; set; }
        public string? R1Q1 { get; set; }
        public string? R1Q2 { get; set; }
        public string? R1Updatedby { get; set; }
        public DateTime? R1Update { get; set; }
        public string? R1CoversationLevel { get; set; }
        public string? R2ConversationStatus { get; set; }
        public string? R2Edmvalidation { get; set; }
        public string? R2Comments { get; set; }
        public string? R2Fy23correctManager { get; set; }
        public string? R2Org { get; set; }
        public string? R2Rs { get; set; }
        public string? R2Q1 { get; set; }
        public string? R2Q2 { get; set; }
        public string? R2CoversationLevel { get; set; }
        public string? R2Updatedby { get; set; }
        public DateTime? R2Update { get; set; }
        public int? FyCompanyCode { get; set; }
        public string? Script { get; set; }
        public int? Loa { get; set; }
        public string? SendingScriptLink { get; set; }
        public string ReceivingScriptLink { get; set; } = null!;
        public string SendingFormatingStatus { get; set; } = null!;
        public string ReceivingFormatingStatus { get; set; } = null!;
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
        public string Conversation { get; set; } = null!;
    }
}
