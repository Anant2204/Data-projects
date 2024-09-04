// <copyright file="TblHrdatum.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class TblHrdatum
    {
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
        public string? FyManagerAlias { get; set; }
        public string? FyManagerFullName { get; set; }
        public string? FyOrg { get; set; }
        public string? FyRoleSummary { get; set; }
        public string? FyQ1 { get; set; }
        public string? FyQ2 { get; set; }
        public string FymanagerChange { get; set; } = null!;
        public DateTime? RecordModifiedDate { get; set; }
        public string? Script { get; set; }
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
        public int Id { get; set; }
        public string? FyIncentivePlan { get; set; }
        public string? FyCostCenter { get; set; }
        public string? CyCareerStage { get; set; }
        public string? CyIncentivePlan { get; set; }
        public string? CyCostCenter { get; set; }
        public string? FyCareerStage { get; set; }
        public string? CyProfession { get; set; }
        public string? CyDiscipline { get; set; }
        public string? FyProfession { get; set; }
        public string? FyDiscipline { get; set; }
    }
}
