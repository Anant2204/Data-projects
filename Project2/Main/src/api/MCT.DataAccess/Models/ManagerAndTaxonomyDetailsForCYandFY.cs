// <copyright file="ManagerAndTaxonomyDetailsForCYandFY.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// Current year and future year details related to manager and taxonomy
    /// </summary>
    public class ManagerAndTaxonomyDetailsForCYandFY
    {
        /// <summary>Gets or sets the ic.</summary>
        /// <value>The ic.</value>
        public string? Ic { get; set; }

        /// <summary>Gets or sets the full name of the ic.</summary>
        /// <value>The full name of the ic.</value>
        public string? IcFullName { get; set; }

        /// <summary>Gets or sets the cy org.</summary>
        /// <value>The cy org.</value>
        public string? CyOrg { get; set; }

        /// <summary>Gets or sets the cy role summary.</summary>
        /// <value>The cy role summary.</value>
        public string? CyRoleSummary { get; set; }

        /// <summary>Gets or sets the cy q1.</summary>
        /// <value>The cy q1.</value>
        public string? CyQ1 { get; set; }

        /// <summary>Gets or sets the cy q2.</summary>
        /// <value>The cy q2.</value>
        public string? CyQ2 { get; set; }

        /// <summary>Gets or sets the FyOrg.</summary>
        /// <value>The FyOrg.</value>
        public string? FyOrg { get; set; }

        /// <summary>Gets or sets the FyRoleSummary.</summary>
        /// <value>The FyRoleSummary.</value>
        public string? FyRoleSummary { get; set; }

        /// <summary>Gets or sets the FyQ1.</summary>
        /// <value>The FyQ1.</value>
        public string? FyQ1 { get; set; }

        /// <summary>Gets or sets the FyQ2.</summary>
        /// <value>The FyQ2.</value>
        public string? FyQ2 { get; set; }

        /// <summary>Gets or sets the cy cost center.</summary>
        /// <value>The cy cost center.</value>
        public string? CyCostCenter { get; set; }

        /// <summary>Gets or sets the fy cost center.</summary>
        /// <value>The fy cost center.</value>
        public string? FyCostCenter { get; set; }

        /// <summary>Gets or sets the cy career stage.</summary>
        /// <value>The cy career stage.</value>
        public string? CyCareerStage { get; set; }

        /// <summary>Gets or sets the fy career stage.</summary>
        /// <value>The fy career stage.</value>
        public string? FyCareerStage { get; set; }

        /// <summary>Gets or sets the cy manager alias.</summary>
        /// <value>The cy manager alias.</value>
        public string? CyManagerAlias { get; set; }

        /// <summary>Gets or sets the fy manager alias.</summary>
        /// <value>The fy manager alias.</value>
        public string? FyManagerAlias { get; set; }

        /// <summary>Gets or sets the fy incentive plan.</summary>
        /// <value>The fy incentive plan.</value>
        public string? FyIncentivePlan { get; set; }

        /// <summary>Gets or sets the cy incentive plan.</summary>
        /// <value>The cy incentive plan.</value>
        public string? CyIncentivePlan { get; set; }
    }
}
