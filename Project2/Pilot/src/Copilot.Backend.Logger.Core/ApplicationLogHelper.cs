//-----------------------------------------------------------------------
// <copyright file="ApplicationLogHelper.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Logger.Core
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Globalization;
    using System.Text;
    using Microsoft.ApplicationInsights.DataContracts;
    using Microsoft.ApplicationInsights.Extensibility;

    /// <summary>
    /// static class Logger
    /// </summary>
    public static class ApplicationLogHelper
    {
        /// <summary>
        /// The Correlation identifier
        /// </summary>
        private const string CorrelationIdKey = "X-Correlation-Id";

        /// <summary>
        /// The duration metric name
        /// </summary>
        private static readonly string DurationMetricName = "Duration";

        /// <summary>
        /// The logger
        /// </summary>
        private static ILogger logger = new AILogger();

        /// <summary>
        /// Logs the UI error.
        /// </summary>
        /// <param name="ex">The ex.</param>
        /// <param name="fmt">The FMT.</param>
        /// <param name="parameters">The parameters.</param>
        public static void LogError(Exception ex, string fmt = "", object[] parameters = null)
        {
            if (ex != null)
            {
                try
                {
                    Dictionary<string, string> customProperties = new Dictionary<string, string>();
                    customProperties.Add(CorrelationIdKey, CorrelationManager.GetCorrelationId());
                    logger.TrackException(ex, customProperties);
                    Trace.TraceError(FormatExceptionMessage(ex, fmt, parameters)); // lgtm[cs/log-forging]
                }
                catch (Exception)
                {
                    ////catch code
                }
            }
        }

        /// <summary>
        /// Logs error with custom properties
        /// </summary>
        /// <param name="ex">the exception</param>
        /// <param name="customProperties">dictionary of custom property name and value</param>
        public static void LogError(Exception ex, Dictionary<string, string> customProperties)
        {
            if (ex != null && customProperties != null)
            {
                try
                {
                    customProperties.Add(CorrelationIdKey, CorrelationManager.GetCorrelationId());
                    logger.TrackException(ex, customProperties); // lgtm[cs/log-forging]
                    Trace.TraceError(FormatExceptionMessage(ex));
                }
                catch (Exception)
                {
                    ////catch block code
                }
            }
        }

        /// <summary>
        /// Log custom events
        /// </summary>
        /// <param name="eventName">event name</param>
        /// <param name="customData">key pair custom data</param>
        public static void LogCustomEvent(string eventName, Dictionary<string, string> customData = null)
        {
            try
            {
                if (customData == null)
                {
                    Dictionary<string, string> customProperties = new Dictionary<string, string>();
                    customProperties.Add(CorrelationIdKey, CorrelationManager.GetCorrelationId());
                    logger.TrackEvent(eventName, customProperties); // lgtm[cs/log-forging]
                }
                else
                {
                    customData.Add(CorrelationIdKey, CorrelationManager.GetCorrelationId());
                    logger.TrackEvent(eventName, customData); // lgtm[cs/log-forging]
                }
            }
            catch (Exception)
            {
                ////catchblock code
            }
        }

        /// <summary>
        /// Logs the information.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="properties">The properties.</param>
        public static void LogInformation(string message, IDictionary<string, string> properties)
        {
            if (message != null && properties != null)
            {
                try
                {
                    properties.Add(CorrelationIdKey, CorrelationManager.GetCorrelationId());
                    logger.TrackTrace(message, properties); // lgtm[cs/log-forging]
                    Trace.TraceInformation(message);
                }
                catch (Exception)
                {
                    ////catchblock code
                }
            }
        }

        /// <summary>
        /// Logs the UI information
        /// </summary>
        /// <param name="message">Message Passed</param>
        public static void LogInformation(string message)
        {
            if (message != null)
            {
                try
                {
                    IDictionary<string, string> customProperties = new Dictionary<string, string>();
                    customProperties.Add(CorrelationIdKey, CorrelationManager.GetCorrelationId());
                    logger.TrackTrace(message, customProperties); //// lgtm[cs/log-forging] lgtm[cs/exposure-of-sensitive-information]
                    Trace.TraceInformation(message); //// lgtm[cs/log-forging] lgtm[cs/exposure-of-sensitive-information]
                }
                catch (Exception)
                {
                    ////catchblock code
                }
            }
        }

        /// <summary>
        /// Flushes the insights.
        /// </summary>
        public static void FlushInsights()
        {
            logger.Flush();
        }

        /// <summary>
        /// Logs the UI warning
        /// </summary>
        /// <param name="message">Message Passed</param>
        public static void LogWarning(string message)
        {
            if (message != null)
            {
                try
                {
                    IDictionary<string, string> customProperties = new Dictionary<string, string>();
                    customProperties.Add(CorrelationIdKey, CorrelationManager.GetCorrelationId());
                    Trace.TraceWarning(message);
                }
                catch (Exception)
                {
                    ////catchblock code
                }
            }
        }

        /// <summary>
        /// Information the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        public static void Information(string message)
        {
            Trace.TraceInformation(message); // lgtm[cs/exposure-of-sensitive-information]
        }

        /// <summary>
        /// Information the specified FMT.
        /// </summary>
        /// <param name="fmt">The FMT.</param>
        /// <param name="variableObject">The variableObject.</param>
        public static void Information(string fmt, params object[] variableObject)
        {
            Trace.TraceInformation(fmt, variableObject);
        }

        /// <summary>
        /// Information the specified exception.
        /// </summary>
        /// <param name="exception">The exception.</param>
        /// <param name="fmt">The FMT.</param>
        /// <param name="variableObject">The variableObject.</param>
        public static void Information(Exception exception, string fmt, params object[] variableObject)
        {
            Trace.TraceInformation(FormatExceptionMessage(exception, fmt, variableObject));
        }

        /// <summary>
        /// Warnings the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        public static void Warning(string message)
        {
            Trace.TraceWarning(message);
        }

        /// <summary>
        /// Warnings the specified FMT.
        /// </summary>
        /// <param name="fmt">The FMT.</param>
        /// <param name="variableObject">The variableObject.</param>
        public static void Warning(string fmt, params object[] variableObject)
        {
            Trace.TraceWarning(fmt, variableObject);
        }

        /// <summary>
        /// Warnings the specified exception.
        /// </summary>
        /// <param name="exception">The exception.</param>
        /// <param name="fmt">The FMT.</param>
        /// <param name="variableObject">The variableObject.</param>
        public static void Warning(Exception exception, string fmt, params object[] variableObject)
        {
            Trace.TraceWarning(FormatExceptionMessage(exception, fmt, variableObject));
        }

        /// <summary>
        /// Errors the specified message.
        /// </summary>
        /// <param name="message">The message.</param>
        public static void Error(string message)
        {
            Trace.TraceError(message); // lgtm[cs/log-forging]
        }

        /// <summary>
        /// Errors the specified FMT.
        /// </summary>
        /// <param name="fmt">The FMT.</param>
        /// <param name="variableObject">The variableObject.</param>
        public static void Error(string fmt, params object[] variableObject)
        {
            Trace.TraceError(fmt, variableObject);
        }

        /// <summary>
        /// Errors the specified exception.
        /// </summary>
        /// <param name="exception">The exception.</param>
        /// <param name="fmt">The FMT.</param>
        /// <param name="variableObject">The variableObject.</param>
        public static void Error(Exception exception, string fmt, params object[] variableObject)
        {
            Trace.TraceError(FormatExceptionMessage(exception, fmt, variableObject));
        }

        /// <summary>
        /// Traces the API.
        /// </summary>
        /// <param name="componentName">Name of the component.</param>
        /// <param name="method">The method.</param>
        /// <param name="timespan">The timespan.</param>
        public static void TraceApi(string componentName, string method, TimeSpan timespan)
        {
            TraceApi(componentName, method, timespan, string.Empty);
        }

        /// <summary>
        /// Gets the telemetry operation.
        /// </summary>
        /// <param name="operationName">Name of the operation.</param>
        /// <returns>Telemetry operation</returns>
        public static IOperationHolder<RequestTelemetry> GetTelemetryOperation(string operationName)
        {
            return logger.GetTelemetryOperation(operationName);
        }

        /// <summary>
        /// Updates the success telemetry operation.
        /// </summary>
        /// <param name="operation">The operation.</param>
        public static void UpdateSuccessTelemetryOperation(IOperationHolder<RequestTelemetry> operation)
        {
            if (operation != null && operation.Telemetry != null)
            {
                operation.Telemetry.ResponseCode = "200";
                operation.Telemetry.Success = true;
            }
        }

        /// <summary>
        /// Updates the failed telemetry operation.
        /// </summary>
        /// <param name="operation">The operation.</param>
        public static void UpdateFailedTelemetryOperation(IOperationHolder<RequestTelemetry> operation)
        {
            if (operation != null && operation.Telemetry != null)
            {
                operation.Telemetry.ResponseCode = "Exception";
                operation.Telemetry.Success = false;
            }
        }

        /// <summary>
        /// Traces the API.
        /// </summary>
        /// <param name="componentName">Name of the component.</param>
        /// <param name="method">The method.</param>
        /// <param name="timespan">The timespan.</param>
        /// <param name="fmt">The FMT.</param>
        /// <param name="variableObject">The variableObject.</param>
        public static void TraceApi(string componentName, string method, TimeSpan timespan, string fmt, params object[] variableObject)
        {
            TraceApi(componentName, method, timespan, string.Format(CultureInfo.InvariantCulture, fmt, variableObject));
        }

        /// <summary>
        /// Traces the API.
        /// </summary>
        /// <param name="componentName">Name of the component.</param>
        /// <param name="method">The method.</param>
        /// <param name="timespan">The timespan.</param>
        /// <param name="properties">The properties.</param>
        public static void TraceApi(string componentName, string method, TimeSpan timespan, string properties)
        {
            string message = string.Concat("Component:", componentName, ";Method:", method, ";Timespan:", timespan.ToString(), ";Properties:", properties);
            Trace.TraceInformation(message);
        }

        /// <summary>
        /// Write the message in console and log the trace in app insight
        /// </summary>
        /// <param name="message">message to log/print</param>
        public static void LogandPrintInformation(string message)
        {
            LogInformation(message);
        }

        /// <summary>
        /// Logs the duration metric.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="properties">The properties.</param>
        public static void LogDurationMetric(double value, IDictionary<string, string> properties)
        {
            if (properties != null)
            {
                properties.Add(CorrelationIdKey, CorrelationManager.GetCorrelationId());
            }

            logger.TrackMetric(DurationMetricName, value, properties);
        }

        /// <summary>
        /// Formats the exception message.
        /// </summary>
        /// <param name="e">The exception.</param>
        /// <param name="fmt">The FMT.</param>
        /// <param name="variableObject">The variableObject.</param>
        /// <returns>returns string</returns>
        private static string FormatExceptionMessage(Exception e, string fmt = "", object[] variableObject = null)
        {
            //// Simple exception formatting: for a more comprehensive version see 
            //// http://code.msdn.microsoft.com/windowsazure/Fix-It-app-for-Building-cdd80df4
            var sb = new StringBuilder();
            if (!string.IsNullOrEmpty(fmt))
            {
                sb.Append(string.Format(CultureInfo.InvariantCulture, fmt, variableObject)); // lgtm[cs/exposure-of-sensitive-information] lgtm[cs/uncontrolled-format-string]
            }

            do
            {
                sb.AppendLine(e.Message);
                if (e.InnerException == null)
                {
                    sb.AppendLine(e.StackTrace);
                }

                e = e.InnerException;
            }
            while (e != null);

            return sb.ToString();
        }
    }
}
