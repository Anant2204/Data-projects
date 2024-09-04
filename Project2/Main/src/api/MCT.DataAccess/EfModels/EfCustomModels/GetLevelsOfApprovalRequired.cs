// <copyright file="GetLevelsOfApprovalRequired.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using MCT.DataAccess.Models;

namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    /// <summary>
    /// The GetApproverLevelResult response type.
    /// </summary>
    [DataContract]
    public class GetLevelsOfApprovalRequired
    {


        /// <summary>Gets or sets the twoLevelApprovalRequired.</summary>
        [DataMember(Name = "twoLevelApprovalRequired")]

        public bool TwoLevelApprovalRequired { get; set; }

 
    }
}

