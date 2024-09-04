// <copyright file="AuditEventCategory.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    /// <summary>
    ///     Provides information about the category of the operation being audited.
    ///     E.g.
    ///     Creating a user account could be of type 'UserManagement'.
    ///     Adding a user to a group could be of type 'GroupManagement'.
    /// </summary>
    /// <remarks>This field could be used for different retention policies.</remarks>
    public enum AuditEventCategory
    {
        /// <summary>
        /// The other (default) category.
        /// </summary>
        Other = 0,

        /// <summary>
        /// The user management category.
        /// </summary>
        UserManagement = 1,

        /// <summary>
        /// The group management category.
        /// </summary>
        GroupManagement = 2,

        /// <summary>
        /// The authentication category.
        /// </summary>
        Authentication = 3,

        /// <summary>
        /// The authorization category.
        /// </summary>
        Authorization = 4,

        /// <summary>
        /// The role management category.
        /// </summary>
        RoleManagement = 5,

        /// <summary>
        /// The application management category.
        /// </summary>
        ApplicationManagement = 6,

        /// <summary>
        /// The key management category.
        /// </summary>
        KeyManagement = 7,

        /// <summary>
        /// The directory management category.
        /// </summary>
        DirectoryManagement = 8,

        /// <summary>
        /// The resource management category.
        /// </summary>
        ResourceManagement = 9,
    }
}