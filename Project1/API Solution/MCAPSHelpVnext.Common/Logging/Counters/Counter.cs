
// <copyright file="Counter.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Counters
{
    using System.Collections.Generic;

    /// <summary>
    /// A default counter implementation.
    /// </summary>
    /// <seealso cref="CounterBase" />
    public class Counter : CounterBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Counter"/> class.
        /// </summary>
        /// <param name="name">The counter name.</param>
        /// <param name="properties">The list of properties.</param>
        internal Counter(string name, IDictionary<string, string> properties)
            : base(name, properties)
        {
        }

        /// <summary>
        /// Adds the specified value.
        /// </summary>
        /// <param name="value">The value.</param>
        public void Add(double value)
        {
            this.TrackValue(value);
        }

        /// <summary>
        /// Increments this instance.
        /// </summary>
        public void Increment()
        {
            this.TrackValue(1);
        }
    }
}