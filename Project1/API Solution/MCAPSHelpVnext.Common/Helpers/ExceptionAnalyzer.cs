// <copyright file="ExceptionAnalyzer.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Net;
    using System.Net.Http;
    using System.Reflection;
    using System.Runtime.InteropServices;
    using System.Threading;
    using System.Threading.Tasks;
    using MCAPSHelpVnext.Common.Exceptions;

    /// <summary>
    /// Extension utilities for exception types.
    /// </summary>
    public static class ExceptionAnalyzer
    {
        /// <summary>
        /// HTTP status code for TooManyRequests.
        /// </summary>
        private const HttpStatusCode TooManyRequests = (HttpStatusCode)429;

        /// <summary>
        /// The error mappings.
        /// </summary>
        private static readonly Lazy<IReadOnlyDictionary<HttpStatusCode, Func<HttpResponseMessage, Uri, Task<Exception>>>> ErrorMappingsValue
            = new Lazy<IReadOnlyDictionary<HttpStatusCode, Func<HttpResponseMessage, Uri, Task<Exception>>>>(GetDefaultErrorMappings);

        /// <summary>
        /// Gets the error mappings for HTTP status code to exceptions.
        /// </summary>
        public static IReadOnlyDictionary<HttpStatusCode, Func<HttpResponseMessage, Uri, Task<Exception>>> ErrorMappings => ErrorMappingsValue.Value;

        

        /// <summary>
        /// Checks if the specified exception is a fatal exception.
        /// </summary>
        /// <param name="exception">The exception.</param>
        /// <returns><c>true</c> if it is a fatal exception, <c>false</c> otherwise.</returns>
        public static bool IsFatal(Exception exception)
        {
            while (exception != null)
            {
                if (IsMemoryException(exception) || IsThreadAbortOrAccessViolation(exception))
                {
                    return true;
                }

                if (IsWrappedFatalException(exception))
                {
                    exception = exception.InnerException;
                }
                else
                {
                    break;
                }
            }

            return false;
        }

        private static bool IsMemoryException(Exception exception)
        {
            return exception is OutOfMemoryException && !(exception is InsufficientMemoryException);
        }

        private static bool IsThreadAbortOrAccessViolation(Exception exception)
        {
            return exception is ThreadAbortException ||
                   exception is AccessViolationException ||
                   exception is SEHException;
        }

        private static bool IsWrappedFatalException(Exception exception)
        {
            return exception is TypeInitializationException ||
                   exception is TargetInvocationException ||
                   (exception is AggregateException aggregateException &&
                    aggregateException.InnerExceptions.Any(IsFatal));
        }


        /// <summary>
        /// Build the default error mappings dictionary.
        /// </summary>
        /// <returns>The mappings dictionary.</returns>
        private static IReadOnlyDictionary<HttpStatusCode, Func<HttpResponseMessage, Uri, Task<Exception>>> GetDefaultErrorMappings()
        {
            Dictionary<HttpStatusCode, Func<HttpResponseMessage, Uri, Task<Exception>>> mappings = new Dictionary<HttpStatusCode, Func<HttpResponseMessage, Uri, Task<Exception>>>
            {
                { HttpStatusCode.BadRequest, async (response, uri) => new ToolsCommunicationException("2C4ADF7E-7497-45B5-905F-63618813C1E0", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, HttpStatusCode.BadRequest) },
                { HttpStatusCode.Unauthorized, async (response, uri) => new ToolsCommunicationException("F8C4DCC3-20A8-4844-ABB3-0464E8C7F4A9", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, HttpStatusCode.Unauthorized) },
                { HttpStatusCode.Forbidden, async (response, uri) => new ToolsCommunicationException("63A92FA1-98EA-4BEA-8520-2A6B1A9486D3", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, HttpStatusCode.Forbidden) },
                {
                    HttpStatusCode.RequestEntityTooLarge,
                    async (response, uri) =>
                    {
                        var exceptionMessage = await GetExceptionMessageAsync(response).ConfigureAwait(false);
                        var exception = new ToolsCommunicationException(
                            "21CC0FF7-8B88-460B-8B00-6BC2EA425FA8",
                            exceptionMessage,
                            uri,
                            HttpStatusCode.RequestEntityTooLarge
                        );
                        return exception;
                    }
                },
                { HttpStatusCode.NotFound, async (response, uri) => new ToolsCommunicationException("684301AA-5ABF-4056-B2FD-A31A8F140CDC", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, HttpStatusCode.NotFound) },
                { HttpStatusCode.Conflict, async (response, uri) => new ToolsCommunicationException("4A9784B3-5FE8-429E-9DCC-76816052DE40", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, HttpStatusCode.Conflict) },
               
                 {
                    HttpStatusCode.InternalServerError,
                    async (response, uri) =>
                    {
                        var exceptionMessage = await GetExceptionMessageAsync(response).ConfigureAwait(false);
                        var exception = new ToolsCommunicationException(
                            "E4051B2B-9905-4346-B868-CE9DE922C6C4",
                            exceptionMessage,
                            uri,
                            HttpStatusCode.InternalServerError
                        );
                        return exception;
                    }
                },


                // Retry-able HttpStatusCode
                
                {
                HttpStatusCode.ServiceUnavailable,
                async (response, uri) =>
                {
                    var exceptionMessage = await GetExceptionMessageAsync(response).ConfigureAwait(false);
                    var exception = new ToolsRetriableException(
                        "C8F5B9C9-6D8B-47E5-A6C4-BC1CD694A267",
                        exceptionMessage,
                        uri,
                        HttpStatusCode.ServiceUnavailable,
                        null
                    );
                    return exception;
                }
            },

                { HttpStatusCode.RequestTimeout, async (response, uri) => new ToolsRetriableException("3B0DDEF5-1DA2-4E33-8BB8-FC8273C6DC2E", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, HttpStatusCode.RequestTimeout, null) },
                { HttpStatusCode.BadGateway, async (response, uri) => new ToolsRetriableException("50C52675-7046-4DCC-84DA-33384BE50745", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, HttpStatusCode.BadGateway, null) },
                { HttpStatusCode.GatewayTimeout, async (response, uri) => new ToolsRetriableException("BD3FD76F-1930-474A-B7FD-13DB6D3BD30C", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, HttpStatusCode.GatewayTimeout, null) },
                { TooManyRequests, async (response, uri) => new ToolsRetriableException("1C282C1D-5D31-4838-8BAF-D3E8F4D7580E", await GetExceptionMessageAsync(response).ConfigureAwait(false), uri, TooManyRequests, GetRetryAfter(response)) },
            };
            return mappings;
        }

        /// <summary>
        /// Gets the exception message from the response.
        /// </summary>
        /// <param name="response">The response message.</param>
        /// <returns>The message.</returns>
        private static async Task<string> GetExceptionMessageAsync(HttpResponseMessage response)
        {
            if (response.Content == null)
            {
                return string.Empty;
            }

            return await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        }

        /// <summary>
        /// Gets the retry interval.
        /// </summary>
        /// <param name="response">The response method.</param>
        /// <returns>The retry interval.</returns>
        private static TimeSpan? GetRetryAfter(HttpResponseMessage response) => response.Headers.RetryAfter?.Delta;
    }
}