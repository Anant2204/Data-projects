// <copyright file="ILogWriter.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;

    /// <summary>
    /// The Log Writer interface used by the logger.
    /// </summary>
    internal interface ILogWriter : IDisposable
    {
        /// <summary>
        /// Processes the specified telemetry.
        /// </summary>
        /// <param name="telemetry">The telemetry.</param>
        /// <param name="keyWords">The keywords.</param>
        /// <param name="tableName">Name of the table.</param>
        void Process(ITelemetryMessage telemetry, EventSourceLogger.KeyWords keyWords, string tableName);

        /// <summary>
        /// Writes the logs.
        /// </summary>
        void Flush();
    }
}