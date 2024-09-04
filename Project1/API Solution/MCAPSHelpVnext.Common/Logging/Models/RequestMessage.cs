// <copyright file="RequestMessage.cs" company="Microsoft Corporation">
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
    /// The Request Message schema.
    /// </summary>
    /// <seealso cref="ITelemetryMessage" />
    [DataContract(Name = "RequestMessage", Namespace = "Azure")]
    public class RequestMessage : ITelemetryMessage
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RequestMessage"/> class.
        /// </summary>
        public RequestMessage()
        {
            this.Data = new MessageData();
            this.Timestamp = DateTime.UtcNow;
            this.Properties = new ConcurrentDictionary<string, string>();
            this.Metrics = new ConcurrentDictionary<string, double>();
        }

        /// <summary>
        /// Gets the name of the schema.
        /// </summary>
        /// <value>
        /// The name of the schema.
        /// </value>
        [JsonIgnore]
        public string SchemaName => "Requests";

        /// <summary>
        /// Gets or sets the start time.
        /// </summary>
        /// <value>
        /// The start time.
        /// </value>
        [DataMember]
        public DateTimeOffset StartTime { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the method.
        /// </summary>
        /// <value>
        /// The method.
        /// </value>
        [DataMember]
        public string Method { get; set; }

        /// <summary>
        /// Gets or sets the duration.
        /// </summary>
        /// <value>
        /// The duration.
        /// </value>
        [DataMember]
        public TimeSpan Duration { get; set; }

        /// <summary>
        /// Gets or sets the response code.
        /// </summary>
        /// <value>
        /// The response code.
        /// </value>
        [DataMember]
        public string ResponseCode { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is success.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this request instance is success; otherwise, <c>false</c>.
        /// </value>
        [DataMember]
        public bool IsSuccess { get; set; }

        /// <summary>
        /// Gets or sets the metrics.
        /// </summary>
        /// <value>
        /// The metrics.
        /// </value>
        [DataMember]
        public IDictionary<string, double> Metrics { get; set; }

        /// <summary>
        /// Gets or sets the timestamp.
        /// </summary>
        /// <value>
        /// The timestamp.
        /// </value>
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
        /// Gets or sets the level.
        /// </summary>
        /// <value>
        /// The level.
        /// </value>
        [DataMember]
        public EventLevel Level { get; set; }

        /// <summary>
        /// Gets or sets the sequence.
        /// </summary>
        /// <value>
        /// The sequence.
        /// </value>
        [DataMember]
        public string Sequence { get; set; }

        /// <summary>
        /// Gets the properties.
        /// </summary>
        /// <value>
        /// The properties.
        /// </value>
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
            this.Name = this.Name.SanitizeData();
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
            this.Data.Format(this);
        }
    }
}