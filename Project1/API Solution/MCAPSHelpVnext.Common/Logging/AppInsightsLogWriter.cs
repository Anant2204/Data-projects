// <copyright file="AppInsightsLogWriter.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Collections.Generic;
    using Microsoft.ApplicationInsights;
    using Microsoft.ApplicationInsights.DataContracts;
    using Microsoft.ApplicationInsights.Extensibility;
    using MCAPSHelpVnext.Common.Logging.Models;
    using Microsoft.Azure.Amqp.Framing;

    /// <summary>
    /// Writes logs using ETW.
    /// </summary>
    /// <seealso cref="ILogWriter" />
    internal class AppInsightsLogWriter : ILogWriter
    {
        

        /// <summary>
        /// The telemetry configuration.
        /// </summary>
        private readonly TelemetryConfiguration configuration;

        /// <summary>
        /// The telemetry client object.
        /// </summary>
        private readonly TelemetryClient telemetryClient;

        /// <summary>
        /// Initializes a new instance of the <see cref="AppInsightsLogWriter"/> class.
        /// </summary>
        /// <param name="useConnectionString">True, if key is the connection string, false, if instrumentation key is to be used.</param>
        /// <param name="appInsightsKey">App Insights connection string or instrumentation key.</param>
        internal AppInsightsLogWriter(bool useConnectionString, string appInsightsKey)
        {
            this.configuration = TelemetryConfiguration.CreateDefault();
            if (useConnectionString)
            {
                this.configuration.ConnectionString = appInsightsKey;
            }
            else
            {
                // Keep for backward compatibility.
                this.configuration.InstrumentationKey = appInsightsKey;
            }

            this.telemetryClient = new TelemetryClient(this.configuration);
        }

        
        public void Process(ITelemetryMessage telemetry, EventSourceLogger.KeyWords keyWords, string tableName)
        {
            SetUserId(telemetry);
            SetTag(telemetry);

            switch (keyWords)
            {
                case EventSourceLogger.KeyWords.Trace:
                    ProcessTrace(telemetry);
                    break;
                case EventSourceLogger.KeyWords.Exception:
                    ProcessException(telemetry);
                    break;
                case EventSourceLogger.KeyWords.Request:
                    ProcessRequest(telemetry);
                    break;
                case EventSourceLogger.KeyWords.Metric:
                    ProcessMetric(telemetry);
                    break;
                case EventSourceLogger.KeyWords.Event:
                    ProcessEvent(telemetry);
                    break;
                case EventSourceLogger.KeyWords.Dependency:
                    ProcessDependency(telemetry);
                    break;
                case EventSourceLogger.KeyWords.Audit:
                    ProcessAudit(telemetry);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(keyWords), keyWords, null);
            }
        }

        private void SetUserId(ITelemetryMessage telemetry)
        {
            if (!string.IsNullOrWhiteSpace(telemetry.UserId))
            {
                this.telemetryClient.Context.User.AuthenticatedUserId = telemetry.UserId;
            }
        }

        private void SetTag(ITelemetryMessage telemetry)
        {
            if (!string.IsNullOrEmpty(telemetry.Tag))
            {
                telemetry.Properties["correlationId"] = telemetry.Tag; // adding a custom property to app insight to track request activity
            }
        }

        private void ProcessTrace(ITelemetryMessage telemetry)
        {
            if (telemetry is TraceMessage traceMessage)
            {
                this.telemetryClient.TrackTrace(traceMessage.Data.Message, (SeverityLevel)traceMessage.Level, telemetry.Properties);
            }
        }

        private void ProcessException(ITelemetryMessage telemetry)
        {
            if (telemetry is ExceptionMessage exMessage)
            {
                this.telemetryClient.TrackException(exMessage.RawException, telemetry.Properties);
            }
        }

        private void ProcessRequest(ITelemetryMessage telemetry)
        {
            if (telemetry is RequestMessage reqMessage)
            {
                RequestTelemetry rt = new RequestTelemetry(reqMessage.Name, reqMessage.StartTime, reqMessage.Duration, reqMessage.ResponseCode, reqMessage.IsSuccess);
                if (reqMessage.Properties != null)
                {
                    foreach (KeyValuePair<string, string> item in reqMessage.Properties)
                    {
                        rt.Properties[item.Key] = item.Value;
                    }
                }

                if (reqMessage.Metrics != null)
                {
                    foreach (KeyValuePair<string, double> item in reqMessage.Metrics)
                    {
                        rt.Metrics[item.Key] = item.Value;
                    }
                }

                this.telemetryClient.TrackRequest(rt);
            }
        }

        private void ProcessMetric(ITelemetryMessage telemetry)
        {
            if (telemetry is MetricMessage metricMessage)
            {
                this.telemetryClient.TrackMetric(metricMessage.Name, metricMessage.Sum, metricMessage.Properties);
            }
        }

        private void ProcessEvent(ITelemetryMessage telemetry)
        {
            if (telemetry is EventMessage evMessage)
            {
                this.telemetryClient.TrackEvent(evMessage.Name, evMessage.Properties, evMessage.Metrics);
            }
        }

        private void ProcessDependency(ITelemetryMessage telemetry)
        {
            if (telemetry is DependencyMessage dependency)
            {
                this.telemetryClient.TrackDependency(dependency.Type, dependency.Target, dependency.Name, dependency.Data.Message, dependency.StartTime, dependency.Duration, dependency.ResultCode, dependency.Success);
            }
        }

        private void ProcessAudit(ITelemetryMessage telemetry)
        {
            if (telemetry is AuditMessage audit)
            {
                this.telemetryClient.TrackEvent(audit.SchemaName, new Dictionary<string, string> { { "AuditLog", audit.Data.Message } });
            }
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
                
        private bool disposed = false;

        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
            {
                return;
            }
                

            if (disposing)
            {
                this.configuration?.Dispose();
            }
            disposed = true;
        }

        ~AppInsightsLogWriter()
        {
            Dispose(false);
        }

        /// <summary>
        /// Writes the logs.
        /// </summary>
        public void Flush()
        {
            this.telemetryClient.Flush();
        }
    }
}