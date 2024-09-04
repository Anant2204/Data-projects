// <copyright file="KustoEventHubLogWriter.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Text;
    using System.Threading;
    using global::Azure.Messaging.EventHubs;
    using global::Azure.Messaging.EventHubs.Producer;
    using Microsoft.Extensions.Options;
    using MCAPSHelpVnext.Common.Messaging;

    /// <summary>
    /// A <see cref="ILogWriter"/> implementation that sends logs to EventHub configured for Data Explorer sink.
    /// </summary>
    /// <seealso cref="ILogWriter" />
    internal class KustoEventHubLogWriter : ILogWriter
    {
        /// <summary>
        /// The default duration to disable a client.
        /// </summary>
        private const int DisableDuration = 10;

        /// <summary>
        /// The database name.
        /// </summary>
        private readonly string databaseName;

        /// <summary>
        /// The event hub batch writer.
        /// </summary>
        private readonly EventHubBatchLogHandler eventHubBatchWriter;

        /// <summary>
        /// The cancellation token source.
        /// </summary>
        private readonly CancellationTokenSource cancellationTokenSource;

        /// <summary>
        /// The disposed state.
        /// </summary>
        private bool isDisposed = false;

        /// <summary>
        /// Initializes a new instance of the <see cref="KustoEventHubLogWriter"/> class.
        /// </summary>
        /// <param name="eventHubSettings">The event hub settings.</param>
        /// <param name="databaseName">Name of the database.</param>
        public KustoEventHubLogWriter(IOptions<EventHubSettings> eventHubSettings, string databaseName)
        {
            var client1 = new EventHubProducerClient(eventHubSettings.Value.PrimaryConnectionString, eventHubSettings.Value.EventHubName);
            var client2 = new EventHubProducerClient(eventHubSettings.Value.SecondaryConnectionString, eventHubSettings.Value.EventHubName);

            // Take any dashes out as Kusto does not support them.
            this.databaseName = databaseName.Replace("-", string.Empty);
            this.cancellationTokenSource = new CancellationTokenSource();
            this.eventHubBatchWriter = new EventHubBatchLogHandler(
                new FailOverEventHubClient(client1, client2, nameof(KustoEventHubLogWriter), DisableDuration),
                5000,
                500,
                30,
                this.cancellationTokenSource.Token);
        }

        /// <summary>
        /// Processes the specified telemetry.
        /// </summary>
        /// <param name="telemetry">The telemetry.</param>
        /// <param name="keyVWords">The key words.</param>
        /// <param name="tableName">Name of the table.</param>
        public void Process(ITelemetryMessage telemetry, EventSourceLogger.KeyWords keyWords, string tableName)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(telemetry.Data.Message);
            EventData eventData = new EventData(bytes);
            eventData.Properties.Add("Database", this.databaseName);
            eventData.Properties.Add("Table", tableName);
            eventData.Properties.Add("Format", "json");
            eventData.Properties.Add("IngestionMappingReference", $"{tableName}JsonMapping");
            this.eventHubBatchWriter.PostEntry(eventData);
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
        /// Writes the logs.
        /// </summary>
        public void Flush()
        {
            this.eventHubBatchWriter.Flush();
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (!this.isDisposed && disposing)
            {
                this.eventHubBatchWriter?.Dispose();
                this.cancellationTokenSource?.Dispose();

                this.isDisposed = true;
            }
        }
    }
}