// <copyright file="FailOverEventHubClient.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Threading.Tasks;
    using global::Azure.Messaging.EventHubs;
    using global::Azure.Messaging.EventHubs.Producer;
    using MCAPSHelpVnext.Common.Helpers;
    using MCAPSHelpVnext.Common.Logging;
    using Validation;

    /// <summary>
    /// This class is used for support of failover of services during key rotation. This keyroller support is for ServiceBus eventHubs.
    /// </summary>
    /// <seealso cref="FailOverBase{EventHubProducerClient, UnauthorizedAccessException}" />
    public class FailOverEventHubClient : FailOverBase<EventHubProducerClient, UnauthorizedAccessException>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="FailOverEventHubClient"/> class.
        /// </summary>
        /// <param name="event1">The Event Hub client 1.</param>
        /// <param name="event2">The Event Hub client 2.</param>
        /// <param name="name">The service description\name used for logging.</param>
        /// <param name="disableDuration">Minimum duration in seconds to keep client disabled.</param>
        public FailOverEventHubClient(EventHubProducerClient event1, EventHubProducerClient event2, string name, int disableDuration)
            : base(event1, event2, name, disableDuration)
        {
        }

        /// <summary>
        /// Submit a message to an event hub.
        /// </summary>
        /// <param name="data">EventData data.</param>
        /// <returns>Nothing on success.</returns>
        public async Task SendAsync(EventData data)
        {
            Requires.NotNull(data, nameof(data));

            await this.PerformActionAsync(
                "SendAsync",
                async cEventHub =>
                {
                    DateTimeOffset start = DateTimeOffset.UtcNow;
                    Stopwatch eventHubSendWatch = Stopwatch.StartNew();
                    try
                    {
                        using EventDataBatch eventBatch = await cEventHub.CreateBatchAsync().ConfigureAwait(false);
                        eventBatch.TryAdd(data);
                        await cEventHub.SendAsync(eventBatch).ConfigureAwait(false);
                    }
                    finally
                    {
                        eventHubSendWatch.Stop();
                        Instrument.Logger.LogDependency("74B32E1A-32D5-4EE5-B2F9-C6EAD23D7F4A", "FailOverEventHubClient", this.Name, "EventHub", "SendAsync", start, eventHubSendWatch.Elapsed, "Success", true, new Dictionary<string, string>(), new Dictionary<string, double>());
                    }
                }).ConfigureAwait(false);
        }

        /// <summary>
        /// Submit a batch of messages to an event hub.
        /// </summary>
        /// <param name="data">EventData List to write into a eventHub.</param>
        /// <returns>Nothing on success.</returns>
        public async Task SendBatchAsync(IEnumerable<EventData> data)
        {
            Requires.NotNullEmptyOrNullElements(data, nameof(data));

            await this.PerformActionAsync(
                "SendBatchAsync",
                async cEventHub =>
                {
                    DateTimeOffset start = DateTimeOffset.UtcNow;
                    Stopwatch eventHubSendWatch = Stopwatch.StartNew();
                    int counter = 0;
                    var dataArray = data.ToArray();
                    int batchSize = dataArray.Length;
                    try
                    {
                        do
                        {
                            using EventDataBatch eventBatch = await cEventHub.CreateBatchAsync().ConfigureAwait(false);

                            while (counter < batchSize && eventBatch.TryAdd(dataArray[counter]))
                            {
                                counter++;
                            }

                            await cEventHub.SendAsync(eventBatch).ConfigureAwait(false);
                        }
                        while (counter < batchSize);
                    }
                    finally
                    {
                        eventHubSendWatch.Stop();
                        Instrument.Logger.LogDependency("AAA64FB1-62A5-4135-BBFF-C6EAD23D7F4B", "FailOverEventHubClient", this.Name, "EventHub", "SendBatchAsync", start, eventHubSendWatch.Elapsed, "Success", true, new Dictionary<string, string>(), new Dictionary<string, double>());
                    }
                }).ConfigureAwait(false);
        }
    }
}