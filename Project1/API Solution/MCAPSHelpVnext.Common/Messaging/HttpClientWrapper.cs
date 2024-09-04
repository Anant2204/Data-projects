// <copyright file="HttpClientWrapper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Diagnostics.Tracing;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Text.Json;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.WebUtilities;
    using MCAPSHelpVnext.Common.Exceptions;
    using MCAPSHelpVnext.Common.Helpers;
    using MCAPSHelpVnext.Common.Logging;
    using Polly;
    using System.Resources;

    /// <summary>
    /// The HTTP Client Wrapper object.
    /// </summary>
    public sealed class HttpClientWrapper : IHttpClientWrapper
    {
        /// <summary>
        /// Class name for logging.
        /// </summary>
        private const string ClassName = nameof(HttpClientWrapper);

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(HttpClientWrapper).Assembly);

        private string _logDescription;

        /// <summary>
        /// The retry policy for the client.
        /// </summary>
        private readonly AsyncPolicy retryPolicy;

        /// <summary>
        /// API version to append to base Uri.
        /// </summary>
        private readonly string apiVersion;

        /// <summary>
        /// The <see cref="HttpClient"/>.
        /// </summary>
        private HttpClient httpClient;

        /// <summary>
        /// The disposed state.
        /// </summary>
        private bool isDisposed;

        /// <summary>
        /// Initializes a new instance of the <see cref="HttpClientWrapper"/> class.
        /// </summary>
        /// <param name="baseAddress">The base address.</param>
        /// <param name="timeout">Request timeout value.</param>
        /// <param name="retryPolicy">The retry policy as <see cref="Policy"/>.</param>
        public HttpClientWrapper(Uri baseAddress, TimeSpan timeout, AsyncPolicy retryPolicy)
            : this(null, baseAddress, timeout, retryPolicy)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HttpClientWrapper"/> class.
        /// </summary>
        /// <param name="baseAddress">The base address.</param>
        /// <param name="timeout">Request timeout value.</param>
        /// <param name="retryPolicy">The retry policy as <see cref="Policy"/>.</param>
        /// <param name="apiVersion">The API version to use.</param>
        public HttpClientWrapper(Uri baseAddress, TimeSpan timeout, AsyncPolicy retryPolicy, string apiVersion)
            : this(null, baseAddress, timeout, retryPolicy, apiVersion)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HttpClientWrapper"/> class.
        /// </summary>
        /// <param name="messageHandler">The HTTP message handler.</param>
        /// <param name="baseAddress">The base address.</param>
        /// <param name="timeout">Request timeout value.</param>
        /// <param name="retryPolicy">The retry policy as <see cref="Policy"/>.</param>
        public HttpClientWrapper(HttpMessageHandler messageHandler, Uri baseAddress, TimeSpan timeout, AsyncPolicy retryPolicy)
            : this(messageHandler, baseAddress, timeout, retryPolicy, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="HttpClientWrapper"/> class.
        /// </summary>
        /// <param name="messageHandler">The HTTP message handler.</param>
        /// <param name="baseAddress">The base address.</param>
        /// <param name="timeout">Request timeout value.</param>
        /// <param name="retryPolicy">The retry policy as <see cref="Policy"/>.</param>
        /// <param name="apiVersion">The API version.</param>
        public HttpClientWrapper(HttpMessageHandler messageHandler, Uri baseAddress, TimeSpan timeout, AsyncPolicy retryPolicy, string apiVersion)
        {
            if (messageHandler == null)
            {
                this.httpClient = HttpClientFactory.Create(new ClientRequestLoggingHandler());
            }
            else
            {
                // This scenario is only used for Mock testing do not attach ClientRequestLoggingHandler
                this.httpClient = HttpClientFactory.Create(messageHandler);
            }

            this.apiVersion = apiVersion;

            this.httpClient.BaseAddress = baseAddress;
            this.httpClient.Timeout = timeout;
            this.httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            this.httpClient.DefaultRequestHeaders.ExpectContinue = false;
            this.retryPolicy = retryPolicy;
        }

        /// <summary>
        /// Gets the default retry policy.
        /// </summary>
        public static AsyncPolicy DefaultRetryPolicy => Policy
                    .Handle<ToolsRetriableException>()
                    .WaitAndRetryAsync(
                    retryCount: 3,
                    sleepDurationProvider: (retryAttempt, context) => context.ContainsKey("RetryAfter") && context["RetryAfter"] != null ? (TimeSpan)context["RetryAfter"] : DefaultSleepDurationProvider(retryAttempt),
                    onRetry: (exception, timeSpan, context) => { Instrument.Logger.LogException("7C9CEF5D-83CD-4B79-B4C8-884B9EE06F2B", $"HTTP request failed, retrying in {timeSpan.Seconds} seconds.", exception, new Dictionary<string, string>()); });

        /// <summary>
        /// Gets teh default NoOp retry policy.
        /// </summary>
        public static AsyncPolicy NoRetryPolicy => Policy.NoOpAsync();

        /// <summary>
        /// Gets teh default sleep duration provider.
        /// </summary>
        /// <param name="retryAttempt">The retry attempt number.</param>
        /// <returns>The retry interval.</returns>
        public static TimeSpan DefaultSleepDurationProvider(int retryAttempt) => TimeSpan.FromSeconds(retryAttempt);

        /// <summary>
        /// Extract auth headers from Request.
        /// </summary>
        /// <param name="headers">The HTTP request headers collection.</param>
        /// <returns>Dictionary of headers related to auth.</returns>
        public static Dictionary<string, string> ExtractKnownHeaders(HttpRequestHeaders headers)
        {
            Dictionary<string, string> additionalHeaders = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

            // extract auth tokens
            if (headers != null && headers.TryGetValues(Constants.ActivityIdHeader, out IEnumerable<string> headerValues))
            {
                additionalHeaders.Add(Constants.ActivityIdHeader, headerValues.FirstOrDefault());
            }

            return additionalHeaders;
        }

        /// <summary>
        /// Disposes this instance.
        /// </summary>
        public void Dispose()
        {
            if (!this.isDisposed && this.httpClient != null)
            {
                this.httpClient.Dispose();
                this.httpClient = null;
            }

            this.isDisposed = true;
        }

        /// <summary>
        /// Invokes HTTP Get method.
        /// </summary>
        /// <typeparam name="TRet">The type of the return object.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>The response object.</returns>
        public async Task<TRet> GetAsync<TRet>(Uri requestUri, IDictionary<string, string> customHeaders) =>
            await this.SendAsyncWithRetry<object, TRet>(HttpMethod.Get, requestUri, customHeaders, null).ConfigureAwait(false);

        /// <summary>
        /// Invokes HTTP Post method.
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <typeparam name="TRet">The type of the return object.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>The response object.</returns>
        public async Task<TRet> PostAsync<TBody, TRet>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class => await this.SendAsyncWithRetry<TBody, TRet>(HttpMethod.Post, requestUri, customHeaders, entity).ConfigureAwait(false);

        /// <summary>
        /// Invokes HTTP Post method (with no response content).
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        public async Task PostWithoutResponseContentAsync<TBody>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class => await this.SendAsyncWithRetryNoReturn(HttpMethod.Post, requestUri, customHeaders, entity).ConfigureAwait(false);

        /// <summary>
        /// Invokes HTTP Put method.
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <typeparam name="TRet">The type of the return object.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>The response object.</returns>
        public async Task<TRet> PutAsync<TBody, TRet>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class => await this.SendAsyncWithRetry<TBody, TRet>(HttpMethod.Put, requestUri, customHeaders, entity).ConfigureAwait(false);

        /// <summary>
        /// Invokes HTTP Put method (with no response content).
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        public async Task PutWithoutResponseContentAsync<TBody>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class => await this.SendAsyncWithRetryNoReturn(HttpMethod.Put, requestUri, customHeaders, entity).ConfigureAwait(false);

        /// <summary>
        /// Invokes HTTP Delete method (with no response content).
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        public async Task DeleteWithoutResponseContentAsync<TBody>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class => await this.SendAsyncWithRetryNoReturn(HttpMethod.Delete, requestUri, customHeaders, entity).ConfigureAwait(false);

        /// <summary>
        /// Invokes HTTP Delete method.
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <typeparam name="TRet">The type of the return object.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>The response object.</returns>
        public async Task<TRet> DeleteAsync<TBody, TRet>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class => await this.SendAsyncWithRetry<TBody, TRet>(HttpMethod.Delete, requestUri, customHeaders, entity).ConfigureAwait(false);

        /// <summary>
        /// Appends the content to the <see cref="HttpRequestMessage"/>.
        /// </summary>
        /// <typeparam name="TBody">The type of the content.</typeparam>
        /// <param name="request">The request message.</param>
        /// <param name="body">The content.</param>
        private static void AddBodyAsJsonStringToMessageIfExists<TBody>(HttpRequestMessage request, TBody body)
            where TBody : class
        {
            if (body != null)
            {
                string serializedbody = JsonSerializer.Serialize<TBody>(body);
                request.Content = new StringContent(serializedbody, Encoding.UTF8, "application/json");
            }
        }

        /// <summary>
        /// Adds the <see cref="HttpContent"/> to the request message.
        /// </summary>
        /// <param name="request">The request message.</param>
        /// <param name="body">The content.</param>
        private static void AddBodyAsHttpContentToMessageIfExists(HttpRequestMessage request, HttpContent body)
        {
            if (body != null)
            {
                request.Content = body;
            }
        }

        /// <summary>
        /// Adds custom headers to the request message.
        /// </summary>
        /// <param name="requestMessage">The request message.</param>
        /// <param name="customHeaders">The custom headers.</param>
        private static void AddHeadersToMessage(HttpRequestMessage requestMessage, IDictionary<string, string> customHeaders)
        {
            if (customHeaders != null)
            {
                if (customHeaders.Keys.Contains(Constants.ContentTypeHeader))
                {
                    requestMessage.Content.Headers.ContentType = new MediaTypeHeaderValue(customHeaders[Constants.ContentTypeHeader]);
                }

                var messageHeader = customHeaders.Where(h => !string.Equals(h.Key, Constants.ContentTypeHeader, StringComparison.Ordinal));
                foreach (KeyValuePair<string, string> header in messageHeader)
                {
                    requestMessage.Headers.Add(header.Key, header.Value);
                }
            }

            string activityId = requestMessage.GetActivityId();
            if (!string.IsNullOrWhiteSpace(activityId))
            {
                Instrument.Logger.SetActivityId(activityId);
                Instrument.Logger.LogMessage(EventLevel.Informational, "B725451B-F4FB-4E4D-82EC-3E4A0E9D2690", $"Activity Id specified in request message. Setting it in {nameof(CallContext)}. Id: '{activityId}'.");
            }
            else
            {
                activityId = Instrument.Logger.GetActivityId();

                if (string.IsNullOrWhiteSpace(activityId))
                {
                    Guid start = Guid.NewGuid();
                    byte[] data = start.ToByteArray();
                    data[0] = 0x00;
                    data[1] = 0x00;
                    data[2] = 0x00;
                    data[3] = 0x00;
                    activityId = new Guid(data).ToString();
                    Instrument.Logger.SetActivityId(activityId);
                    Instrument.Logger.LogMessage(EventLevel.Warning, "C58B7EEF-6136-47DA-A3DD-D3DEA7F88CEB", $"Activity Id not specified in the {nameof(CallContext)}. Generating new Id and setting it in {nameof(CallContext)}. Id: '{activityId}'.");
                }

                requestMessage.Headers.Add(Constants.ActivityIdHeader, activityId);
            }
        }

        /// <summary>
        /// Returns the content from teh HTTP response message.
        /// </summary>
        /// <typeparam name="T">The type of the content.</typeparam>
        /// <param name="message">The response message.</param>
        /// <returns>The content.</returns>
        private static async Task<T> ReadResponseMessageAsync<T>(HttpResponseMessage message)
        {
            if (typeof(T) == typeof(HttpResponseMessage))
            {
                return (T)(object)message;
            }

            var entity = await message.Content.ReadAsStringAsync().ConfigureAwait(false);
            return JsonSerializer.Deserialize<T>(entity);
        }

        /// <summary>
        /// Appends the API version to the request uri.
        /// </summary>
        /// <param name="requestUri">The request uri.</param>
        /// <param name="apiVersion">The API version.</param>
        /// <returns>The updated uri.</returns>
        private static Uri AddApiVersionToMessageIfExists(Uri requestUri, string apiVersion)
        {
            if (string.IsNullOrWhiteSpace(apiVersion))
            {
                return requestUri;
            }

            return new Uri(QueryHelpers.AddQueryString(requestUri.ToString(), Constants.ApiVersion, apiVersion), UriKind.RelativeOrAbsolute);
        }

        /// <summary>
        /// Gets the next retry operation time out value.
        /// </summary>
        /// <param name="message">The Http response message.</param>
        /// <returns>The retry interval.</returns>
        private static TimeSpan? GetRetryAfter(HttpResponseMessage message) => message.Headers.RetryAfter?.Delta;

        /// <summary>
        /// Creates the application exception based on the response message status.
        /// </summary>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="responseMsg">The response message.</param>
        /// <returns>The application exception.</returns>
        private static async Task<Exception> CreateExceptionFromErrorMessageAsync(Uri requestUri, HttpResponseMessage responseMsg)
        {
            if (ExceptionAnalyzer.ErrorMappings.TryGetValue(responseMsg.StatusCode, out Func<HttpResponseMessage, Uri, Task<Exception>> errorResponseHandler))
            {
                return await errorResponseHandler(responseMsg, requestUri).ConfigureAwait(false);
            }

            return new ToolsApplicationException("3F7304F2-48E1-4D80-8DEE-08F5D50182A0", $"Failed to execute successfully with status code {responseMsg.StatusCode}. No mapped exception was found to provide a more detailed error.", null);
        }
                

        /// <summary>
        /// Sends the Http request using the specified method.
        /// </summary>
        /// <typeparam name="TBody">The type of the request content.</typeparam>
        /// <param name="httpMethod">The <see cref="HttpMethod"/>.</param>
        /// <param name="requestUri">The request uri.</param>
        /// <param name="customHeaders">Custom headers for the request.</param>
        /// <param name="body">The request body content.</param>
        /// <returns>The response message.</returns>
        private async Task<HttpResponseMessage> SendAsync<TBody>(HttpMethod httpMethod, Uri requestUri, IDictionary<string, string> customHeaders, TBody body)
        where TBody : class
        {
            CheckIfDisposed();

            requestUri = AddApiVersionToMessageIfExists(requestUri, this.apiVersion);
            using HttpRequestMessage request = new HttpRequestMessage(httpMethod, requestUri);
            PrepareRequestBody(request, body);
            AddHeadersToMessage(request, customHeaders);

            return await SendRequestAsync(request, requestUri);
        }

        private void CheckIfDisposed()
        {
            if (this.isDisposed)
            {
                throw new ObjectDisposedException(ClassName);
            }
        }

        private void PrepareRequestBody<TBody>(HttpRequestMessage request, TBody body)
            where TBody : class
        {
            if (body is HttpContent bodyContent)
            {
                AddBodyAsHttpContentToMessageIfExists(request, bodyContent);
            }
            else
            {
                AddBodyAsJsonStringToMessageIfExists(request, body);
            }
        }

        private async Task<HttpResponseMessage> SendRequestAsync(HttpRequestMessage request, Uri requestUri)
        {
            try
            {
                HttpResponseMessage responseMsg = await this.httpClient.SendAsync(request).ConfigureAwait(false);

                if (responseMsg == null)
                {
                    throw new InvalidOperationException($"The response message was null when executing operation {request.Method}.");
                }

                return responseMsg;
            }
            catch (Exception ex)
            {
                return HandleException(ex, request, requestUri);
            }
        }

        private HttpResponseMessage HandleException(Exception ex, HttpRequestMessage request, Uri requestUri)
        {
            switch (ex)
            {
                case AggregateException aggregateException:
                    return HandleAggregateException(aggregateException, request, requestUri);
                case TimeoutException _:
                    throw new ToolsRetriableException("B98FABE0-C8DA-4347-975B-8A7B957E1682", ex.Message, ex, requestUri, HttpStatusCode.RequestTimeout, null);
                case IOException _:
                    throw new ToolsCommunicationException("264EBAAD-8575-4956-AFC9-B6DA00FBDC00", ex.Message, ex, requestUri, HttpStatusCode.InternalServerError);
                case HttpRequestException httpRequestException:
                    return HandleHttpRequestException(httpRequestException, request, requestUri);
                case TaskCanceledException taskCanceledException:
                    return HandleTaskCanceledException(taskCanceledException, request, requestUri);
                default:
                    if (ExceptionAnalyzer.IsFatal(ex))
                    {
                        throw ex;
                    }

                    throw new ToolsApplicationException("C1BF897E-CFDE-4B01-ABC2-36EE77238070", ex.Message, ex);
            }
        }


        private HttpResponseMessage HandleAggregateException(AggregateException ex, HttpRequestMessage request, Uri requestUri)
        {
            ReadOnlyCollection<Exception> innerExceptions = ex.Flatten().InnerExceptions;
            if (innerExceptions.Any(ExceptionAnalyzer.IsFatal))
            {
                throw ex;
            }

            // Apparently HttpClient throws AggregateException when a timeout occurs.
            if (innerExceptions.Any(e => e is TimeoutException))
            {
                throw new ToolsRetriableException("0CD8CDE8-2D1F-4B4B-8B87-28346BE70AB3", ex.Message, ex, requestUri, HttpStatusCode.RequestTimeout, null);
            }

            throw new ToolsApplicationException("C3354788-4950-4278-AA4C-34A3EA0F5E91", ex.Message, ex);
        }

        private HttpResponseMessage HandleHttpRequestException(HttpRequestException ex, HttpRequestMessage request, Uri requestUri)
        {
            if (ex.InnerException != null && ex.InnerException is WebException webException)
            {
                if (webException.Status == WebExceptionStatus.ConnectFailure)
                {
                    throw new ToolsRetriableException("394952EF-28E6-4C42-9E16-0B129DE0BD95", ex.Message, ex, requestUri, HttpStatusCode.ServiceUnavailable, null);
                }
                else
                {
                    if (webException.Status == WebExceptionStatus.Timeout)
                    {
                        throw new ToolsRetriableException("C83FEDD3-0D17-4A8C-8FAB-892E30F4F9C3", ex.Message, ex, requestUri, HttpStatusCode.RequestTimeout, null);
                    }
                }

                throw new ToolsCommunicationException("1108AC2C-497B-419E-BCF0-118DF61CD046", ex.Message, ex, requestUri, HttpStatusCode.InternalServerError);
            }
            else
            {
                throw new ToolsCommunicationException("B1DBEAFC-43ED-43CE-9AB2-AC2A9DE8D74A", ex.Message, ex, requestUri, HttpStatusCode.InternalServerError);
            }
        }

        private HttpResponseMessage HandleTaskCanceledException(TaskCanceledException ex, HttpRequestMessage request, Uri requestUri)
        {
            if (!this.isDisposed)
            {
                throw new ToolsRetriableException("6EBF4DF6-9E0E-49C3-9CDF-39DEF9EA12F7", $"The {request.Method} operation timed out.", ex, requestUri, HttpStatusCode.RequestTimeout, null);
            }

            throw ex;
        }


        /// <summary>
        /// Sends the Http request using the specified method and the retry option.
        /// </summary>
        /// <typeparam name="TBody">The type of the request content.</typeparam>
        /// <param name="httpMethod">The <see cref="HttpMethod"/>.</param>
        /// <param name="requestUri">The request uri.</param>
        /// <param name="customHeaders">Custom headers for the request.</param>
        /// <param name="body">The request body content.</param>
        /// <returns>The response message.</returns>
        private async Task<TRet> SendAsyncWithRetry<TBody, TRet>(HttpMethod httpMethod, Uri requestUri, IDictionary<string, string> customHeaders, TBody body)
            where TBody : class
        {
            PolicyResult<TRet> policyResult = await this.retryPolicy.ExecuteAndCaptureAsync(
                async context =>
            {
                HttpResponseMessage responseMessage = await this.SendAsync(httpMethod, requestUri, customHeaders, body).ConfigureAwait(false);

                if (responseMessage.IsSuccessStatusCode || (int)responseMessage.StatusCode == 304)
                {
                    return await ReadResponseMessageAsync<TRet>(responseMessage).ConfigureAwait(false);
                }

                context["RetryAfter"] = GetRetryAfter(responseMessage);

                throw await CreateExceptionFromErrorMessageAsync(this.GetCallUri(requestUri), responseMessage).ConfigureAwait(false);
            }, new Dictionary<string, object>()).ConfigureAwait(false);

            if (policyResult.Outcome != OutcomeType.Successful)
            {
                Instrument.Logger.LogException("F8ED354A-E60A-48D1-BA1D-D2923ABCD677", $"Execution of HTTP call failed to {requestUri}", policyResult.FinalException, new Dictionary<string, string>());
                throw policyResult.FinalException;
            }

            return policyResult.Result;
        }

        /// <summary>
        /// Sends the Http request using the specified method.
        /// </summary>
        /// <typeparam name="TBody">The type of the request content.</typeparam>
        /// <param name="httpMethod">The <see cref="HttpMethod"/>.</param>
        /// <param name="requestUri">The request uri.</param>
        /// <param name="customHeaders">Custom headers for the request.</param>
        /// <param name="body">The request body content.</param>
        /// <returns>The task.</returns>
        private async Task SendAsyncWithRetryNoReturn<TBody>(HttpMethod httpMethod, Uri requestUri, IDictionary<string, string> customHeaders, TBody body)
            where TBody : class
        {
            
                _logDescription = rm.GetString("httpClientWrapperKey");
            PolicyResult policyResult = await this.retryPolicy.ExecuteAndCaptureAsync(
                async context =>
            {
                HttpResponseMessage responseMessage = await this.SendAsync(httpMethod, requestUri, customHeaders, body).ConfigureAwait(false);
                if (responseMessage.IsSuccessStatusCode)
                {
                    return;
                }

                context["RetryAfter"] = GetRetryAfter(responseMessage);

                throw await CreateExceptionFromErrorMessageAsync(this.GetCallUri(requestUri), responseMessage).ConfigureAwait(false);
            }, new Dictionary<string, object>()).ConfigureAwait(false);

            if (policyResult.Outcome != OutcomeType.Successful)
            {
                Instrument.Logger.LogException("B3EB7036-43BC-40C8-8194-231547026040", _logDescription, policyResult.FinalException, new Dictionary<string, string>());
                throw policyResult.FinalException;
            }
        }

        private Uri GetCallUri(Uri requestUri)
        {
            if (requestUri.IsAbsoluteUri)
            {
                return requestUri;
            }

            return new Uri(this.httpClient.BaseAddress, requestUri);
        }
    }
}