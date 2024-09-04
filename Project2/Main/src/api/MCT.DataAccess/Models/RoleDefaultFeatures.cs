// <copyright file="RoleDefaultFeatures.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCT.DataAccess.Models
{
    /// <summary>
    /// Represents the Role Default Features.
    /// </summary>
    public class RoleDefaultFeatures
    {
        /// <summary>
        /// Gets or sets the list of roles for the user.
        /// </summary>
        public string? Role { get; set; }

        /// <summary>
        /// Gets or sets the list of feature  .
        /// </summary>
        public string? defaultFeature { get; set; }
    }
}
