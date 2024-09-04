// <copyright file="ToolsRetriableException.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Exceptions
{
    using System;
    using System.Net;
    using System.Runtime.Serialization;

    /// <summary>
    /// The retriable communication exception type.
    /// </summary>
    [Serializable]
    public class ToolsRetriableException : ToolsCommunicationException
    {
        /// <summary>
        /// The retry interval serialization store name.
        /// </summary>
        private const string RetryAfterName = "ToolsRetriableException-RetryAfter";

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsRetriableException"/> class.
        /// </summary>
        /// <param name="uniqueId">The unique id for tagging.</param>
        /// <param name="message">The exception message.</param>
        /// <param name="targetUri">The target Uri.</param>
        /// <param name="statusCode">The <see cref="HttpStatusCode"/>.</param>
        /// <param name="retryAfter">The retry interval.</param>
        public ToolsRetriableException(string uniqueId, string message, Uri targetUri, HttpStatusCode statusCode, TimeSpan? retryAfter)
            : this(uniqueId, message, null, targetUri, statusCode, retryAfter)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsRetriableException"/> class.
        /// </summary>
        /// <param name="uniqueId">The unique id for tagging.</param>
        /// <param name="message">The exception message.</param>
        /// <param name="innerException">The inner exception.</param>
        /// <param name="targetUri">The target Uri.</param>
        /// <param name="statusCode">The <see cref="HttpStatusCode"/>.</param>
        /// <param name="retryAfter">The retry interval.</param>
        public ToolsRetriableException(string uniqueId, string message, Exception innerException, Uri targetUri, HttpStatusCode statusCode, TimeSpan? retryAfter)
            : base(uniqueId, message, innerException, targetUri, statusCode)
        {
            this.RetryAfter = retryAfter;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsRetriableException"/> class.
        /// </summary>
        /// <param name="info">The <see cref="SerializationInfo"/> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="StreamingContext"/> that contains contextual information about the source or destination.</param>
        protected ToolsRetriableException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            if (info != null)
            {
                this.RetryAfter = (TimeSpan?)info.GetValue(RetryAfterName, typeof(TimeSpan?));
            }
        }

        /// <summary>
        /// Gets the retry interval.
        /// </summary>
        public TimeSpan? RetryAfter { get; }

        /// <summary>
        /// Sets the <see cref="SerializationInfo"/> with information about the exception.
        /// </summary>
        /// <param name="info">The <see cref="SerializationInfo"/> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="StreamingContext"/> that contains contextual information about the source or destination.</param>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            if (info == null)
            {
                throw new ArgumentNullException(nameof(info));
            }

            base.GetObjectData(info, context);
            info.AddValue(RetryAfterName, this.RetryAfter);
        }
    }
}