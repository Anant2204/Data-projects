//-----------------------------------------------------------------------
// <copyright file="ILogger.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Integration.Tests
{
    /// <summary>
    /// class for I Logger
    /// </summary>
    public interface ILogger
    {
        #region Trace

        /// <summary>
        /// Tracks the trace.
        /// </summary>
        /// <param name="message">The message.</param>
        void TrackTrace(string message);

        /// <summary>
        /// Tracks the trace.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="properties">The properties.</param>
        void TrackTrace(string message, IDictionary<string, string> properties);

        /// <summary>
        /// Flushes this instance.
        /// </summary>
        void Flush();

        #endregion

        #region Event

        /// <summary>
        /// Tracks the event.
        /// </summary>
        /// <param name="eventName">Name of the event.</param>
        void TrackEvent(string eventName);

        /// <summary>
        /// Tracks the event.
        /// </summary>
        /// <param name="eventName">Name of the event.</param>
        /// <param name="properties">The properties.</param>
        void TrackEvent(string eventName, IDictionary<string, string> properties);

        #endregion

        #region PageView

        /// <summary>
        /// Tracks the page view.
        /// </summary>
        /// <param name="pageName">Name of the page.</param>
        void TrackPageView(string pageName);

        /// <summary>
        /// Tracks the page view.
        /// </summary>
        /// <param name="pageName">Name of the page.</param>
        /// <param name="link">The URL.</param>
        /// <param name="properties">The properties.</param>
        void TrackPageView(string pageName, string link, IDictionary<string, string> properties);

        #endregion

        #region Exception

        /// <summary>
        /// Tracks the exception.
        /// </summary>
        /// <param name="exception">The exception.</param>
        void TrackException(Exception exception);

        /// <summary>
        /// Tracks the exception.
        /// </summary>
        /// <param name="exception">the exception</param>
        /// <param name="parameters">custom data</param>
        void TrackException(Exception exception, Dictionary<string, string> parameters);

        #endregion

        #region Request

#pragma warning disable S107 // Methods should not have too many parameters
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
        void TrackRequest(
            string name,
            DateTimeOffset startTime,
            TimeSpan duration,
            string responseCode,
            bool success,
            string link,
            IDictionary<string, string> properties,
            IDictionary<string, double> metrics);
#pragma warning restore S107 // Methods should not have too many parameters

        #endregion

        #region Metric

        /// <summary>
        /// Tracks the metric.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <param name="properties">The properties.</param>
        void TrackMetric(string name, double value, IDictionary<string, string> properties);

        #endregion
    }
}
