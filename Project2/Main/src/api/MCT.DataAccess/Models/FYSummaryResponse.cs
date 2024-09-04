// <copyright file="FYSummaryResponse.cs" company="Microsoft">
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

    /// <summary>
    /// FY summary response model.
    /// </summary>
    public class FYSummaryResponse
    {
        /// <summary>
        /// Team details.
        /// </summary>
        [DataMember(Name = "team")]
        public List<FYSummaryDto> Team { get; set; } = new List<FYSummaryDto>();
    }
}
