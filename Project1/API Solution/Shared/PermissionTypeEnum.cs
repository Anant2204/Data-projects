// <copyright file="PermissionTypeEnum.cs" company="Microsoft Corporation">
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
    /// The permission types.
    /// </summary>
    [JsonConverter(typeof(StringEnumConverter))]
    [Flags]
    public enum PermissionTypeEnum
    {
        /// <summary>
        /// No role assigned.
        /// </summary>
        [EnumMember(Value = "None")]
        None = 0,

        /// <summary>
        /// Read permission.
        /// </summary>
        [EnumMember(Value = "Read")]
        Read = 1,

        /// <summary>
        /// Edit permission.
        /// </summary>
        [EnumMember(Value = "Write")]
        Write = 2,

        /// <summary>
        /// Edit permission.
        /// </summary>
        [EnumMember(Value = "Publish")]
        Publish = 4,

        /// <summary>
        /// Delete permission.
        /// </summary>
        [EnumMember(Value = "Delete")]
        Delete = 8,
    }
}