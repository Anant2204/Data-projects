// <copyright file="AddSampleHeaderToResponseHeadersOwinMiddleware.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Microsoft.Owin;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace MCAPSHelpVNext.Api.Auth
{
    /// <summary>
    /// Add sample header to response headers
    /// </summary>
    public class AddSampleHeaderToResponseHeadersOwinMiddleware : OwinMiddleware
    {
        /// <summary>
        /// Instantiates the AddSampleHeaderToResponseHeadersOwinMiddleware
        /// </summary>
        /// <param name="next"></param>
        public AddSampleHeaderToResponseHeadersOwinMiddleware(OwinMiddleware next)
            : base(next)
        {
        }
        /// <summary>
        /// Process an individual request
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void CheckParameters(IOwinContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }
        }

        /// <summary>
        /// InvokeAsync(IOwinContext context)
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task InvokeAsync(IOwinContext context)
        {
            context.Response.Headers.Add("Test", new[] { context.Request.Uri.ToString() });
            await Next.Invoke(context);
        }

        /// <summary>
        /// Invoke(IOwinContext context)
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async override Task Invoke(IOwinContext context)
        {
            CheckParameters(context);
            await InvokeAsync(context);
        }



    }
}
