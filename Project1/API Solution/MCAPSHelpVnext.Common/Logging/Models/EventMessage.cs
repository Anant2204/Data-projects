// <copyright file="EventMessage.cs" company="Microsoft Corporation">
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
    /// The Event Message schema.
    /// </summary>
    /// <seealso cref="ITelemetryMessage" />
    [DataContract(Name = "EventMessage", Namespace = "Azure")]
    public class EventMessage : ITelemetryMessage
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="EventMessage"/> class.
        /// </summary>
        public EventMessage()
        {
            this.Data = new MessageData();
            this.Timestamp = DateTime.UtcNow;
            this.Properties = new ConcurrentDictionary<string, string>();
            this.Metrics = new ConcurrentDictionary<string, double>();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="EventMessage"/> class.
        /// </summary>
        /// <param name="eventName">Name of the event.</param>
        public EventMessage(string eventName)
            : this()
        {
            this.Name = eventName;
            this.Timestamp = DateTime.UtcNow;
            this.Properties = new ConcurrentDictionary<string, string>();
            this.Metrics = new ConcurrentDictionary<string, double>();
        }

        /// <summary>
        /// Gets or sets the message text. For example, the text that would normally be written to a log file Line.
        /// </summary>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Gets the dictionary of application defined metrics.
        /// </summary>
        [DataMember]
        public IDictionary<string, double> Metrics { get; private set; }

        /// <summary>
        /// Gets or sets date and time when event was recorded.
        /// </summary>
        [DataMember]
        public DateTimeOffset Timestamp { get; set; }

        /// <summary>
        /// Gets the name of the schema.
        /// </summary>
        /// <value>
        /// The name of the schema.
        /// </value>
        [JsonIgnore]
        public string SchemaName => "Events";

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
        /// Gets or sets the level.
        /// </summary>
        /// <value>
        /// The level.
        /// </value>
        [DataMember]
        public EventLevel Level { get; set; }

        /// <summary>
        /// Gets or sets the value that defines absolute order of the telemetry item.
        /// </summary>
        [DataMember]
        public string Sequence { get; set; }

        /// <summary>
        /// Gets the dictionary of application-defined property names and values providing additional information about this trace.
        /// </summary>
        [DataMember]
        public IDictionary<string, string> Properties { get; private set; }

        /// <summary>
        /// Gets the log data.
        /// </summary>
        public MessageData Data { get; }

        /// <summary>
        /// Sanitizes this instance data.
        /// </summary>
        public void Sanitize()
        {
            this.Properties.SanitizeProperties();
        }

        /// <summary>
        /// Formats the message for logging.
        /// </summary>
        public void FormatMessage()
        {
            this.Sanitize();
            this.Data.Format(this);
        }
    }
}