// <copyright file="ToolsCommunicationException.cs" company="Microsoft Corporation">
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
    /// The custom communication exception.
    /// </summary>
    [Serializable]
    public class ToolsCommunicationException : ToolsApplicationException
    {
        /// <summary>
        /// The status code serialization store name.
        /// </summary>
        private const string StatusCodeSerializationStoreName = "ToolsException-StatusCode";

        /// <summary>
        /// The target uri serialization store name.
        /// </summary>
        private const string TargetUriSerializationStoreName = "ToolsException-TargetUri";

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsCommunicationException"/> class.
        /// </summary>
        /// <param name="uniqueId">The unique id for tagging.</param>
        /// <param name="message">The exception message.</param>
        /// <param name="targetUri">The target location.</param>
        /// <param name="statusCode">The <see cref="HttpStatusCode"/>.</param>
        public ToolsCommunicationException(string uniqueId, string message, Uri targetUri, HttpStatusCode statusCode)
            : this(uniqueId, message, null, targetUri, statusCode)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsCommunicationException"/> class.
        /// </summary>
        /// <param name="uniqueId">The unique id for tagging.</param>
        /// <param name="message">The exception message.</param>
        /// <param name="innerException">The inner exception.</param>
        /// <param name="targetUri">The target location.</param>
        /// <param name="statusCode">The <see cref="HttpStatusCode"/>.</param>
        public ToolsCommunicationException(string uniqueId, string message, Exception innerException, Uri targetUri, HttpStatusCode statusCode)
            : base(uniqueId, message, innerException, true)
        {
            this.StatusCode = statusCode;
            this.TargetUri = targetUri;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsCommunicationException"/> class.
        /// </summary>
        /// <param name="info">The <see cref="SerializationInfo"/> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="StreamingContext"/> that contains contextual information about the source or destination.</param>
        protected ToolsCommunicationException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            if (info != null)
            {
                this.StatusCode = (HttpStatusCode)info.GetValue(StatusCodeSerializationStoreName, typeof(HttpStatusCode));
                this.TargetUri = (Uri)info.GetValue(StatusCodeSerializationStoreName, typeof(Uri));
            }
        }

        /// <summary>
        /// Gets the <see cref="HttpStatusCode"/>.
        /// </summary>
        public HttpStatusCode StatusCode { get; }

        /// <summary>
        /// Gets the target Uri.
        /// </summary>
        public Uri TargetUri { get; }

        /// <summary>
        /// Sets the <see cref="SerializationInfo"/> with information about the exception.
        /// </summary>
        /// <param name="info">The <see cref="SerializationInfo"/> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="StreamingContext"/> that contains contextual information about the source or destination.</param>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue(StatusCodeSerializationStoreName, this.StatusCode);
            info.AddValue(TargetUriSerializationStoreName, this.TargetUri);
        }
    }
}