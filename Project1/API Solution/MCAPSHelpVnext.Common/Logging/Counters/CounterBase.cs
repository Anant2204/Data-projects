// <copyright file="CounterBase.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Counters
{
    using System.Collections.Generic;
    using System.Threading;

    /// <summary>
    /// A base class implementation for a generic counter.
    /// </summary>
    public class CounterBase
    {
        /// <summary>
        /// The metric aggregator.
        /// </summary>
        private MetricAggregator aggregator;

        /// <summary>
        /// Initializes a new instance of the <see cref="CounterBase"/> class.
        /// </summary>
        /// <param name="name">The counter name.</param>
        /// <param name="properties">The list of properties.</param>
        protected CounterBase(string name, IDictionary<string, string> properties)
        {
            this.Name = name;
            this.Properties = properties;
            this.aggregator = new MetricAggregator();
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; set; }

        /// <summary>
        /// Gets the properties.
        /// </summary>
        /// <value>
        /// The properties.
        /// </value>
        public IDictionary<string, string> Properties { get; private set; }

        /// <summary>
        /// Adds the value to the counter tracker.
        /// </summary>
        /// <param name="value">The value.</param>
        internal void TrackValue(double value)
        {
            this.aggregator.TrackValue(value);
        }

        /// <summary>
        /// Swaps the aggregator.
        /// </summary>
        /// <returns>The <see cref="MetricAggregator"/>.</returns>
        internal MetricAggregator SwapAggregator()
        {
            MetricAggregator ma = this.aggregator;
            MetricAggregator nextAggregator = new MetricAggregator();
            Interlocked.Exchange(ref this.aggregator, nextAggregator);
            return ma;
        }
    }
}