// <copyright file="TaxonomyScriptContentAuditHistoryResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace MCT.DataAccess.Models
{
    /// <summary>
    /// TaxonomyScriptContentAuditHistoryResponse
    /// </summary>
    public class TaxonomyScriptContentAuditHistoryResponse
    {
        /// <summary>
        /// ModifiedBy
        /// </summary>
        [DataMember(Name = "modifiedBy")]
        public string ModifiedBy { get; set; } = string.Empty;

        /// <summary>
        /// ModifiedDate
        /// </summary>
        [DataMember(Name = "modifiedDate")]
        public DateTime? ModifiedDate { get; set; }


    }
}
