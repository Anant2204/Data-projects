// <copyright file="ITelemetryMessage.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.Tracing;
    using MCAPSHelpVnext.Common.Logging.Models;

    /// <summary>
    /// The telemetry message interface.
    /// </summary>
    public interface ITelemetryMessage
    {
        /// <summary>
        /// Gets or sets the timestamp.
        /// </summary>
        /// <value>
        /// The timestamp.
        /// </value>
        DateTimeOffset Timestamp { get; set; }

        /// <summary>
        /// Gets the properties.
        /// </summary>
        /// <value>
        /// The properties.
        /// </value>
        IDictionary<string, string> Properties { get; }

        /// <summary>
        /// Gets or sets the level.
        /// </summary>
        /// <value>
        /// The level.
        /// </value>
        EventLevel Level { get; set; }

        /// <summary>
        /// Gets the name of the schema.
        /// </summary>
        /// <value>
        /// The name of the schema.
        /// </value>
        string SchemaName { get; }

        /// <summary>
        /// Gets or sets the activity identifier to track end to end tracing.
        /// </summary>
        /// <value>
        /// The activity identifier.
        /// </value>
        string ActivityId { get; set; }

        /// <summary>
        /// Gets or sets the authenticated user id.
        /// </summary>
        /// <value>
        /// The user id.
        /// </value>
        string UserId { get; set; }

        /// <summary>
        /// Gets or sets the tag.
        /// </summary>
        /// <value>
        /// The tag.
        /// </value>
        string Tag { get; set; }

        /// <summary>
        /// Gets or sets the sequence.
        /// </summary>
        /// <value>
        /// The sequence.
        /// </value>
        string Sequence { get; set; }

        /// <summary>
        /// Gets the log data.
        /// </summary>
        /// <returns>The <see cref="MessageData"/>.</returns>
        MessageData Data { get; }

        /// <summary>
        /// Sanitizes this instance data.
        /// </summary>
        void Sanitize();

        /// <summary>
        /// Formats the message for logging.
        /// </summary>
        void FormatMessage();
    }
}