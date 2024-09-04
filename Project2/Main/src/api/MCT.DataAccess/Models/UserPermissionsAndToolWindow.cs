// <copyright file="UserPermissionsAndToolWindow.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// Represents the extended user permissions.
    /// </summary>
    public class UserPermissionsAndToolWindow : UserPermissions
    {
        /// <summary>
        /// Gets or sets the start date of the window.
        /// </summary>
        public DateTime? StartDate { get; set; }

        /// <summary>
        /// Gets or sets the end date of the window.
        /// </summary>
        public DateTime? EndDate { get; set; }
    }
}
