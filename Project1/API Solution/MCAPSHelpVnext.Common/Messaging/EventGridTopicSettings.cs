// <copyright file="EventGridTopicSettings.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System;

    /// <summary>
    /// The settings option to connect to Event Grid topic.
    /// </summary>
    public class EventGridTopicSettings
    {
        /// <summary>
        /// Gets or sets the topic endpoint.
        /// </summary>
        /// <value>
        /// The event grid topic endpoint.
        /// </value>
        public Uri TopicEndPoint { get; set; }

        /// <summary>
        /// Gets or sets the SAS key identifier 1.
        /// </summary>
        /// <value>
        /// The SAS key.
        /// </value>
        public string SasKey1 { get; set; }

        /// <summary>
        /// Gets or sets the SAS key identifier 2.
        /// </summary>
        /// <value>
        /// The SAS key.
        /// </value>
        public string SasKey2 { get; set; }

        /// <summary>
        /// Gets or sets the timeout configuration for Post message.
        /// </summary>
        /// <value>Timeout in milliseconds.</value>
        public int TimeoutInMilliseconds { get; set; }
    }
}