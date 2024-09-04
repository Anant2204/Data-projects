// <copyright file="GetManagerWithDefaultSelection.cs" company="Microsoft">
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
    /// Default selection result
    /// </summary>
    [DataContract]
    public class GetManagerWithDefaultSelection
    {
        /// <summary>
        /// Gets or sets the managers.
        /// </summary>
        [DataMember(Name = "managers")]
        public List<Manager> Managers { get; set; } = new List<Manager>();
        /// <summary>
        /// Gets or sets default selection.
        /// </summary>
        [DataMember(Name = "defaultSelectedManagerAlias")]
        public string? DefaultSelection { get; set; }
    }
}
