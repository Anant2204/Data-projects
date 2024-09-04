// <copyright file="EtwLogWriter.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System.Diagnostics.Tracing;
    using System.Threading.Tasks;

    /// <summary>
    /// Writes logs using ETW.
    /// </summary>
    /// <seealso cref="ILogWriter" />
    internal class EtwLogWriter : ILogWriter
    {
        /// <summary>
        /// The event source internalThe event source.
        /// </summary>
        private readonly EventSource eventSourceInternal;

        /// <summary>
        /// Initializes static members of the <see cref="EtwLogWriter"/> class.
        /// </summary>
        /// <remarks>
        /// A workaround for the problem where ETW activities do not get tracked until Tasks infrastructure is initialized.
        /// This problem will be fixed in .NET Framework 4.6.2.
        /// </remarks>
        static EtwLogWriter()
        {
            Task.Run(() => { });
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="EtwLogWriter"/> class.
        /// </summary>
        /// <param name="sourceName">Name of the source.</param>
        internal EtwLogWriter(string sourceName)
        {
            this.eventSourceInternal = new EventSource(sourceName, EventSourceSettings.EtwSelfDescribingEventFormat);
        }

        /// <summary>
        /// Processes the specified telemetry.
        /// </summary>
        /// <param name="telemetry">The telemetry message <see cref="ITelemetryMessage"/>.</param>
        /// <param name="keyWords">The keywords.</param>
        /// <param name="tableName">Name of the table.</param>
        public void Process(ITelemetryMessage telemetry, EventSourceLogger.KeyWords keyWords, string tableName)
        {
            this.eventSourceInternal.Write(
                "OSE",
                new EventSourceOptions
                {
                    Keywords = (EventKeywords)keyWords,
                    Level = telemetry.Level,
                },
                new
                {
                    PartA_Tags = telemetry.Properties,
                    _B = telemetry.Data,
                });
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
                this.eventSourceInternal?.Dispose();
            }
            disposed = true;
        }

        ~EtwLogWriter()
        {
            Dispose(false);
        }

        /// <summary>
        /// Writes the logs.
        /// </summary>
        public void Flush()
        {
        }
    }
}