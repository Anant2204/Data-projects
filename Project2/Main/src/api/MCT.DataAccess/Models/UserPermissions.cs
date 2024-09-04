// <copyright file="UserPermissions.cs" company="Microsoft">
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
    /// Represents the user permissions.
    /// </summary>
    public class UserPermissions
    {
        /// <summary>
        /// Gets or sets the list of roles for the user.
        /// </summary>
        public List<string> Roles { get; set; } = new List<string>();

        /// <summary>
        /// Gets or sets the list of feature level permissions for the user.
        /// </summary>
        public List<FeatureLevelPermissions> Permissions { get; set; } = new List<FeatureLevelPermissions> { };

        /// <summary>
        /// Gets or sets the list of default feature based on role for user.
        /// </summary>
        public List<RoleDefaultFeatures> DefaultFeatures { get; set; } = new List<RoleDefaultFeatures> { };
    }
}
