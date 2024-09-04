// <copyright file="GetFutureManagerCorrectionStatusResult.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.Runtime.Serialization;
    /// <summary>
    /// The Get Future manager correction result.
    /// </summary>
    [DataContract]
    public class GetFutureManagerRequestsResult
    {
    
        /// <summary>
        /// Gets or sets IcAlias.
        /// </summary>
        [DataMember(Name = "icAlias")]
        public string? IcAlias { get; set; }
        /// <summary>
        /// Gets or sets the employee Name.
        /// </summary>
        [DataMember(Name = "employeeName")]
        public string? EmployeeName { get; set; }
        /// <summary>
        /// Gets or sets the request status.
        /// </summary>
        [DataMember(Name = "requestStatus")]
        //public string? RequestStatus { get; set; }
        public string? Status { get; set; }

        /// <summary>
        /// Gets or sets the correct future manager alias.
        /// </summary>
        [DataMember(Name = "fyCorrectManagerAlias")]
        public string? FyCorrectManagerAlias { get; set; }
        /// <summary>
        /// Gets or sets the proposed future year manager.
        /// </summary>
        [DataMember(Name = "proposedFutureYearManager")]
        public string? ProposedFutureYearManager { get; set; }

        /// <summary>
        /// Gets or sets the current future year manger.
        /// </summary>
        [DataMember(Name = "currentFutureYearManager")]
        public string? CurrentFutureYearManager { get; set; }

        /// <summary>
        /// Gets or sets the current year manager.
        /// </summary>
        [DataMember(Name = "cyManagerAlias")]
        public string? CyManagerAlias { get; set; }
        /// <summary>
        /// Gets or sets the current year manager.
        /// </summary>
        [DataMember(Name = "currentYearManager")]
        public string? CurrentYearManager { get; set; }

        /// <summary>
        /// Gets or sets submittedBy.
        /// </summary>
        [DataMember(Name = "submittedBy")]
        public string CreatedBy { get; set; } = null!;
        //public string? SubmittedBy { get; set; }
        /// <summary>
        /// Gets or sets the submitted date.
        /// </summary>
        [DataMember(Name = "submittedDate")]
        public DateTime? CreatedDate { get; set; }
        //public DateTime? SubmittedDate { get; set; }
        /// <summary>
        /// Gets or sets the approved or rejectedBy.
        /// </summary>
        [DataMember(Name = "approvedRejectedBy")]
        public string? ApprovedRejectedBy { get; set; }
        /// <summary>
        /// Gets or sets the approved or rejected date.
        /// </summary>
        [DataMember(Name = "approvedRejectedDate")]
        public DateTime? ApprovedRejectedDate { get; set; }
        /// <summary>
        /// Gets or sets the requestor comments.
        /// </summary>
        [DataMember(Name = "requestorComments")]
        //public string? RequestorComments { get; set; }
        public string? Comment { get; set; }
        /// <summary>
        /// Gets or sets the approver comments.
        /// </summary>
        [DataMember(Name = "approverComments")]
        public string? ApproverComments { get; set; }
        /// <summary>
        /// Gets or sets the canApprove.
        /// </summary>
        [DataMember(Name = "canApprove")]
        public bool CanApprove { get; set; }
        /// <summary>
        /// Gets or sets Id.
        /// </summary>
        [DataMember(Name = "id")]
        public int Id { get; set; }

    }
}
