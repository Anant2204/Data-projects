// <copyright file="AuditMessage.cs" company="Microsoft Corporation">
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
    /// The Audit <see cref="ITelemetryMessage"/>.
    /// </summary>
    /// <seealso cref="ITelemetryMessage" />
    [DataContract(Name = "AuditMessage", Namespace = "Azure")]
    public class AuditMessage : ITelemetryMessage
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AuditMessage"/> class.
        /// </summary>
        /// <param name="auditType">Type of the audit.</param>
        /// <param name="mandatoryProperties">The mandatory properties.</param>
        public AuditMessage(AuditType auditType, AuditMandatoryProperties mandatoryProperties)
            : this(auditType, mandatoryProperties, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AuditMessage"/> class.
        /// </summary>
        /// <param name="auditType">Type of the audit.</param>
        /// <param name="mandatoryProperties">The mandatory properties.</param>
        /// <param name="optionalProperties">The optional properties.</param>
        public AuditMessage(AuditType auditType, AuditMandatoryProperties mandatoryProperties, AuditOptionalProperties optionalProperties)
        {
            this.Data = new MessageData();
            this.Timestamp = DateTime.UtcNow;
            this.Properties = new ConcurrentDictionary<string, string>();
            this.AuditType = auditType;
            this.MandatoryProperties = mandatoryProperties;
            this.OptionalProperties = optionalProperties;
        }

        /// <summary>
        /// Gets the name of the schema.
        /// </summary>
        /// <value>
        /// The name of the schema.
        /// </value>
        [JsonIgnore]
        public string SchemaName => "Audits";

        /// <summary>
        /// Gets or sets the type of the audit.
        /// </summary>
        /// <value>
        /// The type of the audit.
        /// </value>
        [DataMember]
        public AuditType AuditType { get; set; }

        /// <summary>
        /// Gets the mandatory properties.
        /// </summary>
        /// <value>
        /// The mandatory properties.
        /// </value>
        [DataMember]
        public AuditMandatoryProperties MandatoryProperties { get; private set; }

        /// <summary>
        /// Gets the optional properties.
        /// </summary>
        /// <value>
        /// The optional properties.
        /// </value>
        [DataMember]
        public AuditOptionalProperties OptionalProperties { get; private set; }

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
            this.Properties.SanitizeProperties();

          
            if (this.OptionalProperties != null)
            {
                this.OptionalProperties.Sanitize();
            }
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