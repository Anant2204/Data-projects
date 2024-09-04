// <copyright file="CustomEvent.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System;
    using System.Globalization;
    using System.Text.Json.Serialization;

    /// <summary>
    /// The cloud events generic object.
    /// </summary>
    /// <typeparam name="T">The type of Event Data.</typeparam>
    /// <see cref="https://github.com/cloudevents/spec/blob/v1.0/json-format.md"/>
    public class CustomEvent<T>
        where T : class
    {
        /// <summary>
        /// Gets or sets the Id.
        /// </summary>
        [JsonPropertyName("id")]
        public string Id
        {
            get => Guid.NewGuid().ToString();
            
        }

        /// <summary>
        /// Gets or sets the event source.
        /// </summary>
        [JsonPropertyName("source")]
        public string Source { get; set; }

        /// <summary>
        /// Gets or sets the Specification Version.
        /// </summary>
        [JsonPropertyName("specversion")]
        public string SpecVersion
        {
            get => "1.0";            
            
        }

        /// <summary>
        /// Gets or sets the event type.
        /// </summary>
        [JsonPropertyName("type")]
        public string EventType { get; set; }

        /// <summary>
        /// Gets or sets the event subject.
        /// </summary>
        [JsonPropertyName("subject")]
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets the time of the event.
        /// </summary>
        [JsonPropertyName("time")]
        public string Time
        {
            get => DateTime.UtcNow.ToString("yyyy-MM-dd'T'HH:mm:ssZ", CultureInfo.InvariantCulture);
           
        }

        /// <summary>
        /// Gets or sets the event data schema reference.
        /// </summary>
        [JsonPropertyName("dataschema")]
        public string DataSchema
        {
            get => "#";
            
        }

        /// <summary>
        /// Gets or sets the time of the event.
        /// </summary>
        [JsonPropertyName("datacontenttype")]
        public string DataContentType
        {
            get => "application/json";
            
        }

        /// <summary>
        /// Gets or sets the event data.
        /// </summary>
        [JsonPropertyName("data")]
        public T Data { get; set; }
    }
}
