// <copyright file="FeatureLevelPermissions.cs" company="Microsoft">
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
    /// Represents the permissions at the feature level.
    /// </summary>
    public class FeatureLevelPermissions
    {
        /// <summary>
        /// Gets or sets the name of the feature.
        /// </summary>
        public string FeatureName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the list of permissions for the feature.
        /// </summary>
        public List<string> Permission { get; set; } = new List<string>();
    }
}
