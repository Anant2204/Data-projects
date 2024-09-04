// <copyright file="EventSourceLogger.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Diagnostics.CodeAnalysis;
    using System.Diagnostics.Tracing;
    using System.Globalization;
    using System.IO;
    using System.Runtime.CompilerServices;
    using System.Threading.Tasks;
    using MCAPSHelpVnext.Common.Helpers;
    using MCAPSHelpVnext.Common.Logging.Counters;
    using MCAPSHelpVnext.Common.Logging.Models;
    using Microsoft.ApplicationInsights;
    using Microsoft.Identity.Client;
    using Validation;

    /// <summary>
    /// The Event Source logger.
    /// </summary>
    /// <seealso cref="ILogger" />
    public class EventSourceLogger : ILogger
    {
        private const int intActivityIDs = 0x55;

        /// <summary>
        /// The counter collector.
        /// </summary>
        private readonly CounterCollector counterCollector;

        /// <summary>
        /// The logger properties.
        /// </summary>
        private readonly ConcurrentDictionary<string, string> loggerProperties;

        /// <summary>
        /// The performance counter collection.
        /// </summary>
        private readonly List<CounterBase> perfCounterCollection = new List<CounterBase>();

        /// <summary>
        /// The trace level.
        /// </summary>
        private readonly int traceLevel;

        /// <summary>
        /// The log writers.
        /// </summary>
        private readonly IList<ILogWriter> logWriters;

        /// <summary>
        /// The log source context.
        /// </summary>
        private bool logSourceContext = false;

        /// <summary>
        /// The disposed value.
        /// </summary>
        private bool disposed = false;

        /// <summary>
        /// Initializes static members of the <see cref="EventSourceLogger"/> class.
        /// </summary>
        /// <remarks>
        /// A workaround for the problem where ETW activities do not get tracked until Tasks infrastructure is initialized.
        /// </remarks>
        static EventSourceLogger()
        {
            Task.Run(() => { });
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="EventSourceLogger"/> class.
        /// </summary>
        /// <param name="sourceName">Event Source Name.</param>
        /// <param name="contextName">Unique Context Name for this instance of the event source.</param>
        /// <param name="traceLevel">Only send logs with the level or below to monitoring agent.</param>
        internal EventSourceLogger(string sourceName, string contextName, TraceLevel traceLevel)
            : this(sourceName, contextName, traceLevel, new[] { new EtwLogWriter(sourceName) })
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="EventSourceLogger"/> class.
        /// </summary>
        /// <param name="sourceName">Name of the source.</param>
        /// <param name="contextName">Name of the context.</param>
        /// <param name="traceLevel">The trace level.</param>
        /// <param name="writers">The writers.</param>
        internal EventSourceLogger(string sourceName, string contextName, TraceLevel traceLevel, IList<ILogWriter> writers)
        {
            Requires.NotNullOrWhiteSpace(sourceName, nameof(sourceName));
            Requires.NotNullOrWhiteSpace(contextName, nameof(contextName));
            Requires.NotNull(writers, nameof(writers));

            this.logWriters = writers;
            this.loggerProperties = new ConcurrentDictionary<string, string>();
            this.AddProperty("sourceName", sourceName);
            this.AddProperty("contextName", contextName);
            this.counterCollector = new CounterCollector(this, this.perfCounterCollection, TimeSpan.FromSeconds(30));

            this.traceLevel = (int)traceLevel + 1;
            this.logSourceContext = false;
        }

        /// <summary>
        /// The KeyWords for logging.
        /// </summary>
        [Flags]
        public enum KeyWords
        {
            /// <summary>
            /// The trace.
            /// </summary>
            Trace = 2,

            /// <summary>
            /// The exception.
            /// </summary>
            Exception = 4,

            /// <summary>
            /// The request.
            /// </summary>
            Request = 8,

            /// <summary>
            /// The metric.
            /// </summary>
            Metric = 16,

            /// <summary>
            /// The event.
            /// </summary>
            Event = 32,

            /// <summary>
            /// The dependency.
            /// </summary>
            Dependency = 64,

            /// <summary>
            /// The audit.
            /// </summary>
            Audit = 128,
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Captures the source context.
        /// </summary>
        /// <param name="value">Set log source context.</param>
        public void CaptureSourceContext(bool value) => this.logSourceContext = value;

        /// <summary>
        /// Adds the property.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        public void AddProperty(string name, string value) => this.loggerProperties[name] = value;

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
        public void LogException(string tagGuid, string message, Exception exception, IDictionary<string, string> properties, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
        {
            Requires.NotNullOrWhiteSpace(tagGuid, nameof(tagGuid));

            ExceptionMessage exceptionMessage = new ExceptionMessage(exception);
            exceptionMessage.Level = EventLevel.Error;
            exceptionMessage.UserMessage = message;
            exceptionMessage.Tag = tagGuid;
            this.AddCallProperties(exceptionMessage, sourceFile, sourceLine, member);
           

            foreach (KeyValuePair<string, string> item in this.loggerProperties)
            {
                exceptionMessage.Properties[item.Key] = item.Value;
            }

            if (properties != null && properties.Count > 0)
            {
                foreach (KeyValuePair<string, string> item in properties)
                {
                    exceptionMessage.Properties[item.Key] = item.Value;
                }
            }

            this.Process(exceptionMessage, KeyWords.Exception);
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
        public void LogMessage(EventLevel level, string tagGuid, string message, IDictionary<string, string> properties, IDictionary<string, double> metrics, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
        {
            Requires.NotNullOrWhiteSpace(tagGuid, nameof(tagGuid));

            var traceMessage = new TraceMessage(message, level);
            traceMessage.Tag = tagGuid;
            this.AddCallProperties(traceMessage, sourceFile, sourceLine, member);
          

            foreach (KeyValuePair<string, string> item in this.loggerProperties)
            {
                traceMessage.Properties[item.Key] = item.Value;
            }

            if (properties != null && properties.Count > 0)
            {
                foreach (KeyValuePair<string, string> item in properties)
                {
                    traceMessage.Properties[item.Key] = item.Value;
                }
            }

            if (metrics != null && metrics.Count > 0)
            {
                foreach (KeyValuePair<string, double> item in metrics)
                {
                    traceMessage.Metrics[item.Key] = item.Value;
                }
            }

            this.Process(traceMessage, KeyWords.Trace);
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
        public void LogMessage(EventLevel level, string tagGuid, string message, IDictionary<string, string> properties, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
            => this.LogMessage(level, tagGuid, message, properties, new Dictionary<string, double>(), sourceFile, sourceLine, member);

        /// <summary>
        /// Logs the message.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <param name="tagGuid">The unique identifier for tagging.</param>
        /// <param name="message">The message to log.</param>
        /// <param name="sourceFile">The caller file path.</param>
        /// <param name="sourceLine">The caller line number.</param>
        /// <param name="member">The caller member.</param>
        public void LogMessage(EventLevel level, string tagGuid, string message, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
            => this.LogMessage(level, tagGuid, message, new Dictionary<string, string>(), new Dictionary<string, double>(), sourceFile, sourceLine, member);

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
        public void LogRequest(string tagGuid, string name, string method, DateTimeOffset start, TimeSpan duration, string responseCode, bool success, IDictionary<string, string> properties, IDictionary<string, double> metrics, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
        {
            Requires.NotNullOrWhiteSpace(tagGuid, nameof(tagGuid));

            RequestMessage message = new RequestMessage();
            message.Tag = tagGuid;
            message.Level = EventLevel.Informational;
            message.Timestamp = DateTime.UtcNow;
            message.StartTime = start;
            message.Name = name;
            message.Method = method;
            message.Duration = duration;
            message.ResponseCode = responseCode;
            message.IsSuccess = success;
            this.AddCallProperties(message, sourceFile, sourceLine, member);

          

            foreach (KeyValuePair<string, string> item in this.loggerProperties)
            {
                message.Properties[item.Key] = item.Value;
            }

            if (properties != null && properties.Count > 0)
            {
                foreach (KeyValuePair<string, string> item in properties)
                {
                    message.Properties[item.Key] = item.Value;
                }
            }

            if (metrics != null && metrics.Count > 0)
            {
                foreach (KeyValuePair<string, double> item in metrics)
                {
                    message.Metrics[item.Key] = item.Value;
                }
            }

            this.Process(message, KeyWords.Request);
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
        public void LogDependency(string tagGuid, string source, string target, string dependencyType, string data, DateTimeOffset start, TimeSpan duration, string resultCode, bool success, IDictionary<string, string> properties, IDictionary<string, double> metrics, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
        {
            Requires.NotNullOrWhiteSpace(tagGuid, nameof(tagGuid));

            DependencyMessage message = new DependencyMessage();
            message.Tag = tagGuid;
            message.Level = EventLevel.Informational;
            message.Timestamp = start;
            this.AddCallProperties(message, sourceFile, sourceLine, member);

            source = UpdateSourceIfLoggerProperties(source);

            message.Source = source;
            message.Type = dependencyType;
            message.DependencyData = data;
            message.Target = target;
            message.StartTime = start;
            message.Duration = duration;
            message.ResultCode = resultCode;
            message.Success = success;

            AddPropertiesToMessage(message, properties);
            AddMetricsToMessage(message, metrics);

            this.Process(message, KeyWords.Dependency);
        }

        /// <summary>
        /// UpdateSourceIfLoggerProperties(string source)
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        private string UpdateSourceIfLoggerProperties(string source)
        {
            if (source == "LOGGER_PROPERTIES")
            {
                if (this.loggerProperties.ContainsKey("DependencyName"))
                {
                    source = this.loggerProperties["DependencyName"];
                }
                else 
                {
                    if (this.loggerProperties.ContainsKey("ServiceName"))
                    {
                        source = this.loggerProperties["ServiceName"];
                    }                        
                }
            }

            return source;
        }

        /// <summary>
        /// AddPropertiesToMessage(DependencyMessage message, IDictionary<string, string> properties)
        /// </summary>
        /// <param name="message"></param>
        /// <param name="properties"></param>
        private void AddPropertiesToMessage(DependencyMessage message, IDictionary<string, string> properties)
        {
            foreach (KeyValuePair<string, string> item in this.loggerProperties)
            {
                message.Properties[item.Key] = item.Value;
            }

            if (properties != null && properties.Count > 0)
            {
                foreach (KeyValuePair<string, string> item in properties)
                {
                    message.Properties[item.Key] = item.Value;
                }
            }
        }

        /// <summary>
        /// AddMetricsToMessage(DependencyMessage message, IDictionary<string, double> metrics)
        /// </summary>
        /// <param name="message"></param>
        /// <param name="metrics"></param>
        private void AddMetricsToMessage(DependencyMessage message, IDictionary<string, double> metrics)
        {
            if (metrics != null && metrics.Count > 0)
            {
                foreach (KeyValuePair<string, double> item in metrics)
                {
                    message.Metrics[item.Key] = item.Value;
                }
            }
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
        public void LogEvent(string tagGuid, string eventName, IDictionary<string, string> properties, IDictionary<string, double> metrics, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
        {
            Requires.NotNullOrWhiteSpace(tagGuid, nameof(tagGuid));

            EventMessage traceMessage = new EventMessage(eventName);
            traceMessage.Tag = tagGuid;
            traceMessage.Level = EventLevel.LogAlways;
            this.AddCallProperties(traceMessage, sourceFile, sourceLine, member);
          

            foreach (KeyValuePair<string, string> item in this.loggerProperties)
            {
                traceMessage.Properties[item.Key] = item.Value;
            }

            if (metrics != null && metrics.Count > 0)
            {
                foreach (KeyValuePair<string, double> item in metrics)
                {
                    traceMessage.Metrics[item.Key] = item.Value;
                }
            }

            if (properties != null && properties.Count > 0)
            {
                foreach (KeyValuePair<string, string> item in properties)
                {
                    traceMessage.Properties[item.Key] = item.Value;
                }
            }

            this.Process(traceMessage, KeyWords.Event);
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
        public void LogApplicationAudit(string tagGuid, AuditMandatoryProperties auditMandatoryProperties, AuditOptionalProperties auditOptionalProperties, IDictionary<string, string> properties, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
        {
            Requires.NotNullOrWhiteSpace(tagGuid, nameof(tagGuid));
            Requires.NotNull(auditMandatoryProperties, nameof(auditMandatoryProperties));

            AuditMessage message = new AuditMessage(AuditType.Application, auditMandatoryProperties, auditOptionalProperties);
            message.Tag = tagGuid;
            message.Level = EventLevel.LogAlways;
            this.AddCallProperties(message, sourceFile, sourceLine, member);
           

            foreach (KeyValuePair<string, string> item in this.loggerProperties)
            {
                message.Properties[item.Key] = item.Value;
            }

            if (properties != null && properties.Count > 0)
            {
                foreach (KeyValuePair<string, string> item in properties)
                {
                    message.Properties[item.Key] = item.Value;
                }
            }

            this.Process(message, KeyWords.Audit);
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
        public void LogManagementAudit(string tagGuid, AuditMandatoryProperties auditMandatoryProperties, AuditOptionalProperties auditOptionalProperties, IDictionary<string, string> properties, [CallerFilePath] string sourceFile = "", [CallerLineNumber] int sourceLine = 0, [CallerMemberName] string member = "")
        {
            Requires.NotNullOrWhiteSpace(tagGuid, nameof(tagGuid));
            Requires.NotNull(auditMandatoryProperties, nameof(auditMandatoryProperties));

            AuditMessage message = new AuditMessage(AuditType.Application, auditMandatoryProperties, auditOptionalProperties);
            message.Tag = tagGuid;
            message.Level = EventLevel.LogAlways;
            this.AddCallProperties(message, sourceFile, sourceLine, member);
           

            foreach (KeyValuePair<string, string> item in this.loggerProperties)
            {
                message.Properties[item.Key] = item.Value;
            }

            if (properties != null && properties.Count > 0)
            {
                foreach (KeyValuePair<string, string> item in properties)
                {
                    message.Properties[item.Key] = item.Value;
                }
            }

            this.Process(message, KeyWords.Audit);
        }

        /// <summary>
        /// Logs the metric.
        /// </summary>
        /// <param name="message">The message.</param>
        public void LogMetric(MetricMessage message)
        {
            Requires.NotNull(message, nameof(message));
            message.Level = EventLevel.LogAlways;
            foreach (KeyValuePair<string, string> item in this.loggerProperties)
            {
                message.Properties[item.Key] = item.Value;
            }

            this.Process(message, KeyWords.Metric);
        }

        /// <summary>
        /// Sets the activity identifier.
        /// </summary>
        /// <param name="activityId">The activity identifier.</param>
        public void SetActivityId(string activityId)
        {
            Requires.NotNullOrWhiteSpace(activityId, nameof(activityId));
            CallContext.SetData(Constants.ActivityIdHeader, activityId);
        }

        /// <summary>
        /// Sets the user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        public void SetUserId(string userId)
        {
            CallContext.SetData(Constants.UserId, userId);
        }

        /// <summary>
        /// Gets the activity identifier.
        /// </summary>
        /// <returns>
        /// The activity identifier.
        /// </returns>
        public string GetActivityId() => (string)CallContext.GetData(Constants.ActivityIdHeader);

        /// <summary>
        /// Gets the authenticated user identifier.
        /// </summary>
        /// <returns>
        /// The user identifier.
        /// </returns>
        public string GetUserId() => (string)CallContext.GetData(Constants.UserId);

        /// <summary>
        /// Flushes the counters.
        /// </summary>
        public void FlushCounters() => this.counterCollector.FlushCounters();

        /// <summary>
        /// Flushes this instance.
        /// </summary>
        public void Flush()
        {
            this.counterCollector.FlushCounters();
            foreach (ILogWriter writer in this.logWriters)
            {
                writer.Flush();
            }
        }

        /// <summary>
        /// Creates the counter with the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>
        /// The <see cref="Counter" />.
        /// </returns>
        public Counter CreateCounter(string name) => this.CreateCounter(name, new Dictionary<string, string>());

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
            this.perfCounterCollection.Add(counter);
            return counter;
        }

        /// <summary>
        /// Creates the rate counter with the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>
        /// The <see cref="Counter" />.
        /// </returns>
        public RateCounter CreateRateCounter(string name) => this.CreateRateCounter(name, new Dictionary<string, string>());

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
            var counter = new RateCounter(name, properties);
            this.perfCounterCollection.Add(counter);
            return counter;
        }

        

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> if called from dispose flow.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (this.disposed)
            {
                return;
            }

            if (disposing)
            {
                foreach (ILogWriter writer in this.logWriters)
                {
                    writer?.Flush();
                    writer?.Dispose();
                }

                this.counterCollector?.Dispose();
            }

            this.disposed = true;
        }


        /// <summary>
        /// Adds the call properties.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="sourceFile">The source file.</param>
        /// <param name="sourceLine">The source line.</param>
        /// <param name="member">The member.</param>
        private void AddCallProperties(ITelemetryMessage message, string sourceFile, int sourceLine, string member)
        {            

            string activityId = this.GetActivityId();
            string userId = this.GetUserId();
            const int int1 = 1;
            const int int2 = 2;
            const int int3 = 3;

            if (!string.IsNullOrWhiteSpace(activityId))
            {
                // Ideally we'd log that we're setting the Activity ID, but that results in a stack overflow. :(
                message.ActivityId = activityId;
            }
            else
            {
                // Any services producing unassigned ActivityIDs should be updated to have one set
                Guid start = Guid.NewGuid();
                byte[] data = start.ToByteArray();
                data[0] = intActivityIDs;
                data[int1] = intActivityIDs;
                data[int2] = intActivityIDs;
                data[int3] = intActivityIDs;

                message.ActivityId = new Guid(data).ToString();
                this.SetActivityId(message.ActivityId);
                this.LogMessage(EventLevel.Warning, message.Tag, $"Activity ID not specified in {nameof(CallContext)}. Generating new Id, assigning it to message, and setting it in {nameof(CallContext)}. Id: '{message.ActivityId}'.");
            }

            if (!string.IsNullOrWhiteSpace(userId))
            {
                message.UserId = userId;
            }

            if (this.logSourceContext)
            {
                message.Properties.Add(Constants.SourceFileName, sourceFile);
                message.Properties.Add(Constants.SourceLineName, sourceLine.ToString(CultureInfo.InvariantCulture));
                message.Properties.Add(Constants.CallingMemberName, member);
            }
        }

        /// <summary>
        /// Processes the specified telemetry.
        /// </summary>
        /// <param name="telemetry">The telemetry.</param>
        /// <param name="keyVWords">The key v words.</param>
        [SuppressMessage("Design", "CA1031:Do not catch general exception types", Justification = "TelemetryMessage formatting throws InvalidDataException for cases where the message limit exceeds threshold.")]
        private void Process(ITelemetryMessage telemetry, KeyWords keyVWords)
        {
            if ((int)telemetry.Level <= this.traceLevel)
            {
                try
                {
                    telemetry.FormatMessage();
                }
                catch (InvalidDataException)
                {
                    this.LogMessage(EventLevel.LogAlways, "DDAC22F4-33EA-4149-AE34-E3A817E4C3F8", "Message Data Exceeded size limit " + telemetry.Tag);
                    return;
                }

                foreach (ILogWriter writer in this.logWriters)
                {
                    writer.Process(telemetry, keyVWords, telemetry.SchemaName);
                }
            }
        }
    }
}