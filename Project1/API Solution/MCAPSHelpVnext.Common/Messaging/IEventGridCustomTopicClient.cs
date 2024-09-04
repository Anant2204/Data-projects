// <copyright file="IEventGridCustomTopicClient.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System;
    using System.Threading.Tasks;

    /// <summary>
    /// The EventGrid topic client for custom events.
    /// </summary>
    public interface IEventGridCustomTopicClient : IDisposable
    {
        /// <summary>
        /// Post a custom event to configured topic.
        /// </summary>
        /// <typeparam name="T">The type of the event data.</typeparam>
        /// <param name="eventData">The <see cref="CustomEvent{T}"/>.</param>
        /// <returns><c>true</c> is event is raised successfully, <c>false</c> otherwise.</returns>
        Task PostEventAsync<T>(CustomEvent<T> eventData)
            where T : class;
    }
}
