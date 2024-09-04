// <copyright file="MetricAggregator.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Counters
{
    using System;
    using System.Threading;

    /// <summary>
    /// An aggregator implementation to track metrics.
    /// </summary>
    internal class MetricAggregator
    {
        /// <summary>
        /// The track lock.
        /// </summary>
        private SpinLock trackLock = default;

        /// <summary>
        /// Initializes a new instance of the <see cref="MetricAggregator"/> class.
        /// </summary>
        public MetricAggregator()
        {
            this.Start = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        }

        /// <summary>
        /// Gets the start in Unix Time Seconds format.
        /// </summary>
        /// <value>
        /// The start.
        /// </value>
        public long Start { get; }

        /// <summary>
        /// Gets or sets the count.
        /// </summary>
        /// <value>
        /// The count.
        /// </value>
        public int Count { get; internal set; }

        /// <summary>
        /// Gets the sum.
        /// </summary>
        /// <value>
        /// The sum.
        /// </value>
        public double Sum { get; private set; }

        /// <summary>
        /// Gets the sum of squares.
        /// </summary>
        /// <value>
        /// The sum of squares.
        /// </value>
        public double SumOfSquares { get; private set; }

        /// <summary>
        /// Gets the minimum value.
        /// </summary>
        /// <value>
        /// The minimum.
        /// </value>
        public double Min { get; private set; }

        /// <summary>
        /// Gets the maximum value.
        /// </summary>
        /// <value>
        /// The maximum.
        /// </value>
        public double Max { get; private set; }

        /// <summary>
        /// Gets the average.
        /// </summary>
        /// <value>
        /// The average.
        /// </value>
        public double Average => this.Count == 0 ? 0 : this.Sum / this.Count;

        /// <summary>
        /// Gets the variance.
        /// </summary>
        /// <value>
        /// The variance.
        /// </value>
        public double Variance => this.Count == 0 ? 0 : (this.SumOfSquares / this.Count) - (this.Average * this.Average);

        /// <summary>
        /// Gets the standard deviation.
        /// </summary>
        /// <value>
        /// The standard deviation.
        /// </value>
        public double StandardDeviation => Math.Sqrt(this.Variance);

        /// <summary>
        /// Tracks the value.
        /// </summary>
        /// <param name="value">The value.</param>
        public void TrackValue(double value)
        {
            bool lockAcquired = false;

            try
            {
                this.trackLock.Enter(ref lockAcquired);

                if (value < this.Min)
                {
                    this.Min = value;
                }

                if (value > this.Max)
                {
                    this.Max = value;
                }

                this.Count++;
                this.Sum += value;
                this.SumOfSquares += value * value;
            }
            finally
            {
                if (lockAcquired)
                {
                    this.trackLock.Exit();
                }
            }
        }
    }
}