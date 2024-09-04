// <copyright file="EventHubSettings.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    /// <summary>
    /// The configuration settings for EventHub producer.
    /// </summary>
    public class EventHubSettings
    {
        /// <summary>
        /// Gets or sets the primary connection string.
        /// </summary>
        /// <value>
        /// The primary connection string.
        /// </value>
        public string PrimaryConnectionString { get; set; }

        /// <summary>
        /// Gets or sets the secondary connection string.
        /// </summary>
        /// <value>
        /// The secondary connection string.
        /// </value>
        public string SecondaryConnectionString { get; set; }

        /// <summary>
        /// Gets or sets the name of the event hub.
        /// </summary>
        /// <value>
        /// The name of the event hub.
        /// </value>
        public string EventHubName { get; set; }
    }
}