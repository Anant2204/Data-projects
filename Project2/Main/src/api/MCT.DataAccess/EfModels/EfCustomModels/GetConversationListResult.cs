// <copyright file="GetConversationListResult.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

using MCT.DataAccess.Models;

namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    /// <summary>
    /// The conversation list response type.
    /// </summary>
    public class GetConversationListResult
    {
        /// <summary>Gets or sets the full name of the employee.</summary>
        public string? IC_FullName { get; set; }

        /// <summary>Gets or sets the alias.</summary>
        public string? IcAlias { get; set; }

        /// <summary>Gets or sets the conversation.</summary>
        public string Conversation { get; set; } = null!;

        /// <summary>Gets or sets the fymanager change.</summary>
        public string FyManagerChange { get; set; } = null!;

        /// <summary>Gets or sets the sending conversation status.</summary>
        public string? R1_ConversationStatus { get; set; }

        /// <summary>Gets or sets the receiving conversation status.</summary>
        public string? R2_ConversationStatus { get; set; }

        /// <summary>Gets or sets the sending edmvalidation.</summary>
        public string? R1_EdmValidation { get; set; }

        /// <summary>Gets or sets the sending edmvalidation.</summary>
        public string? R2_EdmValidation { get; set; }

        /// <summary>Gets or sets the sending formating status.</summary>
        public string? SendingFormatingStatus { get; set; }

        /// <summary>Gets or sets the receiving formating status.</summary>
        public string? ReceivingFormatingStatus { get; set; }

        /// <summary>Gets or sets the fy manager alias.</summary>
        public string? Fy_ManagerAlias { get; set; }

        /// <summary>Gets or sets the full name of the current manager.</summary>
        public string? Fy_ManagerFullName { get; set; }

        /// <summary>Gets or sets the fy org.</summary>
        public string? Fy_Org { get; set; }

        /// <summary>Gets or sets the fy role summary.</summary>
        public string? Fy_RoleSummary { get; set; }

        /// <summary>Gets or sets the fy q1.</summary>
        public string? Fy_Q1 { get; set; }

        /// <summary>Gets or sets the fy q2.</summary>
        public string? Fy_Q2 { get; set; }

        /// <summary>Gets or sets the fy incentive plan.</summary>
        public string? Fy_IncentivePlan { get; set; }

        /// <summary>Gets or sets the fy cost center.</summary>
        public string? Fy_CostCenter { get; set; }

        /// <summary>Gets or sets the cy org.</summary>
        public string? Cy_Org { get; set; }

        /// <summary>Gets or sets the cy role summary.</summary>
        public string? Cy_RoleSummary { get; set; }

        /// <summary>Gets or sets the cy q1.</summary>
        public string? Cy_Q1 { get; set; }

        /// <summary>Gets or sets the cy q2.</summary>
        public string? Cy_Q2 { get; set; }

        /// <summary>Gets or sets the cy career stage.</summary>
        public string? Cy_CareerStage { get; set; }

        /// <summary>Gets or sets the cy incentive plan.</summary>
        public string? Cy_IncentivePlan { get; set; }

        /// <summary>Gets or sets the cy cost center.</summary>
        public string? Cy_CostCenter { get; set; }

        /// <summary>Gets or sets the cy manager alias.</summary>
        public string? Cy_ManagerAlias { get; set; }

        /// <summary>Gets or sets the full name of the current manager.</summary>
        public string? Cy_ManagerFullName { get; set; }

        /// <summary>Gets or sets the has active future manager request.</summary>
        public bool? HasActiveFutureManagerRequest { get; set; }

        /// <summary> Gets or sets the future manager request submitted by. </summary>
        public string? FutureManagerRequestSubmittedBy { get; set; }


        /// <summary>Gets or sets the has active TaxonomyManagerRequest .</summary>
        public bool? HasActiveTaxonomyManagerRequest { get; set; }


        /// <summary>Gets or sets the has FyCareerStage request.</summary>
        public string? Fy_CareerStage { get; set; }


        /// <summary> Gets or sets the  Taxonomy Correction Request SubmittedBy. </summary>
        public string? TaxonomyCorrectionRequestSubmittedBy { get; set; }


        /// <summary> Gets or sets the  Employee Review  Status. </summary>
        public bool IsEmployeeRecordApproved { get; set; }
    }
}

