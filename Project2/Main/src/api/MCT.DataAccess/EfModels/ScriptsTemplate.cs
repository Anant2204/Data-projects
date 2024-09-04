// <copyright file="ScriptsTemplate.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class ScriptsTemplate
    {
        public int Id { get; set; }
        public string? Section { get; set; }
        public int Seq { get; set; }
        public string? CyOrg { get; set; }
        public string? CyProfession { get; set; }
        public string? CyDescipline { get; set; }
        public string? CyRoleSummary { get; set; }
        public string? CyAbt { get; set; }
        public string? CyQ1 { get; set; }
        public string? CyQ2 { get; set; }
        public string? CyIncentivePlan { get; set; }
        public string? CyCareerStage { get; set; }
        public string? FyOrg { get; set; }
        public string? FyProfession { get; set; }
        public string? FyDescipline { get; set; }
        public string? FyRoleSummary { get; set; }
        public string? FyAbt { get; set; }
        public string? FyQ1 { get; set; }
        public string? FyQ2 { get; set; }
        public string? FyIncentivePlan { get; set; }
        public string? FyCareerStage { get; set; }
        public int? Priority { get; set; }
        public string? ContextDescription { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; } = null!;
        public DateTime ModifiedOn { get; set; }
        public string? ScenarioName { get; set; }
        public string? Exclusion { get; set; }
        public string? DisciplineContextOptional { get; set; }
        public string? Title { get; set; }
        public bool? IsFinal { get; set; }
    }
}
