// <copyright file="HrDataModel.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    /// <summary>
    /// HrDataModel
    /// </summary>
  
    public class HrDataModel
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

        /// <summary>Gets or sets the reports to level1 email.</summary>
        /// <value>The reports to level1 email.</value>
        public string? ReportsToLevel1Email { get; set; }

        /// <summary>Gets or sets the full name of the reports to level1.</summary>
        /// <value>The full name of the reports to level1.</value>
        public string? ReportsToLevel1FullName { get; set; }

        /// <summary>Gets or sets the reports to level2 email.</summary>
        /// <value>The reports to level2 email.</value>
        public string? ReportsToLevel2Email { get; set; }

        /// <summary>Gets or sets the full name of the reports to level2.</summary>
        /// <value>The full name of the reports to level2.</value>
        public string? ReportsToLevel2FullName { get; set; }

        /// <summary>Gets or sets the fy incentive plan.</summary>
        /// <value>The fy incentive plan.</value>
        public string? FyIncentivePlan { get; set; }

        /// <summary>Gets or sets the fy cost center.</summary>
        /// <value>The fy cost center.</value>
        public string? FyCostCenter { get; set; }

        /// <summary>Gets or sets the cy career stage.</summary>
        /// <value>The cy career stage.</value>
        public string? CyCareerStage { get; set; }

        /// <summary>Gets or sets the cy incentive plan.</summary>
        /// <value>The cy incentive plan.</value>
        public string? CyIncentivePlan { get; set; }

        /// <summary>Gets or sets the cy cost center.</summary>
        /// <value>The cy cost center.</value>
        public string? CyCostCenter { get; set; }

        /// <summary>Gets or sets the fy career stage.</summary>
        /// <value>The fy career stage.</value>
        public string? FyCareerStage { get; set; }

        /// <summary>Gets or sets the cy profession.</summary>
        /// <value>The cy profession.</value>
        public string? CyProfession { get; set; }

        /// <summary>Gets or sets the cy discipline.</summary>
        /// <value>The cy discipline.</value>
        public string? CyDiscipline { get; set; }

        /// <summary>Gets or sets the fy profession.</summary>
        /// <value>The fy profession.</value>
        public string? FyProfession { get; set; }

        /// <summary>Gets or sets the fy discipline.</summary>
        /// <value>The fy discipline.</value>
        public string? FyDiscipline { get; set; }

        /// <summary>Gets or sets the CyManagerAlias.</summary>
        /// <value>The  CyManagerAlias.</value>
        public string? CyManagerAlias { get; set; }

        /// <summary>Gets or sets the FyManagerAlias.</summary>
        /// <value>The fy FyManagerAlias.</value>
        public string? FyManagerAlias { get; set; }

        /// <summary>Gets or sets the CyManagerFullName.</summary>
        /// <value>The  CyManagerFullName.</value>
        public string? CyManagerFullName { get; set; }

        /// <summary>Gets or sets the FyManagerFullName.</summary>
        /// <value>The fy FyManagerFullName.</value>
        public string? FyManagerFullName { get; set; }


    }
}
