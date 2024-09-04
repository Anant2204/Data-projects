// <copyright file="EventGridClient.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System.Threading.Tasks;
    using global::Azure;
    using global::Azure.Identity;
    using global::Azure.Messaging;
    using global::Azure.Messaging.EventGrid;
    using Microsoft.Extensions.Options;
    using Validation;

    /// <summary>
    /// Event Grid client for posting custom events to a topic.
    /// </summary>
    public class EventGridClient : IEventGridClient
    {
        /// <summary>
        /// The <see cref="EventGridPublisherClient"/>.
        /// </summary>
        private readonly EventGridPublisherClient eventGridPublisherClient;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventGridClient"/> class.
        /// </summary>
        /// <param name="settings">The <see cref="EventGridCustomTopicClient"/>.</param>
        public EventGridClient(IOptions<EventGridTopicSettings> settings)
        {
            Requires.NotNull(settings, nameof(settings));
            Requires.NotNull(settings.Value, nameof(settings.Value));
            Requires.NotNull(settings.Value.TopicEndPoint, nameof(settings.Value.TopicEndPoint));

            this.eventGridPublisherClient = new EventGridPublisherClient(settings.Value.TopicEndPoint, new DefaultAzureCredential());
        }

        /// <summary>
        /// Posts the custom message to the event topic.
        /// </summary>
        /// <typeparam name="T">The type of event data.</typeparam>
        /// <param name="eventData">The <see cref="CloudEvent"/>.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        public async Task<Response> PostEventAsync(CloudEvent eventData)
        {
            return await this.eventGridPublisherClient.SendEventAsync(eventData).ConfigureAwait(false);
        }
    }
}
