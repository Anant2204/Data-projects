// <copyright file="TemplateTypeEnum.cs" company="Microsoft Corporation">
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
    /// The supported template types.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum TemplateTypeEnum
    {
        /// <summary>
        /// Managed templates
        /// </summary>
        [EnumMember(Value = "Managed")]
        Managed = 0,

        /// <summary>
        /// Community managed templates.
        /// </summary>
        [EnumMember(Value = "Community")]
        Community = 1,
    }
}
