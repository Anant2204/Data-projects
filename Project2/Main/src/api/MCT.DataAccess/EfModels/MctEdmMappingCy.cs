// <copyright file="MctEdmMappingCy.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.EfModels
{
    public partial class MctEdmMappingCy
    {
        public string Org { get; set; } = null!;
        public string RoleSummary { get; set; } = null!;
        public string Q1 { get; set; } = null!;
        public string Q2 { get; set; } = null!;
        public string? IncentivePlan { get; set; }
        public string? CareerStage { get; set; }
    }
}
