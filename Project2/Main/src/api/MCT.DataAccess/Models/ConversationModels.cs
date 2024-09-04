// <copyright file="ConversationModels.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{

    /// <summary>
    ///   Model for Conversations
    /// </summary>
    public class ConversationModels
    {
        /// <summary>Gets or sets the ic.</summary>
        /// <value>The ic.</value>
        public string? Ic { get; set; }
        /// <summary>Gets or sets the full name of the ic.</summary>
        /// <value>The full name of the ic.</value>
        public string? IcFullName { get; set; }
        /// <summary>Gets or sets the role change.</summary>
        /// <value>The role change.</value>
        public string? RoleChange { get; set; }
        /// <summary>Gets or sets the cy manager alias.</summary>
        /// <value>The cy manager alias.</value>
        public string? CyManagerAlias { get; set; }
        /// <summary>Gets or sets the full name of the cy manager.</summary>
        /// <value>The full name of the cy manager.</value>
        public string? CyManagerFullName { get; set; }
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
        /// <summary>Gets or sets the cy career stage.</summary>
        /// <value>The cy career stage.</value>
        public string? CyCareerStage { get; set; }
        /// <summary>Gets or sets the cy incentive plan.</summary>
        /// <value>The cy incentive plan.</value>
        public string? CyIncentivePlan { get; set; }
        /// <summary>Gets or sets the cy cost center.</summary>
        /// <value>The cy cost center.</value>
        public string? CyCostCenter { get; set; }
        /// <summary>Gets or sets the fy manager alias.</summary>
        /// <value>The fy manager alias.</value>
        public string? FyManagerAlias { get; set; }
        /// <summary>Gets or sets the full name of the fy manager.</summary>
        /// <value>The full name of the fy manager.</value>
        public string? FyManagerFullName { get; set; }
        /// <summary>Gets or sets the fy org.</summary>
        /// <value>The fy org.</value>
        public string? FyOrg { get; set; }
        /// <summary>Gets or sets the fy role summary.</summary>
        /// <value>The fy role summary.</value>
        public string? FyRoleSummary { get; set; }
        /// <summary>Gets or sets the fy q1.</summary>
        /// <value>The fy q1.</value>
        public string? FyQ1 { get; set; }
        /// <summary>Gets or sets the fy q2.</summary>
        /// <value>The fy q2.</value>
        public string? FyQ2 { get; set; }
        /// <summary>Gets or sets the fy incentive plan.</summary>
        /// <value>The fy incentive plan.</value>
        public string? FyIncentivePlan { get; set; }
        /// <summary>Gets or sets the fy cost center.</summary>
        /// <value>The fy cost center.</value>
        public string? FyCostCenter { get; set; }
        /// <summary>Gets or sets the fy career stage.</summary>
        /// <value>The fy career stage.</value>
        public string? FyCareerStage { get; set; }
        /// <summary>Gets or sets the fymanager change.</summary>
        /// <value>The fymanager change.</value>
        public string FymanagerChange { get; set; } = null!;
        /// <summary>Gets or sets the r1manager change.</summary>
        /// <value>The r1manager change.</value>
        public string R1managerChange { get; set; } = null!;
        /// <summary>Gets or sets the r2manager change.</summary>
        /// <value>The r2manager change.</value>
        public string R2managerChange { get; set; } = null!;
        /// <summary>Gets or sets the r1 conversation status.</summary>
        /// <value>The r1 conversation status.</value>
        public string? R1ConversationStatus { get; set; }
        /// <summary>Gets or sets the r1 edmvalidation.</summary>
        /// <value>The r1 edmvalidation.</value>
        public string? R1Edmvalidation { get; set; }
        /// <summary>Gets or sets the r1 comments.</summary>
        /// <value>The r1 comments.</value>
        public string? R1Comments { get; set; }
        /// <summary>Gets or sets the r1 org.</summary>
        /// <value>The r1 org.</value>
        public string? R1Org { get; set; }
        /// <summary>Gets or sets the r1 rs.</summary>
        /// <value>The r1 rs.</value>
        public string? R1Rs { get; set; }
        /// <summary>Gets or sets the r1 q1.</summary>
        /// <value>The r1 q1.</value>
        public string? R1Q1 { get; set; }
        /// <summary>Gets or sets the r1 q2.</summary>
        /// <value>The r1 q2.</value>
        public string? R1Q2 { get; set; }
        /// <summary>Gets or sets the r2 conversation status.</summary>
        /// <value>The r2 conversation status.</value>
        public string? R2ConversationStatus { get; set; }
        /// <summary>Gets or sets the r2 edmvalidation.</summary>
        /// <value>The r2 edmvalidation.</value>
        public string? R2Edmvalidation { get; set; }
        /// <summary>Gets or sets the r2 org.</summary>
        /// <value>The r2 org.</value>
        public string? R2Org { get; set; }
        /// <summary>Gets or sets the r2 q1.</summary>
        /// <value>The r2 q1.</value>
        public string? R2Q1 { get; set; }
        /// <summary>Gets or sets the r2 q2.</summary>
        /// <value>The r2 q2.</value>
        public string? R2Q2 { get; set; }
        /// <summary>Gets or sets the r2 coversation level.</summary>
        /// <value>The r2 coversation level.</value>
        public string? R2CoversationLevel { get; set; }
        /// <summary>Gets or sets the fy company code.</summary>
        /// <value>The fy company code.</value>
        public int? FyCompanyCode { get; set; }
        /// <summary>Gets or sets the sending script link.</summary>
        /// <value>The sending script link.</value>
        public string? SendingScriptLink { get; set; }
        /// <summary>Gets or sets the sending script link.</summary>
        /// <value>The sending script link.</value>
        public string? Receiving_ScriptLink { get; set; }
        /// <summary>Gets or sets the conversation.</summary>
        /// <value>The conversation.</value>
        public string Conversation { get; set; } = null!;
    }

}
