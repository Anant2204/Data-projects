// <copyright file="MCTEDMMapping.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCT.DataAccess.EfModels
{
    public partial class MctEdmMapping
    {
        public string Org { get; set; }
        public string RoleSummary { get; set; }
        public string Q1 { get; set; }
        public string Q2 { get; set; }
        public string IncentivePlan { get; set; }
        public string CareerStage { get; set; }

    }
}
