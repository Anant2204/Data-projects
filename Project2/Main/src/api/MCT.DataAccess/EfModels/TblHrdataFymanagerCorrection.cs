// <copyright file="TblHrdataFymanagerCorrection.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class TblHrdataFymanagerCorrection
    {
        public int Id { get; set; }
        public string? IcAlias { get; set; }
        public string? CyManagerAlias { get; set; }
        public string? FyManagerAlias { get; set; }
        public string? FyCorrectManagerAlias { get; set; }
        public string? Status { get; set; }
        public string? Comment { get; set; }
        public string? IspUpdateStatus { get; set; }
        public string? IspErrorDetails { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; } = null!;
        public DateTime? ModifiedDate { get; set; }
        public string? ApprovedRejectedBy { get; set; }
        public DateTime? ApprovedRejectedDate { get; set; }
        public string? ApproverComments { get; set; }
        public bool IsLevel1ApprovalEmailSent { get; set; }
        public bool IsLevel2ApprovalEmailSent { get; set; }
        public string? ApprovedRejectedByLevel2 { get; set; }
        public DateTime? ApprovedRejectedDateByLevel2 { get; set; }
        public string? ApproverRejecterCommentsByLevel2 { get; set; }
        public bool? TwoLevelApprovalRequired { get; set; }
        public string? FlowId { get; set; }
        public string? FlowRunId {  get; set; }
        public string? FlowApprovalId { get; set; }
    }
}
