// <copyright file="EventHubBatchLogHandler.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Diagnostics.CodeAnalysis;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Threading.Tasks.Dataflow;
    using global::Azure.Messaging.EventHubs;
    using MCAPSHelpVnext.Common.Messaging;

    /// <summary>
    /// Log batch writer for EventHubs.
    /// </summary>
    /// <seealso cref="System.IDisposable" />
    internal class EventHubBatchLogHandler : IDisposable
    {

        private const int intMaxDegreeOfParallelism = 2;
        private const int intBoundedCapacity = 32;

        /// <summary>
        /// The batch block data.
        /// </summary>
        private readonly BatchBlock<EventData> batcher;

        /// <summary>
        /// The event hub client.
        /// </summary>
        private readonly FailOverEventHubClient client;

        /// <summary>
        /// The buffer block.
        /// </summary>
        private readonly BufferBlock<EventData> buffer;

        /// <summary>
        /// The disposables.
        /// </summary>
        private readonly IDisposable[] disposables;

        /// <summary>
        /// The publisher action block.
        /// </summary>
        private readonly ActionBlock<EventData[]> publisher;

        /// <summary>
        /// The window timer.
        /// </summary>
        private readonly Timer windowTimer;

        /// <summary>
        /// The dispose count.
        /// </summary>
        private int disposeCount;

        /// <summary>
        /// The dropped events.
        /// </summary>
        private long droppedEvents;

        /// <summary>
        /// The dropped events total.
        /// </summary>
        private long droppedEventsTotal;

        /// <summary>
        /// The disposed state.
        /// </summary>
        private bool isDisposed = false;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventHubBatchLogHandler"/> class.
        /// </summary>
        /// <param name="client">The EventHub client.</param>
        /// <param name="bufferCapacity">The buffer capacity.</param>
        /// <param name="blockCapacity">The block capacity.</param>
        /// <param name="timeWindow">The time window.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        public EventHubBatchLogHandler(FailOverEventHubClient client, int bufferCapacity, int blockCapacity, int timeWindow, CancellationToken cancellationToken)
        {
         

            this.client = client;

            this.buffer = new BufferBlock<EventData>(
                new ExecutionDataflowBlockOptions
                {
                    BoundedCapacity = bufferCapacity,
                    CancellationToken = cancellationToken,
                });

            this.batcher = new BatchBlock<EventData>(
                blockCapacity,
                new GroupingDataflowBlockOptions
                {
                    BoundedCapacity = blockCapacity,
                    Greedy = true,
                    CancellationToken = cancellationToken,
                });

            this.publisher = new ActionBlock<EventData[]>(
                async e => await this.Publish(e).ConfigureAwait(false),
                new ExecutionDataflowBlockOptions
                {
                    MaxDegreeOfParallelism = intMaxDegreeOfParallelism,
                    BoundedCapacity = intBoundedCapacity,
                    CancellationToken = cancellationToken,
                });

            this.disposables = new[]
            {
                this.buffer.LinkTo(this.batcher),
                this.batcher.LinkTo(this.publisher),
            };

            this.windowTimer = new Timer(this.Flush, null, TimeSpan.FromSeconds(timeWindow), TimeSpan.FromSeconds(timeWindow));
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public async void Dispose()
        {
            await Dispose(true);
            GC.SuppressFinalize(this);
        }

    
        /// <summary>
        /// Posts the entry.
        /// </summary>
        /// <param name="item">The item.</param>
        public void PostEntry(EventData item)
        {
            if (!this.buffer.Post(item))
            {
                // Increase counter of dropped events
                Interlocked.Increment(ref this.droppedEvents);
            }
        }

        /// <summary>
        /// Flushes the specified state.
        /// </summary>
        /// <param name="state">The state.</param>
        public void Flush(object state = null)
        {
            if (Interlocked.Read(ref this.droppedEvents) != 0)
            {
                Interlocked.Add(ref this.droppedEventsTotal, this.droppedEvents);

                // TODO Need a place to log this
            }

            Interlocked.Exchange(ref this.droppedEvents, 0);
            this.batcher.TriggerBatch();
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected async Task Dispose(bool disposing)
        {
            if (!this.isDisposed && disposing)
            {
                if (Interlocked.Increment(ref this.disposeCount) == 1)
                {
                    if (this.windowTimer != null)
                    {
                        this.windowTimer.Dispose();
                    }

                 

                    await this.buffer.Completion;
                    await this.batcher.Completion;
                    await this.publisher.Completion;


                    foreach (IDisposable obj in this.disposables)
                    {
                        obj.Dispose();
                        
                    }

                    if (this.client != null)
                    {
                        this.client.Dispose();
                    }
                }

                this.isDisposed = true;
            }
        }

    

        
        ~EventHubBatchLogHandler()
        {
            _ = Dispose(false);
        }

        /// <summary>
        /// Publishes the specified items.
        /// </summary>
        /// <param name="items">The items.</param>
        /// <returns>The Task.</returns>
        [SuppressMessage("Design", "CA1031:Do not catch general exception types", Justification = "Error logging.")]
        private async Task Publish(EventData[] items)
        {
            try
            {
                await this.client.SendBatchAsync(items).ConfigureAwait(false);
            }
            catch
            {
                Interlocked.Add(ref this.droppedEvents, items.Length);
            }
        }
    }
}