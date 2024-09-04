// <copyright file="TblHrdataToolInput.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class TblHrdataToolInput
    {
        public string Ic { get; set; } = null!;
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
        public string? R2Org { get; set; }
        public string? R2Rs { get; set; }
        public string? R2Q1 { get; set; }
        public string? R2Q2 { get; set; }
        public string? R2CoversationLevel { get; set; }
        public string? R2Updatedby { get; set; }
        public DateTime? R2Update { get; set; }
        public string? R1Fy23correctManager { get; set; }
        public string? R2Fy23correctManager { get; set; }
        public string? Status { get; set; }
        public string? DecisionMakerAlias { get; set; }
        public DateTime? DecisionMadeOn { get; set; }
        public string? DecisionMakerComments { get; set; }
        public DateTime? FymanagerChangeApprovedOn { get; set; }
        public string? IsEdmoverride { get; set; }
        public string? Area { get; set; }
        public string? DecisionMakerName { get; set; }
        public int RequestId { get; set; }
        public string? SendingEmailsent { get; set; }
        public string? FyIncentivePlan { get; set; }
        public string? FyCostCenter { get; set; }
        public string? IspupdateStatus { get; set; }
        public string? IsperrorDetails { get; set; }
        public bool? SendStayScriptFollowed { get; set; }
        public bool? ReceiveScriptFollowed { get; set; }
    }
}
