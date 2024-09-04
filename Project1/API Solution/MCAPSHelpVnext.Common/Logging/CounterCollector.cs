// <copyright file="CounterCollector.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using MCAPSHelpVnext.Common.Logging.Counters;
    using MCAPSHelpVnext.Common.Logging.Models;

    /// <summary>
    /// The CounterCollector type.
    /// </summary>
    internal class CounterCollector : IDisposable
    {
        /// <summary>
        /// The counters.
        /// </summary>
        private readonly IList<CounterBase> counters;

        /// <summary>
        /// The logger.
        /// </summary>
        private readonly ILogger logger;

        /// <summary>
        /// The sampling interval.
        /// </summary>
        private readonly TimeSpan samplingInterval;

        /// <summary>
        /// The recurring timer.
        /// </summary>
        private readonly RecurringTimer timer;

        /// <summary>
        /// Initializes a new instance of the <see cref="CounterCollector"/> class.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="counters">The counters.</param>
        /// <param name="samplingInterval">The sampling interval.</param>
        internal CounterCollector(ILogger logger, List<CounterBase> counters, TimeSpan samplingInterval)
        {
            this.logger = logger;
            this.counters = counters;
            this.samplingInterval = samplingInterval;
            this.timer = new RecurringTimer();
            this.timer.Start(this.SendCounters, this.samplingInterval);
        }

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
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
            { return; }
                

            if (disposing)
            {
                if (this.timer != null)
                {
                    this.timer.Stop();
                    this.timer.Dispose();
                }
            }
            disposed = true;
        }
       
        ~CounterCollector()
        {
            Dispose(false);
        }

        /// <summary>
        /// Flushes the counters.
        /// </summary>
        public void FlushCounters() => this.SendCounters();

        /// <summary>
        /// Sends the counters.
        /// </summary>
        private void SendCounters()
        {
            // Avoid dealing with locks by avoid foreach
            int currentCount = this.counters.Count;
            DateTime now = DateTime.UtcNow;
            for (var i = 0; i < currentCount; i++)
            {
                this.SendCounter(this.counters[i], now);
            }
        }

        /// <summary>
        /// Sends the counter.
        /// </summary>
        /// <param name="counter">The counter.</param>
        /// <param name="sendStart">The send start.</param>
        private void SendCounter(CounterBase counter, DateTime sendStart)
        {
            if (counter == null)
            {
                return;
            }

            var aggregator = counter.SwapAggregator();
            if (aggregator.Count == 0)
            {
                return;
            }

            int aggPeriod = (int)(DateTimeOffset.UtcNow.ToUnixTimeSeconds() - aggregator.Start);
            if (counter is RateCounter)
            {
                // Set the count == to the amount of seconds that the aggregator was collecting data
                aggregator.Count = aggPeriod;
            }

            var message = new MetricMessage(counter.Name, aggregator);
            message.Properties.Add("AggregationPeriod", aggPeriod.ToString(CultureInfo.InvariantCulture));
            message.Timestamp = sendStart;

            if (counter.Properties != null)
            {
                foreach (KeyValuePair<string, string> props in counter.Properties)
                {
                    message.Properties[props.Key] = props.Value;
                }
            }

            this.logger.LogMetric(message);
        }
    }
}