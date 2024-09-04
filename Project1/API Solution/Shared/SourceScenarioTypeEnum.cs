// <copyright file="SourceScenarioTypeEnum.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// SourceScenarioTypeEnum.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum SourceScenarioTypeEnum
    {
        /// <summary>
        /// None.
        /// </summary>
        [EnumMember(Value = null)]
        None = 0,

        /// <summary>
        /// App dev blank Template
        /// </summary>
        [EnumMember(Value = "AppDev")]
        AppDev = 1,

        /// <summary>
        /// AppMigration.
        /// </summary>
        [EnumMember(Value = "AppMigration")]
        AppMigration = 2,

        /// <summary>
        /// CTS
        /// </summary>
        [EnumMember(Value = "CTS")]
        CTS = 4,

        /// <summary>
        /// D365.
        /// </summary>
        [EnumMember(Value = "D365")]
        D365 = 8,

        /// <summary>
        /// M365.
        /// </summary>
        [EnumMember(Value = "M365")]
        M365 = 16,
    }
}
