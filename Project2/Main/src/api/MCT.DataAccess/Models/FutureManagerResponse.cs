// <copyright file="FutureManagerResponse.cs" company="Microsoft">
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
    /// Conversation statistics response model.
    /// </summary>
    public class FutureManager
    {
        /// <summary>
        /// Total employees count.
        /// </summary>
        [DataMember(Name = "alias")]
        public string Ic { get; set; } = string.Empty;

        /// <summary>
        /// Total Completed count.
        /// </summary>
        [DataMember(Name = "Full Name")]
        public string FullName { get; set; } = string.Empty;


    }
}
