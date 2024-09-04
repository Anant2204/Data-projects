// <copyright file="FYManagerCorrectionApprovalResult.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using MCT.DataAccess.Models;

    /// <summary>
    /// The GetApproveRejectAccessResult response type.
    /// </summary>
    [DataContract]
    public class FYManagerCorrectionApprovalResult
    {
        /// <summary>Gets or sets the accessGranted.</summary>
        [DataMember(Name = "accessGranted")]

        public bool AccessGranted { get; set; }

 
    }
}

