// <copyright file="EventGridCustomTopicClient.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MCAPSHelpVnext.Common.Logging;
    using Validation;

    /// <summary>
    /// Event Grid client for posting custom events to a topic.
    /// </summary>
    public class EventGridCustomTopicClient : IEventGridCustomTopicClient
    {
        /// <summary>
        /// Content type for custom events.
        /// </summary>
        private const string CustomEventsContentType = "application/cloudevents+json";

        /// <summary>
        /// The topic endpoint.
        /// </summary>
        private readonly Uri endPoint;

        /// <summary>
        /// The <see cref="IHttpClientWrapper"/>.
        /// </summary>
        private readonly IHttpClientWrapper httpClient;

        /// <summary>
        /// Custom headers with authorization key.
        /// </summary>
        private readonly Dictionary<string, string> customHeaders;

        /// <summary>
        /// The disposed state.
        /// </summary>
        private bool disposed;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventGridCustomTopicClient"/> class.
        /// </summary>
        /// <param name="settings">The <see cref="EventGridCustomTopicClient"/>.</param>
        public EventGridCustomTopicClient(EventGridTopicSettings settings)
        {
            Requires.NotNull(settings, nameof(settings));
            Requires.NotNull(settings.TopicEndPoint, nameof(settings.TopicEndPoint));
            Requires.NotNull(settings.SasKey1, nameof(settings.SasKey1));

            this.endPoint = settings.TopicEndPoint;
            this.httpClient = new HttpClientWrapper(settings.TopicEndPoint, TimeSpan.FromMilliseconds(settings.TimeoutInMilliseconds), HttpClientWrapper.DefaultRetryPolicy);
            this.customHeaders = new Dictionary<string, string>
            {
                { Constants.EventAuthKey, settings.SasKey1 },
                { Constants.ContentTypeHeader, CustomEventsContentType },
            };
        }

        /// <summary>
        /// Disposes the current object.
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Posts the custom message to the event topic.
        /// </summary>
        /// <typeparam name="T">The type of event data.</typeparam>
        /// <param name="eventData">The <see cref="CustomEvent{T}"/>.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        public async Task PostEventAsync<T>(CustomEvent<T> eventData)
            where T : class => await this.httpClient.PostWithoutResponseContentAsync(this.endPoint, eventData, this.customHeaders).ConfigureAwait(false);

        /// <summary>
        /// Disposes the current object.
        /// </summary>
        /// <param name="disposing"><c>true</c> when called from Dispose flow.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing && !this.disposed && this.httpClient != null)
            {
                this.httpClient.Dispose();
            }

            this.disposed = true;
        }
    }
}
