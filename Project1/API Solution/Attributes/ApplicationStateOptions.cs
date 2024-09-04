// <copyright file="ApplicationStateOptions.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Api.Attributes
{
    /// <summary>
    /// The application state options type.
    /// </summary>
    public class ApplicationStateOptions
    {
        /// <summary>
        /// gets or sets a value indicating whether the consumption estimate needs to be synced with OSE as scheduled.
        /// </summary>
        public bool RealTimeSync { get; set; }

        /// <summary>
        /// gets or sets a value indicating whether the request and response needs to be logged.
        /// </summary>
        public bool LogRequestResponse { get; set; }
    }
}
