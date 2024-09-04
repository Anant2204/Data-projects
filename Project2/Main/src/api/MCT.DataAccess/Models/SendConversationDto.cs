// <copyright file="SendConversationDto.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Threading.Tasks;
    using System.Xml.Linq;

    /// <summary>
    /// Send conversation response model.
    /// </summary>
    [DataContract]
    public class SendConversationDto
    {
        /// <summary>Gets or sets the full name of the employee.</summary>
        [DataMember(Name = "fullName")]
        public string? FullName { get; set; }

        /// <summary>Gets or sets the alias.</summary>
        [DataMember(Name = "alias")]
        public string? Alias { get; set; }

        /// <summary>Gets or sets the conversation.</summary>
        [DataMember(Name = "conversation")]
        public string Conversation { get; set; } = null!;

        /// <summary>Gets or sets the fymanager change.</summary>
        [DataMember(Name = "fyManagerChange")]
        public string FyManagerChange { get; set; } = null!;

        /// <summary>Gets or sets the sending conversation status.</summary>
        [DataMember(Name = "conversationStatus")]
        public string? ConversationStatus { get; set; }

        /// <summary>Gets or sets the sending edmvalidation.</summary>
        [DataMember(Name = "edmValidation")]
        public string? EdmValidation { get; set; }

        /// <summary>Gets or sets the fy manager alias.</summary>
        [DataMember(Name = "fyManagerAlias")]
        public string? FyManagerAlias { get; set; }

        /// <summary>Gets or sets the fy org.</summary>
        [DataMember(Name = "fyOrg")]
        public string? FyOrg { get; set; }

        /// <summary>Gets or sets the fy role summary.</summary>
        [DataMember(Name = "fyRoleSummary")]
        public string? FyRoleSummary { get; set; }

        /// <summary>Gets or sets the fy q1.</summary>
        [DataMember(Name = "fyQ1")]
        public string? FyQ1 { get; set; }

        /// <summary>Gets or sets the fy q2.</summary>
        [DataMember(Name = "fyQ2")]
        public string? FyQ2 { get; set; }

        /// <summary>Gets or sets the fy incentive plan.</summary>
        [DataMember(Name = "fyIncentivePlan")]
        public string? FyIncentivePlan { get; set; }

        /// <summary>Gets or sets the fy cost center.</summary>
        [DataMember(Name = "fyCostCenter")]
        public string? FyCostCenter { get; set; }

        /// <summary>Gets or sets the cy org.</summary>
        [DataMember(Name = "cyOrg")]
        public string? CyOrg { get; set; }

        /// <summary>Gets or sets the cy role summary.</summary>
        [DataMember(Name = "cyRoleSummary")]
        public string? CyRoleSummary { get; set; }

        /// <summary>Gets or sets the cy q1.</summary>
        [DataMember(Name = "cyQ1")]
        public string? CyQ1 { get; set; }

        /// <summary>Gets or sets the cy q2.</summary>
        [DataMember(Name = "cyQ2")]
        public string? CyQ2 { get; set; }

        /// <summary>Gets or sets the cy career stage.</summary>
        [DataMember(Name = "cyCareerStage")]
        public string? CyCareerStage { get; set; }

        /// <summary>Gets or sets the cy incentive plan.</summary>
        [DataMember(Name = "cyIncentivePlan")]
        public string? CyIncentivePlan { get; set; }

        /// <summary>Gets or sets the cy cost center.</summary>
        [DataMember(Name = "cyCostCenter")]
        public string? CyCostCenter { get; set; }

        /// <summary>Gets or sets the cy manager alias.</summary>
        [DataMember(Name = "cyManagerAlias")]
        public string? CyManagerAlias { get; set; }

        /// <summary>Gets or sets the full name of the current manager.</summary>
        [DataMember(Name = "cyManagerFullName")]
        public string? CyManagerFullName { get; set; }

        /// <summary>Gets or sets the has active future manager request.</summary>
        [DataMember(Name = "hasActiveFutureManagerRequest")]
        public bool? HasActiveFutureManagerRequest { get; set; }

        /// <summary>Gets or sets the future manager request submitted by.</summary>
        [DataMember(Name = "futureManagerRequestSubmittedBy")]
        public string? FutureManagerRequestSubmittedBy { get; set; }

        /// <summary>Gets or sets the has active Taxonomy Correction request.</summary>
        [DataMember(Name = "hasActiveTaxonomyCorrectionRequest")]
        public bool? HasActiveTaxonomyCorrectionRequest { get; set; }

        /// <summary>Gets or sets the full name of the future manager.</summary>
        [DataMember(Name = "fyManagerFullName")]
        public string? FyManagerFullName { get; set; }

        /// <summary>Gets or sets the  fyCareerStage.</summary>
        [DataMember(Name = "fyCareerStage")]
        public string? FyCareerStage { get; set; }

        /// <summary>Gets or sets the taxonomy Correction Request submitted by.</summary>
        [DataMember(Name = "taxonomyCorrectionRequestSubmittedBy")]
        public string? TaxonomyCorrectionRequestSubmittedBy { get; set; }

        /// <summary> Gets or sets the  Employee Review  Status. </summary>
        [DataMember(Name = "isEmployeeRecordApproved")]
        public bool IsEmployeeRecordApproved { get; set; }
    }
}