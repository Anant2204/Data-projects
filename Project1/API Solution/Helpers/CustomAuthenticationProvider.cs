// <copyright file="CustomAuthenticationProvider.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.API.Helpers;
using Microsoft.Graph;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;



namespace MCAPSHelpVNext.API.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public class CustomAuthenticationProvider : IAuthenticationProvider
    {
        private readonly string _accessToken;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="accessToken"></param>
        public CustomAuthenticationProvider(string accessToken)
        {
            _accessToken = accessToken;
        }

       /// <summary>
       /// 
       /// </summary>
       /// <param name="request"></param>
       /// <returns></returns>
       /// <exception cref="ArgumentNullException"></exception>
        public Task AuthenticateRequestAsync(HttpRequestMessage request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
            return Task.CompletedTask;
        }


        /// <summary>
        /// 
        /// </summary>
        public string UserToken
        {
            get { return _accessToken; }
        }
    }
}
