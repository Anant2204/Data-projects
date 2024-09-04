// <copyright file="ConsoleLogWriter.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using MCAPSHelpVnext.Common.Logging.Models;

    /// <summary>
    /// Console Log writer.
    /// </summary>
    /// <seealso cref="ILogWriter" />
    internal class ConsoleLogWriter : ILogWriter
    {
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
                

           disposed = true;
        }

        ~ConsoleLogWriter()
        {
            Dispose(false);
        }

        /// <summary>
        /// Processes the specified telemetry.
        /// </summary>
        /// <param name="telemetry">The telemetry.</param>
        /// <param name="keyWords">The key v words.</param>
        /// <param name="tableName">Name of the table.</param>
        /// <exception cref="ArgumentOutOfRangeException">For invalid\non-supported keywords.</exception>
        public void Process(ITelemetryMessage telemetry, EventSourceLogger.KeyWords keyWords, string tableName)
        {
            switch (keyWords)
            {
                case EventSourceLogger.KeyWords.Trace:
                    if (telemetry is TraceMessage traceMessage)
                    {
                        string outputMessage = $"[{traceMessage.Timestamp:yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffK}] [{traceMessage.Tag}] {traceMessage.Message} {GetProperties(traceMessage.Properties)}";
                        
                    }

                    break;
                case EventSourceLogger.KeyWords.Exception:
                    if (telemetry is ExceptionMessage exMessage)
                    {
                        string outputMessage = $"[{exMessage.Timestamp:yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffK}] [{exMessage.Tag}] {exMessage.UserMessage} {exMessage} {exMessage.Properties}";
                        
                    }

                    break;
                case EventSourceLogger.KeyWords.Request:
                    if (telemetry is RequestMessage reqMessage)
                    {
                        string outputMessage = $"[{reqMessage.Timestamp:yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffK}] [{reqMessage.Tag}] {reqMessage.Method} {reqMessage.Name} {GetProperties(reqMessage.Properties)}";
                        
                    }

                    break;
                case EventSourceLogger.KeyWords.Metric:
                    break;
                case EventSourceLogger.KeyWords.Event:
                    if (telemetry is EventMessage evMessage)
                    {
                        string outputMessage = $"[{evMessage.Timestamp:yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffK}] [{evMessage.Tag}] {evMessage.Name} {GetProperties(evMessage.Properties)}";
                        
                    }

                    break;
                case EventSourceLogger.KeyWords.Dependency:
                    if (telemetry is DependencyMessage dependency)
                    {
                         string outputMessage = $"[{dependency.Timestamp:yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffK}] " +
                               $"[{dependency.Tag}] {dependency.DependencyData} " +
                               $"Duration:{dependency.Duration} " +
                               $"Status: {dependency.ResultCode} " +
                               $"{GetProperties(dependency.Properties)}";
                    }

                    break;
                case EventSourceLogger.KeyWords.Audit:
                    if (telemetry is AuditMessage audit)
                    {
                        string outputMessage = $"[{audit.Timestamp:yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffK}] [{audit.Tag}] {audit.AuditType} {audit.MandatoryProperties.OperationName}";
                       
                    }

                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(keyWords), keyWords, null);
            }
        }

        /// <summary>
        /// Writes the logs.
        /// </summary>
        public void Flush()
        {
        }

        /// <summary>
        /// Gets the properties as formatted text.
        /// </summary>
        /// <param name="properties">The properties.</param>
        /// <returns>The property values as formatted text for logging.</returns>
        private static string GetProperties(IDictionary<string, string> properties)
        {
            var sb = new StringBuilder();
            foreach (string name in properties.Keys)
            {
                sb.Append($"{name}:{properties[name]} ");
            }

            return sb.ToString();
        }
    }
}