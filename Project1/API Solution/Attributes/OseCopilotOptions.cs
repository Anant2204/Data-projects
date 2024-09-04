// <copyright file="OseCopilotOptions.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Api.Attributes
{
    /// <summary>
    /// The MSX Settings Options type.
    /// </summary>
    public class OseCopilotOptions
    {
        /// <summary>
        /// Gets or sets the Base Url of OSE Copilot End Point.
        /// </summary>
        public string EndPoint { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the OSE Copilot Key.
        /// </summary>
        public string Key { get; set; } = string.Empty;
    }
}
