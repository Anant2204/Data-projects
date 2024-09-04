// <copyright file="RoleTypesEnum.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    /// <summary>
    /// The estimate status.
    /// </summary>
    [JsonConverter(typeof(StringEnumConverter))]
    [Flags]
    public enum RoleTypesEnum
    {
        /// <summary>
        /// No role assigned.
        /// </summary>
        [EnumMember(Value = "None")]
        None = 0,

        /// <summary>
        /// Reader role.
        /// </summary>
        [EnumMember(Value = "Reader")]
        Reader = 1,

        /// <summary>
        /// Contributor role.
        /// </summary>
        [EnumMember(Value = "Contributor")]
        Contributor = 2,

        /// <summary>
        /// Owner role.
        /// </summary>
        [EnumMember(Value = "Owner")]
        Owner = 4,

        /// <summary>
        /// System Admin role.
        /// </summary>
        [EnumMember(Value = "SystemAdmin")]
        SystemAdmin = 8,

        /// <summary>
        /// Publisher role.
        /// </summary>
        [EnumMember(Value = "Publisher")]
        Publisher = 16,
    }
}
