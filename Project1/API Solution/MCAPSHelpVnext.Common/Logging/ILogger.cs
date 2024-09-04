// <copyright file="ILogger.cs" company="Microsoft Corporation">
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
    using System.Runtime.CompilerServices;
    using MCAPSHelpVnext.Common.Logging.Counters;
    using MCAPSHelpVnext.Common.Logging.Models;

    /// <summary>
    /// The base Logger definition.
    /// </summary>
    /// <seealso cref="System.IDisposable" />
    public interface ILogger : IDisposable
    {
        /// <summary>
        /// Logs the message.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="message">The message to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        void LogMessage(EventLevel level, string tagGuid, string message, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

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
        void LogMessage(EventLevel level, string tagGuid, string message, IDictionary<string, string> properties, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

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
        void LogMessage(EventLevel level, string tagGuid, string message, IDictionary<string, string> properties, IDictionary<string, double> metrics, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

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
        void LogException(string tagGuid, string message, Exception exception, IDictionary<string, string> properties, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

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
        void LogRequest(string tagGuid, string name, string method, DateTimeOffset start, TimeSpan duration, string responseCode, bool success, IDictionary<string, string> properties, IDictionary<string, double> metrics, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

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
        void LogDependency(string tagGuid, string source, string target, string dependencyType, string data, DateTimeOffset start, TimeSpan duration, string resultCode, bool success, IDictionary<string, string> properties, IDictionary<string, double> metrics, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

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
        void LogEvent(string tagGuid, string eventName, IDictionary<string, string> properties, IDictionary<string, double> metrics, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

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
        void LogApplicationAudit(string tagGuid, AuditMandatoryProperties auditMandatoryProperties, AuditOptionalProperties auditOptionalProperties, IDictionary<string, string> properties, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

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
        void LogManagementAudit(string tagGuid, AuditMandatoryProperties auditMandatoryProperties, AuditOptionalProperties auditOptionalProperties, IDictionary<string, string> properties, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "");

        /// <summary>
        /// Logs the metric.
        /// </summary>
        /// <param name="message">The message.</param>
        void LogMetric(MetricMessage message);

        /// <summary>
        /// Adds the property.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        void AddProperty(string name, string value);

        /// <summary>
        /// Sets the activity identifier.
        /// </summary>
        /// <param name="activityId">The activity identifier.</param>
        void SetActivityId(string activityId);

        /// <summary>
        /// Gets the activity identifier.
        /// </summary>
        /// <returns>The activity identifier.</returns>
        string GetActivityId();

        /// <summary>
        /// Sets the user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        void SetUserId(string userId);

        /// <summary>
        /// Gets the user identifier.
        /// </summary>
        /// <returns>The user identifier.</returns>
        string GetUserId();

        /// <summary>
        /// Captures the source context.
        /// </summary>
        /// <param name="value">if set to <c>true</c> [value].</param>
        void CaptureSourceContext(bool value);

        /// <summary>
        /// Flushes the counters.
        /// </summary>
        void FlushCounters();

        /// <summary>
        /// Flushes this instance.
        /// </summary>
        void Flush();

        /// <summary>
        /// Creates the counter with the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>The <see cref="Counter"/>.</returns>
        Counter CreateCounter(string name);

        /// <summary>
        /// Creates the counter with the specified name and initializes with the set of properties..
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="properties">The properties.</param>
        /// <returns>The <see cref="Counter"/>.</returns>
        Counter CreateCounter(string name, IDictionary<string, string> properties);

        /// <summary>
        /// Creates the rate counter with the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>The <see cref="Counter"/>.</returns>
        RateCounter CreateRateCounter(string name);

        /// <summary>
        /// Creates the rate counter with the specified name and initializes with the set of properties..
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="properties">The properties.</param>
        /// <returns>The <see cref="Counter"/>.</returns>
        RateCounter CreateRateCounter(string name, IDictionary<string, string> properties);
    }
}