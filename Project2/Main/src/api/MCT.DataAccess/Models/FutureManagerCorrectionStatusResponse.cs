// <copyright file="FutureManagerCorrectionStatusResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;
    /// <summary>
    /// Future manager correction status response model.
    /// </summary>
    public class FutureManagerCorrectionStatusResponse
    {
        /// <summary>
        /// Gets or sets the employee Name.
        /// </summary>
        [DataMember(Name = "employeeName")]
        public string? EmployeeName { get; set; }
        /// <summary>
        /// Gets or sets the request status.
        /// </summary>
        [DataMember(Name = "requestStatus")]
        public string? RequestStatus { get; set; }
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
        [DataMember(Name = "currentYearManager")]
        public string? CurrentYearManager { get; set; }
        /// <summary>
        /// Gets or sets submittedBy.
        /// </summary>
        [DataMember(Name = "submittedBy")]
        public string? SubmittedBy { get; set; }
        /// <summary>
        /// Gets or sets the submitted date.
        /// </summary>
        [DataMember(Name = "submittedDate")]
        public DateTime? SubmittedDate { get; set; }
        /// <summary>
        /// Gets or sets the approved or rejectedBy.
        /// </summary>
        [DataMember(Name = "approvedRejectedBy")]
        public string? ApprovedRejectedBy { get; set; }
        /// <summary>
        /// Gets or sets the approved or rejected date.
        /// </summary>
        [DataMember(Name = "approvedRejectedDate")]
        public DateTime? approvedRejectedDate { get; set; }
        /// <summary>
        /// Gets or sets the requestor comments.
        /// </summary>
        [DataMember(Name = "requestorComments")]
        public string? RequestorComments { get; set; }
        /// <summary>
        /// Gets or sets the approver comments.
        /// </summary>
        [DataMember(Name = "approverComments")]
        public string? approverComments { get; set; }

    }
}
