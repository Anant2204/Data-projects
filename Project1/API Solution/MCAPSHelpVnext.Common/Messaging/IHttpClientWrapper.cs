// <copyright file="IHttpClientWrapper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Messaging
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// The Http Client Wrapper type.
    /// </summary>
    public interface IHttpClientWrapper : IDisposable
    {
        /// <summary>
        /// Invokes HTTP Get method.
        /// </summary>
        /// <typeparam name="TRet">The type of the return object.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>The response object.</returns>
        Task<TRet> GetAsync<TRet>(Uri requestUri, IDictionary<string, string> customHeaders);

        /// <summary>
        /// Invokes HTTP Post method (with no response content).
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task PostWithoutResponseContentAsync<TBody>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class;

        /// <summary>
        /// Invokes HTTP Post method.
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <typeparam name="TRet">The type of the return object.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>The response object.</returns>
        Task<TRet> PostAsync<TBody, TRet>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class;

        /// <summary>
        /// Invokes HTTP Put method (with no response content).
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task PutWithoutResponseContentAsync<TBody>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class;

        /// <summary>
        /// Invokes HTTP Put method.
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <typeparam name="TRet">The type of the return object.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>The response object.</returns>
        Task<TRet> PutAsync<TBody, TRet>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class;

        /// <summary>
        /// Invokes HTTP Delete method (with no response content).
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task DeleteWithoutResponseContentAsync<TBody>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class;

        /// <summary>
        /// Invokes HTTP Delete method.
        /// </summary>
        /// <typeparam name="TBody">The type of the message body content.</typeparam>
        /// <typeparam name="TRet">The type of the return object.</typeparam>
        /// <param name="requestUri">The request Uri.</param>
        /// <param name="entity">The content object.</param>
        /// <param name="customHeaders">Custom headers to be applied to the request.</param>
        /// <returns>The response object.</returns>
        Task<TRet> DeleteAsync<TBody, TRet>(Uri requestUri, TBody entity, IDictionary<string, string> customHeaders)
            where TBody : class;
    }
}