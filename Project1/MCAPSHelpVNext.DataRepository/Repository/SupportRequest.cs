// <copyright file="SupportRequest.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Microsoft.IdentityModel.Protocols;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http.Headers;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using MCAPSHelpVNext.DataRepository.IRepository;
using System.Configuration;
using MCAPSHelp.Services.Managers.Permissions;
using System.Net.Http;
using MCAPSHelpVNext.DataRepository.Configurations;
using Newtonsoft.Json.Linq;


namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class SupportRequest : ISupportRequest
    {
        
        public static readonly string AICustomEvent = "MCAPSHelpVNext.APIService";
        private const string applicationJson = "application/json";

        private static string IRISAPIBasePath = MyLibraryConfiguration.Configuration["IrisSupportAPI:IRISAPIBasePath"].ToString();
        private static int RetryAttempts = Convert.ToInt32(MyLibraryConfiguration.Configuration["IrisSupportAPI:RetryAttempts"]);
        private const string bearer = "Bearer";
        private const string TooManyRequests = "TooManyRequests";
        private const string InternalServerError = "Internal Server Error";
        private const int ExponentialCount = 2;
        private const string alreadyExist = "already exist";
        private const string ResourceNotFound = "resource not found";
       



        

        /// <summary>
        /// HttpResponseMessage ExecuteAzFuncGet(string userIdentity, string token, HttpMethod method)
        /// </summary>
        /// <param name="userIdentity"></param>
        /// <param name="token"></param>
        /// <param name="method"></param>
        /// <returns></returns>
        private static HttpResponseMessage ExecuteAzFuncGet(string userIdentity, string token, HttpMethod method)
        {
            HttpResponseMessage response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.BadRequest,
                Content = new ObjectContent(typeof(string), "Failed to Initiate Call , please validate given details", new System.Net.Http.Formatting.JsonMediaTypeFormatter())
            };
            TimeSpan delay = TimeSpan.FromSeconds(2);
            int attempts = 0;
            bool loopContinues;

            do
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    HttpRequestMessage request = CreateRequest(userIdentity, token, method);
                    response = SendRequest(httpClient, request);
                    string responseString = Task.Run(() => response.Content.ReadAsStringAsync()).Result;
                    loopContinues = HandleResponse(response, responseString, ref attempts, ref delay);
                }
            }
            while (loopContinues);
            return response;
        }

        /// <summary>
        /// HttpRequestMessage CreateRequest(string userIdentity, string token, HttpMethod method)
        /// </summary>
        /// <param name="userIdentity"></param>
        /// <param name="token"></param>
        /// <param name="method"></param>
        /// <returns></returns>
        private static HttpRequestMessage CreateRequest(string userIdentity, string token, HttpMethod method)
        {
            HttpRequestMessage request = new HttpRequestMessage(method, new Uri(string.Concat(IRISAPIBasePath, "/api/SupportRequests/", userIdentity)));
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(applicationJson));
            request.Headers.Authorization = new AuthenticationHeaderValue(bearer, token);
            return request;
        }

        /// <summary>
        /// HttpResponseMessage SendRequest(HttpClient httpClient, HttpRequestMessage request)
        /// </summary>
        /// <param name="httpClient"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        private static HttpResponseMessage SendRequest(HttpClient httpClient, HttpRequestMessage request)
        {
            httpClient.Timeout = System.Threading.Timeout.InfiniteTimeSpan;
            return Task.Run(() => httpClient.SendAsync(request)).Result;
        }

        /// <summary>
        /// HandleResponse(HttpResponseMessage response, string responseString, ref int attempts, ref TimeSpan delay)
        /// </summary>
        /// <param name="response"></param>
        /// <param name="responseString"></param>
        /// <param name="attempts"></param>
        /// <param name="delay"></param>
        /// <returns></returns>
        private static bool HandleResponse(HttpResponseMessage response, string responseString, ref int attempts, ref TimeSpan delay)
        {
            if (response.IsSuccessStatusCode || response.StatusCode.Equals(HttpStatusCode.NotFound))
            {
                return false;
            }
            else if (responseString.ToUpperInvariant().Contains(TooManyRequests.ToUpperInvariant()) || responseString.ToUpperInvariant().Contains(ResourceNotFound.ToUpperInvariant()) || responseString.ToUpperInvariant().Contains(InternalServerError.ToUpperInvariant()))
            {
                var retryafter = response?.Headers?.RetryAfter;
                if (attempts == RetryAttempts)
                {
                    return false;
                }
                else if (retryafter != null)
                {
                    delay = TimeSpan.FromSeconds(Convert.ToDouble(retryafter, CultureInfo.CurrentCulture));
                }
                else
                {
                    delay = TimeSpan.FromTicks(delay.Ticks * ExponentialCount);
                }
                attempts++;
                Task.Delay(delay).Wait();
                return true;
            }
            else if (responseString.ToLower(CultureInfo.CurrentCulture).Contains(alreadyExist))
            {
                return false;
            }
            else
            {
                return false;
            }
        }


        public async Task<HttpResponseMessage> GetSupportRequestsAsync(string userIdentity)
        {
            try
            {
                if (userIdentity == null)
                {
                    return new HttpResponseMessage
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Content = new ObjectContent(typeof(string), "Input Details Should not be null", new System.Net.Http.Formatting.JsonMediaTypeFormatter())
                    };
                }

                HttpClient httpClient = new HttpClient();
                var tokenResult = await TokenHelper.GetIRISToken(httpClient);
                string token = tokenResult.AccessToken;

                if (!string.IsNullOrEmpty(token))
                {
                    var updateStatus = ExecuteAzFuncGet(userIdentity, token, HttpMethod.Get);

                    if (updateStatus.IsSuccessStatusCode)
                    {
                        string responseString = Task.Run(() => updateStatus.Content.ReadAsStringAsync()).Result;
                        var responseObject = JArray.Parse(responseString);

                        return new HttpResponseMessage
                        {
                            Content = new ObjectContent(typeof(JArray), responseObject, new System.Net.Http.Formatting.JsonMediaTypeFormatter())
                        };
                    }
                    else
                    {
                        // Construct error response using ObjectContent
                        return new HttpResponseMessage
                        {
                            StatusCode = updateStatus.StatusCode,
                            Content = new ObjectContent(typeof(string), $"Error from Azure Function: {updateStatus.ReasonPhrase}", new System.Net.Http.Formatting.JsonMediaTypeFormatter())
                        };
                    }
                }

                return new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Content = new ObjectContent(typeof(string), "Internal Server Error in Token Retrieval", new System.Net.Http.Formatting.JsonMediaTypeFormatter())
                };
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                throw; // Rethrow the exception if necessary
            }
        }
    }
}
