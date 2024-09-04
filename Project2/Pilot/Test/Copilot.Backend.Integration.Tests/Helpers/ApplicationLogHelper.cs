//-----------------------------------------------------------------------
// <copyright file="ApplicationLogHelper.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

using System.Diagnostics;
using System.Text;

namespace Copilot.Backend.Integration.Tests
{
    /// <summary>
    /// Application Log Helper
    /// </summary>
    public static class ApplicationLogHelper
    {
        /// <summary>
        /// The logger
        /// </summary>
        private static readonly ILogger Logger = new AiLogger();

        /// <summary>
        /// Logs error with custom properties
        /// </summary>
        /// <param name="ex">the exception</param>
        /// <param name="customProperties">dictionary of custom property name and value</param>
        public static void LogError(Exception ex, Dictionary<string, string> customProperties)
        {
            if (ex != null)
            {
                try
                {
                    Logger.TrackException(ex, customProperties);
                    Trace.TraceError(FormatExceptionMessage(ex));
                }
                catch (Exception e)
                {
                    Logger.TrackException(e);
                }
            }
        }

        /// <summary>
        /// Log custom events
        /// </summary>
        /// <param name="eventName">event name</param>
        /// <param name="customData">key pair custom data</param>
        public static void LogCustomEvent(string eventName, IDictionary<string, string> customData)
        {
            try
            {
                if (customData == null)
                {
                    Logger.TrackEvent(eventName);
                }
                else
                {
                    Logger.TrackEvent(eventName, customData);
                }
            }
            catch (Exception ex)
            {
                Logger.TrackException(ex);
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
                    Logger.TrackTrace(message);         
                    Trace.TraceInformation(message);   
                }
                catch (Exception ex)
                {
                    Logger.TrackException(ex);
                }
            }
        }

        /// <summary>
        /// Formats the exception message.
        /// </summary>
        /// <param name="e">The e.</param>
        /// <returns>formatted string</returns>
        private static string FormatExceptionMessage(Exception e)
        {
            //// Simple exception formatting: for a more comprehensive version see 
            //// http://code.msdn.microsoft.com/windowsazure/Fix-It-app-for-Building-cdd80df4
            var sb = new StringBuilder();

            do
            {
                sb.AppendLine(e.Message);
                if (e.InnerException == null)
                {
                    sb.AppendLine(e.StackTrace);
                }

#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                e = e.InnerException;
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
            }
            while (e != null);

            return sb.ToString();
        }
    }
}
