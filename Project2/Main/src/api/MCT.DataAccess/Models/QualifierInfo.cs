// <copyright file="QualifierInfo.cs" company="Microsoft">
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
    /// QualifierInfo Model
    /// </summary>
    public class QualifierInfo
    {
        /// <summary>
        /// Q1
        /// </summary>
        [DataMember(Name = "q1")]
        public string? Q1 { get; set; }

        /// <summary>
        /// Q2
        /// </summary>
        [DataMember(Name = "q2")]
        public List<string?>? Q2 { get; set; }
    }
}
