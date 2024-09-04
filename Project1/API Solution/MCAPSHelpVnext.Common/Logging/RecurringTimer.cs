// <copyright file="RecurringTimer.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging
{
    using System;
    using System.Threading;

    /// <summary>
    /// A recurring time wrapper over the timer class.
    /// </summary>
    internal sealed class RecurringTimer : IDisposable
    {
        /// <summary>
        /// The disposed state.
        /// </summary>
        private volatile bool disposed;

        /// <summary>
        /// The timer.
        /// </summary>
        private Timer timer;

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose() => this.Dispose(true);

        /// <summary>
        /// Invoke the specified callback.
        /// </summary>
        /// <param name="callback">The callback.</param>
        /// <param name="dueTime">The next due time.</param>
        public void Start(Action callback, TimeSpan dueTime)
        {
            void TimerCallback(object state)
            {
                if (!this.disposed)
                {
                    callback();
                    this.timer.Change(dueTime, TimeSpan.FromMilliseconds(-1));
                }
            }

            this.timer = new Timer(TimerCallback, null, dueTime, TimeSpan.FromMilliseconds(-1));
        }

        /// <summary>
        /// Stops this instance.
        /// </summary>
        public void Stop() => this.timer.Change(TimeSpan.FromMilliseconds(-1), TimeSpan.FromMilliseconds(-1));

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        private void Dispose(bool disposing)
        {
            if (!this.disposed && disposing)
            {
                this.disposed = true;

                if (this.timer != null)
                {
                    this.Stop();
                    this.timer.Dispose();
                }
            }
        }
    }
}