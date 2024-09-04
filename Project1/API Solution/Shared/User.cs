// <copyright file="User.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The user type.
    /// </summary>
    [DataContract]
    public class User
    {
        /// <summary>
        /// Gets or sets the user alias.
        /// </summary>
        [DataMember(Name = "alias")]
        public string? Alias { get; set; }

        /// <summary>
        /// Gets or Sets the list of roles assigned to the user.
        /// </summary>
        [DataMember(Name = "roles")]
        public IList<RoleTypesEnum> Roles { get; set; } = new List<RoleTypesEnum>();

        /// <summary>
        /// Gets or sets a value indicating whether the user is added as part of native OSE flow.
        /// </summary>
        /// <value><c>true</c> if the user is added in OSE, <c>false</c> otherwise.</value>
        [DataMember(Name = "isNativeUser")]
        public bool IsNativeUser { get; set; } = false;
    }
}