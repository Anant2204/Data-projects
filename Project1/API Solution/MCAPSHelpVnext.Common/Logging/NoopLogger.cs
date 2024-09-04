// <copyright file="NoopLogger.cs" company="Microsoft Corporation">
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
    using MCAPSHelpVnext.Common.Logging.Counters;
    using MCAPSHelpVnext.Common.Logging.Models;

    /// <summary>
    /// A No Op Logger implementation.
    /// </summary>
    /// <seealso cref="ILogger" />
    internal class NoopLogger : ILogger
    {
        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
        }

        /// <summary>
        /// Logs the message.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="message">The message to log.</param>
        /// <param name="properties">The additional properties to log.</param>
        /// <param name="metrics">The list of metrics to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogMessage(EventLevel level, string tagGuid, string message, IDictionary<string, string> properties, IDictionary<string, double> metrics, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the message.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="message">The message to log.</param>
        /// <param name="properties">The additional properties to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogMessage(EventLevel level, string tagGuid, string message, IDictionary<string, string> properties, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the message.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="message">The message to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogMessage(EventLevel level, string tagGuid, string message, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the exception.
        /// </summary>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="message">The message to log.</param>
        /// <param name="exception">The exception.</param>
        /// <param name="properties">The additional properties to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogException(string tagGuid, string message, Exception exception, IDictionary<string, string> properties, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the request.
        /// </summary>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="name">The request name.</param>
        /// <param name="method">The request method.</param>
        /// <param name="start">The start time for the request.</param>
        /// <param name="duration">The duration of the request.</param>
        /// <param name="responseCode">The response code.</param>
        /// <param name="success"><c>true</c> if the request is a success, <c>false</c> otherwise.</param>
        /// <param name="properties">The additional properties to log.</param>
        /// <param name="metrics">The list of metrics to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogRequest(string tagGuid, string name, string method, DateTimeOffset start, TimeSpan duration, string responseCode, bool success, IDictionary<string, string> properties, IDictionary<string, double> metrics, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the dependency.
        /// </summary>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="source">The source caller.</param>
        /// <param name="target">The target resource.</param>
        /// <param name="dependencyType">Type of the dependency.</param>
        /// <param name="data">The data to log.</param>
        /// <param name="start">The start time of the dependency call.</param>
        /// <param name="duration">The duration of the dependency entry.</param>
        /// <param name="resultCode">The result code.</param>
        /// <param name="success"><c>true</c> if the request is a success, <c>false</c> otherwise.</param>
        /// <param name="properties">The additional properties to log.</param>
        /// <param name="metrics">The list of metrics to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogDependency(string tagGuid, string source, string target, string dependencyType, string data, DateTimeOffset start, TimeSpan duration, string resultCode, bool success, IDictionary<string, string> properties, IDictionary<string, double> metrics, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the event data.
        /// </summary>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="eventName">Name of the event.</param>
        /// <param name="properties">The additional properties to log.</param>
        /// <param name="metrics">The list of metrics to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogEvent(string tagGuid, string eventName, IDictionary<string, string> properties, IDictionary<string, double> metrics, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the application audit messages.
        /// </summary>
        /// <param name="tagGuid">The tag unique identifier.</param>
        /// <param name="auditMandatoryProperties">The mandatory properties for audit.</param>
        /// <param name="auditOptionalProperties">The optional properties for audit.</param>
        /// <param name="properties">The additional properties to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogApplicationAudit(string tagGuid, AuditMandatoryProperties auditMandatoryProperties, AuditOptionalProperties auditOptionalProperties, IDictionary<string, string> properties, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the management audit messages.
        /// </summary>
        /// <param name="tagGuid">The tag unique identifier.</param>
        /// <param name="auditMandatoryProperties">The mandatory properties for audit.</param>
        /// <param name="auditOptionalProperties">The optional properties for audit.</param>
        /// <param name="properties">The additional properties to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogManagementAudit(string tagGuid, AuditMandatoryProperties auditMandatoryProperties, AuditOptionalProperties auditOptionalProperties, IDictionary<string, string> properties, string sourceFile = "", int sourceLine = 0, string member = "")
        {
        }

        /// <summary>
        /// Logs the metric.
        /// </summary>
        /// <param name="message">The message.</param>
        public void LogMetric(MetricMessage message)
        {
        }

        /// <summary>
        /// Adds the property.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        public void AddProperty(string name, string value)
        {
        }

        /// <summary>
        /// Sets the activity identifier.
        /// </summary>
        /// <param name="activityId">The activity identifier.</param>
        public void SetActivityId(string activityId)
        {
        }

        /// <summary>
        /// Gets the activity identifier.
        /// </summary>
        /// <returns>
        /// The activity identifier.
        /// </returns>
        public string GetActivityId()
        {
            return Guid.NewGuid().ToString();
        }

        /// <summary>
        /// Captures the source context.
        /// </summary>
        /// <param name="value">if set to <c>true</c> [value].</param>
        public void CaptureSourceContext(bool value)
        {
        }

        /// <summary>
        /// Flushes the counters.
        /// </summary>
        public void FlushCounters()
        {
        }

        /// <summary>
        /// Flushes this instance.
        /// </summary>
        public void Flush()
        {
        }

        /// <summary>
        /// Creates the counter with the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>
        /// The <see cref="Counter" />.
        /// </returns>
        public Counter CreateCounter(string name) => this.CreateCounter(name, null);

        /// <summary>
        /// Creates the counter with the specified name and initializes with the set of properties..
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="properties">The properties.</param>
        /// <returns>
        /// The <see cref="Counter" />.
        /// </returns>
        public Counter CreateCounter(string name, IDictionary<string, string> properties)
        {
            Counter counter = new Counter(name, properties);
            return counter;
        }

        /// <summary>
        /// Creates the rate counter with the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>
        /// The <see cref="Counter" />.
        /// </returns>
        public RateCounter CreateRateCounter(string name) => this.CreateRateCounter(name, null);

        /// <summary>
        /// Creates the rate counter with the specified name and initializes with the set of properties..
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="properties">The properties.</param>
        /// <returns>
        /// The <see cref="Counter" />.
        /// </returns>
        public RateCounter CreateRateCounter(string name, IDictionary<string, string> properties)
        {
            RateCounter counter = new RateCounter(name, properties);
            return counter;
        }

        /// <summary>
        /// Sets the user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        public void SetUserId(string userId)
        {
        }

        /// <summary>
        /// Gets the user identifier.
        /// </summary>
        /// <returns>The user identifier.</returns>
        public string GetUserId()
        {
            return string.Empty;
        }
    }
}