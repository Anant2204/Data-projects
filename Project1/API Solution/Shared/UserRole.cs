// <copyright file="UserRole.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The User-Role entity.
    /// </summary>
    public class UserRole
    {
        /// <summary>
        /// Gets or Sets the Role.
        /// </summary>
        [DataMember(Name = "role")]
        public RoleTypesEnum Role { get; set; }

        /// <summary>
        /// Gets or sets the list of user aliases.
        /// </summary>
        [DataMember(Name = "users")]
        public ICollection<string> Users { get; set; } = new List<string>();

    }
}