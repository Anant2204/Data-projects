// <copyright file="ExcludedManagerDetails.cs" company="Microsoft">
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
    /// excluded managers details.
    /// </summary>
    public class ExcludedManagerDetails
    {
         /// <summary>
         /// property to get and set manager alias
         /// </summary>
        [DataMember(Name = "alias")]
        public string Alias { get; set; } = string.Empty;

        /// <summary>
        /// property to get and set manager name
        /// </summary>
        [DataMember(Name = "fullName")]
        public string FullName { get; set; } = string.Empty; 
    }
}
