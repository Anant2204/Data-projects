// <copyright file="RateCounter.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Counters
{
    using System.Collections.Generic;

    /// <summary>
    /// A placeholder type to track rates.
    /// </summary>
    /// <seealso cref="Counter" />
    public class RateCounter : Counter
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RateCounter"/> class.
        /// </summary>
        /// <param name="name">The counter name.</param>
        /// <param name="properties">The list of properties.</param>
        internal RateCounter(string name, IDictionary<string, string> properties)
            : base(name, properties)
        {
        }
    }
}
