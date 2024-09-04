//-----------------------------------------------------------------------
// <copyright file="ErrorResponse.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.DTO
{
    public class ErrorResponse
    {
        /// <summary>
        /// Gets or sets the trace Id.
        /// </summary>
        /// <value>
        /// The trace Id.
        /// </value>
        public string? TraceId { get; set; }

        /// <summary>
        /// Gets or sets the error code.
        /// </summary>
        /// <value>
        /// The error code.
        /// </value>
        public string? ErrorCode { get; set; }

        /// <summary>
        /// Gets or sets the error message.
        /// </summary>
        /// <value>
        /// The error message.
        /// </value>
        public string? ErrorDetail { get; set; }
    }
}
