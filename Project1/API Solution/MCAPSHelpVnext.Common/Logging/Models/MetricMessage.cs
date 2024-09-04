// <copyright file="MetricMessage.cs" company="Microsoft Corporation">
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
    using MCAPSHelpVnext.Common.Logging.Counters;

    /// <summary>
    /// The Metric Message model.
    /// </summary>
    /// <seealso cref="ITelemetryMessage" />
    [DataContract(Name = "MetricMessage", Namespace = "Azure")]
    public class MetricMessage : ITelemetryMessage
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MetricMessage"/> class.
        /// </summary>
        public MetricMessage()
        {
            this.Data = new MessageData();
            this.Timestamp = DateTime.UtcNow;
            this.Properties = new ConcurrentDictionary<string, string>();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MetricMessage"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The initialization value.</param>
        public MetricMessage(string name, double value)
            : this()
        {
            this.Name = name;
            this.Count = 1;
            this.Sum = value;
            this.Min = value;
            this.Max = value;
            this.StandardDeviation = 0;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MetricMessage"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The <see cref="MetricAggregator"/>.</param>
        internal MetricMessage(string name, MetricAggregator value)
            : this()
        {
            this.Name = name;
            this.Count = value.Count;
            this.Sum = value.Sum;
            this.Min = value.Min;
            this.Max = value.Max;
            this.StandardDeviation = value.StandardDeviation;
        }

        /// <summary>
        /// Gets the name of the schema.
        /// </summary>
        /// <value>
        /// The name of the schema.
        /// </value>
        [JsonIgnore]
        public string SchemaName => "Metrics";

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the count.
        /// </summary>
        /// <value>
        /// The count.
        /// </value>
        [DataMember]
        public int Count { get; set; }

        /// <summary>
        /// Gets or sets the sum.
        /// </summary>
        /// <value>
        /// The sum.
        /// </value>
        [DataMember]
        public double Sum { get; set; }

        /// <summary>
        /// Gets or sets the minimum value.
        /// </summary>
        /// <value>
        /// The minimum.
        /// </value>
        [DataMember]
        public double Min { get; set; }

        /// <summary>
        /// Gets or sets the maximum value.
        /// </summary>
        /// <value>
        /// The maximum.
        /// </value>
        [DataMember]
        public double Max { get; set; }

        /// <summary>
        /// Gets or sets the standard deviation.
        /// </summary>
        /// <value>
        /// The standard deviation.
        /// </value>
        [DataMember]
        public double StandardDeviation { get; set; }

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