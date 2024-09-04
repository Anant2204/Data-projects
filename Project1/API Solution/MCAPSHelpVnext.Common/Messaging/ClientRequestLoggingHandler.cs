// <copyright file="ClientRequestLoggingHandler.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using MCAPSHelpVnext.Common.Logging;
    using Validation;

    /// <summary>
    /// A <see cref="DelegatingHandler"/> to log client requests.
    /// </summary>
    public class ClientRequestLoggingHandler : DelegatingHandler
    {
      const int statusCode = 304;

        /// <summary>
        /// Sends an HTTP request to the inner handler to send to the server as an asynchronous operation.
        /// </summary>
        /// <param name="request">The HTTP request message to send to the server.</param>
        /// <param name="cancellationToken">A cancellation token to cancel operation.</param>
        /// <returns>The task object representing the asynchronous operation.</returns>
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Requires.NotNull(request, nameof(request));
            DateTimeOffset start = DateTimeOffset.UtcNow;
            Stopwatch stopWatch = Stopwatch.StartNew();
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                // do not log the request body as it can contain pii information.
                Instrument.Logger.LogMessage(EventLevel.Verbose, "FC5F00FB-22FA-4908-B061-396886EE0F3C", $"Client Request:{request.Method} {request.RequestUri}");
                return await base.SendAsync(request, cancellationToken).ConfigureAwait(false);
            }
            finally
            {
                stopWatch.Stop();
                Instrument.Logger.LogDependency("2AA849A4-866A-40CE-AEE8-948543EC39CA", "LOGGER_PROPERTIES", $"https://+:{request.RequestUri?.Port}", "HTTP", $"{request.Method}: {request.RequestUri?.PathAndQuery}", start, stopWatch.Elapsed, response.StatusCode.ToString(), IsSuccess(response), new Dictionary<string, string>(), new Dictionary<string, double>());
            }
        }

        /// <summary>
        /// Checks if the request is a success.
        /// </summary>
        /// <param name="message">The HTTP response message.</param>
        /// <returns><c>true</c> if the response is a success, <c>false</c> otherwise.</returns>
        private static bool IsSuccess(HttpResponseMessage message) =>
            message != null && (message.IsSuccessStatusCode || (int)message.StatusCode == statusCode);
    }
}