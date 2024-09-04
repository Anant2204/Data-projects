//-----------------------------------------------------------------------
// <copyright file="AppInsightsLoggerAdapter.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Infrastructure.Logging
{
    using Copilot.Backend.Core.Interfaces;
    using Microsoft.ApplicationInsights;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Globalization;
    using System.Text;

    /// <summary>
    /// App Insights Logger Adapter
    /// </summary>
    /// <seealso cref="IAppLogger" />
    /// <seealso cref="Copilot.Backend.Core.Interfaces.IAppLogger" />
    public class AppInsightsLoggerAdapter<T> : IAppLogger<T>
    {
        private readonly TelemetryClient telemetryClient;
        /// <summary>
        /// AppInsightsLoggerAdapter
        /// </summary>
        /// <param name="telemetryClient"></param>
        public AppInsightsLoggerAdapter(TelemetryClient telemetryClient)
        {
            this.telemetryClient = telemetryClient;
            this.telemetryClient.Context.Operation.Id = "VirtuosoCopilotAPI_" + DateTime.UtcNow.ToString("yyyyMMddHHmmss", CultureInfo.CurrentCulture);
        }
        /// <summary>
        /// LogCustomEvent
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="customData"></param>
        public void LogCustomEvent(string eventName, IDictionary<string, string> customData = null)
        {
            try
            {
                if (customData == null)
                {
                    this.telemetryClient.TrackEvent(eventName);
                }
                else
                {
                    this.telemetryClient.TrackEvent(eventName, customData);
                }
            }
            catch (Exception ex)
            {
                Trace.TraceError(FormatExceptionMessage(ex));
            }
        }   
        
        public void LogError(Exception ex)
        {
            if (ex != null)
            {
                try
                {
                    this.telemetryClient.TrackException(ex);
                }
                catch (Exception exc)
                {
                    Trace.TraceError(FormatExceptionMessage(exc));
                }
            }
        }
        /// <summary>
        /// LogError
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="customProperties"></param>
        public void LogError(Exception ex, Dictionary<string, string> customProperties)
        {
            if (ex != null)
            {
                try
                {
                    this.telemetryClient.TrackException(ex, customProperties);
                    Trace.TraceError(FormatExceptionMessage(ex));
                }
                catch (Exception exc)
                {
                    Trace.TraceError(FormatExceptionMessage(exc));
                }
            }
        }
        /// <summary>
        /// LogInformation
        /// </summary>
        /// <param name="message"></param>
        public void LogInformation(string message)
        {
            if (message != null)
            {
                try
                {
                    this.telemetryClient.TrackTrace(message);
                    Trace.TraceInformation(message);
                }
                catch (Exception ex)
                {
                    Trace.TraceError(FormatExceptionMessage(ex));
                }
            }
        }

        public void LogInformation(string message, IDictionary<string, string> properties)
        {
            if (message != null)
            {
                try
                {
                    this.telemetryClient.TrackTrace(message, properties);
                    Trace.TraceInformation(message);
                }
                catch (Exception ex)
                {
                    Trace.TraceError(FormatExceptionMessage(ex));
                }
            }
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
            var sb = new StringBuilder();
            if (!string.IsNullOrEmpty(fmt))
            {
                sb.Append(string.Format(CultureInfo.InvariantCulture, fmt, variableObject));
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
