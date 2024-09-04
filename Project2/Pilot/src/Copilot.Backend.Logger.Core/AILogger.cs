// ***********************************************************************
// <copyright file="AILogger.cs" company="Microsoft">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Copilot.Backend.Logger.Core
{
    using Microsoft.ApplicationInsights;
    using Microsoft.ApplicationInsights.DataContracts;
    using Microsoft.ApplicationInsights.Extensibility;
    using Microsoft.Extensions.Configuration;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// class for AI Logger
    /// </summary>
    public class AILogger : ILogger
    {
        /// <summary>
        /// The LogLevel Configured
        /// </summary>
        private static string logLevel = System.Configuration.ConfigurationManager.AppSettings["LogLevl"] ?? System.Environment.GetEnvironmentVariable("LogLevl") ?? "Information";

        /// <summary>
        /// The client
        /// </summary>
        private readonly TelemetryClient client;

        /// <summary>
        /// Initializes a new instance of the <see cref="AILogger"/> class.
        /// </summary>
        public AILogger()
        {
#pragma warning disable CS0618 // Type or member is obsolete
            this.client = new TelemetryClient();
#pragma warning restore CS0618 // Type or member is obsolete
            if ((System.Configuration.ConfigurationManager.AppSettings["LogLevl"] == null) && Configuration != null)
            {
                logLevel = Configuration.GetSection("LogLevl")?.Value ?? "Information";
            }

            LogLevel result;
            logLevel = Enum.TryParse<LogLevel>(logLevel, true, out result) ? result.ToString() : LogLevel.Information.ToString();
        }

        /// <summary>
        /// Enum values of LogLevels.
        /// </summary>
        public enum LogLevel
        {
            /// <summary>
            /// Debug Log
            /// </summary>
            Debug,

            /// <summary>
            /// Information Log
            /// </summary>
            Information,

            /// <summary>
            /// CustomEvents Log
            /// </summary>
            CustomEvent,

            /// <summary>
            /// Warning Log
            /// </summary>
            Warning,

            /// <summary>
            /// Error Log
            /// </summary>
            Error
        }

        /// <summary>
        /// Gets or sets The Configuration Parameter
        /// </summary>
        public static IConfiguration Configuration { get; set; }

        /// <summary>
        /// Flushes this instance.
        /// </summary>
        public void Flush()
        {
            this.client.Flush();
        }

        #region Trace

        /// <summary>
        /// Tracks the trace.
        /// </summary>
        /// <param name="message">The message.</param>
        public void TrackTrace(string message)
        {
            if ((int)Enum.Parse<LogLevel>(logLevel, true) <= (int)LogLevel.Information)
            {
                this.client.Context.Operation.Id = CorrelationManager.GetOperationId();
                this.client.Context.Operation.ParentId = CorrelationManager.GetOperationParentId();
                this.client.Context.Operation.Name = CorrelationManager.GetOperationName();

                this.client.TrackTrace(message);
            }
        }

        /// <summary>
        /// Gets the telemetry operation.
        /// </summary>
        /// <param name="operationName">The operationName.</param>
        /// <returns>
        /// Telemetry operation
        /// </returns>
        public IOperationHolder<RequestTelemetry> GetTelemetryOperation(string operationName)
        {
            return this.client.StartOperation<RequestTelemetry>(operationName);
        }

        /// <summary>
        /// Tracks the trace.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="properties">The properties.</param>
        public void TrackTrace(string message, IDictionary<string, string> properties)
        {
            if ((int)Enum.Parse<LogLevel>(logLevel, true) <= (int)LogLevel.Information)
            {
                this.client.Context.Operation.Id = CorrelationManager.GetOperationId();
                this.client.Context.Operation.ParentId = CorrelationManager.GetOperationParentId();
                this.client.Context.Operation.Name = CorrelationManager.GetOperationName();

                this.client.TrackTrace(message, properties);
            }
        }

        #endregion

        #region Event

        /// <summary>
        /// Tracks the event.
        /// </summary>
        /// <param name="eventName">Name of the event.</param>
        public void TrackEvent(string eventName)
        {
            if ((int)Enum.Parse<LogLevel>(logLevel, true) <= (int)LogLevel.CustomEvent)
            {
                this.client.TrackEvent(new EventTelemetry(eventName));
            }
        }

        /// <summary>
        /// Tracks the event.
        /// </summary>
        /// <param name="eventName">Name of the event.</param>
        /// <param name="properties">The properties.</param>
        public void TrackEvent(string eventName, IDictionary<string, string> properties)
        {
            if ((int)Enum.Parse<LogLevel>(logLevel, true) <= (int)LogLevel.CustomEvent)
            {
                var evt = new EventTelemetry(eventName);
                if (properties != null)
                {
                    foreach (var prop in properties)
                    {
                        evt.Properties.Add(prop);
                    }
                }

                this.client.TrackEvent(evt);
            }
        }

        #endregion

        #region PageView

        /// <summary>
        /// Tracks the page view.
        /// </summary>
        /// <param name="pageName">Name of the page.</param>
        public void TrackPageView(string pageName)
        {
            this.client.TrackPageView(pageName);
        }

        /// <summary>
        /// Tracks the page view.
        /// </summary>
        /// <param name="pageName">Name of the page.</param>
        /// <param name="link">The URL.</param>
        /// <param name="properties">The properties.</param>
        public void TrackPageView(string pageName, string link, IDictionary<string, string> properties)
        {
#pragma warning disable CC0008 // Use object initializer
            var pageView = new PageViewTelemetry(pageName);
#pragma warning restore CC0008 // Use object initializer
            pageView.Url = new Uri(link);
            if (properties != null)
            {
                foreach (var prop in properties)
                {
                    pageView.Properties.Add(prop);
                }
            }

            this.client.TrackPageView(pageName);
        }

        #endregion

        #region Exception

        /// <summary>
        /// Tracks the exception.
        /// </summary>
        /// <param name="exception">The exception.</param>
        public void TrackException(Exception exception)
        {
            this.client.Context.Operation.Id = CorrelationManager.GetOperationId();
            this.client.Context.Operation.ParentId = CorrelationManager.GetOperationParentId();
            this.client.Context.Operation.Name = CorrelationManager.GetOperationName();

            this.client.TrackException(exception);
        }

        /// <summary>
        /// Tracks the exception.
        /// </summary>
        /// <param name="exception">the exception</param>
        /// <param name="parameters">custom data</param>
        public void TrackException(Exception exception, Dictionary<string, string> parameters)
        {
            this.client.Context.Operation.Id = CorrelationManager.GetOperationId();
            this.client.Context.Operation.ParentId = CorrelationManager.GetOperationParentId();
            this.client.Context.Operation.Name = CorrelationManager.GetOperationName();

            this.client.TrackException(exception, parameters);
        }

        #endregion

        #region Request

        /// <summary>
        /// Tracks the request.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="startTime">The start time.</param>
        /// <param name="duration">The duration.</param>
        /// <param name="responseCode">The response code.</param>
        /// <param name="success">if set to <c>true</c> [success].</param>
        /// <param name="link">The URL.</param>
        /// <param name="properties">The properties.</param>
        /// <param name="metrics">The metrics.</param>
        public void TrackRequest(
            string name,
            DateTimeOffset startTime,
            TimeSpan duration,
            string responseCode,
            bool success,
            string link,
            IDictionary<string, string> properties,
            IDictionary<string, double> metrics)
        {
#pragma warning disable CC0008 // Use object initializer
            var request = new RequestTelemetry(name, startTime, duration, responseCode, success);
#pragma warning restore CC0008 // Use object initializer

            request.Url = new Uri(link);
            if (properties != null)
            {
                foreach (var prop in properties)
                {
                    request.Properties.Add(prop);
                }
            }

            if (metrics != null)
            {
                foreach (var prop in metrics)
                {
                    request.Metrics.Add(prop);
                }
            }

            this.client.TrackRequest(request);
        }

        #endregion

        #region Metric

        /// <summary>
        /// Tracks the metric.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <param name="properties">The properties.</param>
        public void TrackMetric(string name, double value, IDictionary<string, string> properties)
        {
            this.client.TrackMetric(name, value, properties);
        }

        #endregion
    }
}
