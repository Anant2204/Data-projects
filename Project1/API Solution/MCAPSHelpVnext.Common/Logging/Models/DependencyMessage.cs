// <copyright file="DependencyMessage.cs" company="Microsoft Corporation">
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
    /// The Dependency Message schema.
    /// </summary>
    /// <seealso cref="ITelemetryMessage" />
    [DataContract(Name = "DependencyMessage", Namespace = "Azure")]
    public class DependencyMessage : ITelemetryMessage
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DependencyMessage"/> class.
        /// </summary>
        public DependencyMessage()
        {
            this.Data = new MessageData();
            this.Timestamp = DateTime.UtcNow;
            this.Properties = new ConcurrentDictionary<string, string>();
            this.Metrics = new ConcurrentDictionary<string, double>();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="DependencyMessage"/> class.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="target">The target.</param>
        /// <param name="dependencyType">Type of the dependency.</param>
        /// <param name="dependencyName">Name of the dependency.</param>
        /// <param name="data">The data.</param>
        /// <param name="startTime">The start time.</param>
        /// <param name="duration">The duration.</param>
        /// <param name="resultCode">The result code.</param>
        /// <param name="success"><c>true</c> if the dependency call was a success, <c>false</c> otherwise.</param>
        public DependencyMessage(string source, string target, string dependencyType, string dependencyName, string data, DateTimeOffset startTime, TimeSpan duration, string resultCode, bool success)
            : this()
        {
            this.Source = source;
            this.Target = target;
            this.Type = dependencyType;
            this.Name = dependencyName;
            this.DependencyData = data;
            this.StartTime = startTime;
            this.Duration = duration;
            this.ResultCode = resultCode;
            this.Success = success;
        }

        /// <summary>
        /// Gets the name of the schema.
        /// </summary>
        /// <value>
        /// The name of the schema.
        /// </value>
        [JsonIgnore]
        public string SchemaName => "Dependencies";

        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        /// <value>
        /// The type.
        /// </value>
        [DataMember]
        public string Type { get; set; }

        /// <summary>
        /// Gets or sets the dependency data.
        /// </summary>
        /// <value>
        /// The dependency data.
        /// </value>
        [DataMember]
        public string DependencyData { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="DependencyMessage"/> is success.
        /// </summary>
        /// <value>
        ///   <c>true</c> if success; otherwise, <c>false</c>.
        /// </value>
        [DataMember]
        public bool Success { get; set; }

        /// <summary>
        /// Gets or sets the result code.
        /// </summary>
        /// <value>
        /// The result code.
        /// </value>
        [DataMember]
        public string ResultCode { get; set; }

        /// <summary>
        /// Gets or sets the start time.
        /// </summary>
        /// <value>
        /// The start time.
        /// </value>
        [DataMember]
        public DateTimeOffset StartTime { get; set; }

        /// <summary>
        /// Gets or sets the duration.
        /// </summary>
        /// <value>
        /// The duration.
        /// </value>
        [DataMember]
        public TimeSpan Duration { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the target.
        /// </summary>
        /// <value>
        /// The target.
        /// </value>
        [DataMember]
        public string Target { get; set; }

        /// <summary>
        /// Gets or sets the source.
        /// </summary>
        /// <value>
        /// The source.
        /// </value>
        [DataMember]
        public string Source { get; set; }

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
        /// Gets or sets the properties.
        /// </summary>
        /// <value>
        /// The properties.
        /// </value>
        [DataMember]
        public IDictionary<string, string> Properties { get; set; }

        /// <summary>
        /// Gets the log data.
        /// </summary>
        /// <returns>
        /// The <see cref="MessageData" />.
        /// </returns>
        public MessageData Data { get; }

        /// <summary>
        /// Sanitizes this instance data.
        /// </summary>
        public void Sanitize()
        {
            this.Name = this.Name.SanitizeName();
            this.ResultCode = this.ResultCode.SanitizeResultCode();
            this.Source = this.Source.SanitizeDependencyType();
            this.DependencyData = this.DependencyData.SanitizeData();
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