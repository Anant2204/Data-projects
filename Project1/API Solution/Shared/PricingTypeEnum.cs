// <copyright file="PricingTypeEnum.cs" company="Microsoft Corporation">
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
    /// The supported Entity Types.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum PricingTypeEnum
    {
        /// <summary>
        /// Retail
        /// </summary>
        [EnumMember(Value = "Retail")]
        Retail = 0,

        /// <summary>
        /// AHR
        /// </summary>
        [EnumMember(Value = "AHR")]
        AHR = 1,

        /// <summary>
        /// EL
        /// </summary>
        [EnumMember(Value = "EL")]
        EL = 2,
    }
}
