// <copyright file="OperationResult.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    /// <summary>
    /// Enumeration of all the possible operation results.
    /// </summary>
    public enum OperationResult
    {
        /// <summary>
        /// The operation succeeded.
        /// </summary>
        Success = 1,

        /// <summary>
        /// There is a client error on the request.
        /// </summary>
        ClientError = 2,

        /// <summary>
        /// There is a server failure.
        /// </summary>
        Failure = 3,

        /// <summary>
        /// The operation timed out.
        /// </summary>
        Timeout = 4,
    }
}