// <copyright file="IEventGridClient.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System.Threading.Tasks;
    using global::Azure;
    using global::Azure.Messaging;

    /// <summary>
    /// The EventGrid topic client for custom events.
    /// </summary>
    public interface IEventGridClient
    {
        /// <summary>
        /// Post a custom event to configured topic.
        /// </summary>
        /// <typeparam name="T">The type of the event data.</typeparam>
        /// <param name="eventData">The <see cref="CloudEvent"/>.</param>
        /// <returns><c>true</c> is event is raised successfully, <c>false</c> otherwise.</returns>
        Task<Response> PostEventAsync(CloudEvent eventData);
    }
}
