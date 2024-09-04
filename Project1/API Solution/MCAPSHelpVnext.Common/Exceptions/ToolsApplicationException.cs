// <copyright file="ToolsApplicationException.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Exceptions
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Custom Application Exception type.
    /// </summary>
    [Serializable]
    public class ToolsApplicationException : Exception
    {
        /// <summary>
        /// Serialization context store name.
        /// </summary>
        private const string IsTransientValueSerializationStoreName = "ToolsException-IsTransient";

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsApplicationException"/> class.
        /// </summary>
        /// <param name="uniqueId">The unique id for tagging.</param>
        /// <param name="message">The exception message.</param>
        /// <param name="innerException">The inner exception.</param>
        public ToolsApplicationException(string uniqueId, string message, Exception innerException)
            : this(uniqueId, message, innerException, false)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsApplicationException"/> class.
        /// </summary>
        /// <param name="info">The <see cref="SerializationInfo"/> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="StreamingContext"/> that contains contextual information about the source or destination.</param>
        protected ToolsApplicationException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            if (info != null)
            {
                this.IsTransient = info.GetBoolean(IsTransientValueSerializationStoreName);
            }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolsApplicationException"/> class.
        /// </summary>
        /// <param name="uniqueId">The unique id for tagging.</param>
        /// <param name="message">The exception message.</param>
        /// <param name="innerException">The inner exception.</param>
        /// <param name="isTransient"><c>true</c> if operation can be retried, <c>false</c> otherwise.</param>
        protected ToolsApplicationException(string uniqueId, string message, Exception innerException, bool isTransient)
            : base($"{uniqueId} - {message}", innerException)
        {
            this.IsTransient = isTransient;
        }

        /// <summary>
        /// Gets a value indicating whether the exception is a transient error.
        /// </summary>
        public bool IsTransient { get; }

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
            info.AddValue(IsTransientValueSerializationStoreName, this.IsTransient);
        }
    }
}