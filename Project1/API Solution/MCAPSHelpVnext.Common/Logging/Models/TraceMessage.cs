// <copyright file="TraceMessage.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Diagnostics.Tracing;
    using System.Runtime.Serialization;
    using System.Text.Json.Serialization;

    /// <summary>
    /// The Trace Message schema.
    /// </summary>
    /// <seealso cref="ITelemetryMessage" />
    [DataContract(Name = "TraceMessage", Namespace = "Azure")]
    public class TraceMessage : ITelemetryMessage
    {
        /// <summary>
        /// The message data.
        /// </summary>
        private readonly MessageData data;

        /// <summary>
        /// Initializes a new instance of the <see cref="TraceMessage"/> class.
        /// </summary>
        public TraceMessage()
        {
            this.data = new MessageData();
            this.Timestamp = DateTime.UtcNow;
            this.Properties = new ConcurrentDictionary<string, string>();
            this.Metrics = new ConcurrentDictionary<string, double>();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="TraceMessage"/> class.
        /// </summary>
        /// <param name="message">The message.</param>
        public TraceMessage(string message)
            : this()
        {
            this.Message = message;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="TraceMessage"/> class.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="level">The level.</param>
        public TraceMessage(string message, EventLevel level)
            : this(message)
        {
            this.Level = level;
        }

        /// <summary>
        /// Gets the name of the schema.
        /// </summary>
        /// <value>
        /// The name of the schema.
        /// </value>
        [JsonIgnore]
        public string SchemaName => "Traces";

        /// <summary>
        /// Gets or sets the message text. For example, the text that would normally be written to a log file Line.
        /// </summary>
        [DataMember]
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets date and time when event was recorded.
        /// </summary>
        [DataMember]
        public DateTimeOffset Timestamp { get; set; }

        /// <summary>
        /// Gets or sets the tag.
        /// </summary>
        /// <value>
        /// The tag.
        /// </value>
        [DataMember]
        public string Tag { get; set; }

        /// <summary>
        /// Gets or sets the activity identifier to track end to end tracing.
        /// </summary>
        /// <value>
        /// The activity identifier.
        /// </value>
        [DataMember]
        public string ActivityId { get; set; }

        /// <summary>
        /// Gets or sets the authenticated user id.
        /// </summary>
        /// <value>
        /// The user id.
        /// </value>
        [DataMember]
        public string UserId { get; set; }

        /// <summary>
        /// Gets or sets Trace severity level.
        /// </summary>
        [DataMember]
        public EventLevel Level { get; set; }

        /// <summary>
        /// Gets or sets the value that defines absolute order of the telemetry item.
        /// </summary>
        [DataMember]
        public string Sequence { get; set; }

        /// <summary>
        /// Gets a dictionary of application-defined property names and values providing additional information about this trace.
        /// </summary>
        [DataMember]
        public IDictionary<string, string> Properties { get; private set; }

        /// <summary>
        /// Gets the metrics.
        /// </summary>
        /// <value>
        /// The metrics.
        /// </value>
        [DataMember]
        public IDictionary<string, double> Metrics { get; private set; }

        /// <summary>
        /// Gets the log data.
        /// </summary>
        /// <returns>
        /// The <see cref="MessageData" />.
        /// </returns>
        public MessageData Data => this.data;

        /// <summary>
        /// Sanitizes this instance data.
        /// </summary>
        public void Sanitize()
        {
            this.Message = this.Message.SanitizeMessage();
            this.Tag = this.Tag.SanitizeName();
            this.ActivityId = this.ActivityId.SanitizeName();
            this.Properties.SanitizeProperties();
        }

        /// <summary>
        /// Formats the message for logging.
        /// </summary>
        public void FormatMessage()
        {
            this.Sanitize();
            this.data.Format(this);
        }
    }
}