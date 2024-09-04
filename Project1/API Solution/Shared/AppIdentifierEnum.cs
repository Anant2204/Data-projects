// <copyright file="AppIdentifierEnum.cs" company="Microsoft Corporation">
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
    /// The Msx Entity Types.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum AppIdentifierEnum
    {
        /// <summary>
        /// Compass One application.
        /// </summary>
        [EnumMember(Value = "CompassOne")]
        CompassOne = 0,

        /// <summary>
        /// MSX application.
        /// </summary>
        [EnumMember(Value = "MSX")]
        MSX = 1,
    }
}
