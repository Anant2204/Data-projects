// <copyright file="CallContext.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Helpers
{
    using System.Collections.Concurrent;
    using System.Threading;

    /// <summary>
    /// Provides a way to set contextual data that flows with the call and async context of a test or invocation.
    /// </summary>
    public static class CallContext
    {
        /// <summary>
        /// The CallContext state collection.
        /// </summary>
        private static readonly ConcurrentDictionary<string, AsyncLocal<string>> State = new ConcurrentDictionary<string, AsyncLocal<string>>();

        /// <summary>
        /// Stores a given object and associates it with the specified name.
        /// </summary>
        /// <param name="name">The name with which to associate the new item in the call context.</param>
        /// <param name="data">The object to store in the call context.</param>
        public static void SetData(string name, string data) =>
            State.GetOrAdd(name, _ => new AsyncLocal<string>()).Value = data;

        /// <summary>
        /// Retrieves an object with the specified name from the <see cref="CallContext"/>.
        /// </summary>
        /// <param name="name">The name of the item in the call context.</param>
        /// <returns>The object in the call context associated with the specified name, or <see langword="null"/> if not found.</returns>
        public static string GetData(string name) =>
            State.TryGetValue(name, out AsyncLocal<string> data) ? data.Value : null;
    }
}
