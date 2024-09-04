// <copyright file="MessageData.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    using System.Diagnostics.CodeAnalysis;
    using System.Diagnostics.Tracing;
    using System.IO;
    using System.Text;
    using System.Text.Json;

    /// <summary>
    /// Standard EventData definition for logging.
    /// </summary>
    [EventData(Name = "MessageData")]
    public class MessageData
    {
        /// <summary>
        /// Gets or sets the message.
        /// </summary>
        /// <value>
        /// The message.
        /// </value>
        public string Message { get; set; }

        /// <summary>
        /// Formats the specified data for logging.
        /// </summary>
        /// <typeparam name="T">The type of the log data.</typeparam>
        /// <param name="data">The data.</param>
        /// <exception cref="InvalidDataException">Message Data very large.</exception>
        [SuppressMessage("Globalization", "CA1303:Do not pass literals as localized parameters", Justification = "System logging.")]
        public void Format<T>(T data)
        {
            var byteData = JsonSerializer.SerializeToUtf8Bytes<T>(data);
            this.Message = Encoding.UTF8.GetString(byteData);

            if (this.Message.Length > SanitizeExtensions.MaxMessageLength)
            {
                throw new InvalidDataException("Message Data very large");
            }
        }
    }
}