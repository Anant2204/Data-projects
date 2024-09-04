// <copyright file="RetryWithErrorHandler.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.API.Utility;
using Microsoft.Data.SqlClient;
using Polly.Retry;
using Polly;
using static WebApi.Helpers.ErrorHandlerMiddleware;
using System.Net;
using WebApi.Helpers;
using System.Text.Json;
using Azure;
using Microsoft.AspNetCore.SignalR.Protocol;
using Microsoft.Graph;
using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using MCAPSHelpVNext.Api.Services;
using MCAPSHelpVNext.API.Services;



namespace MCAPSHelpVNext.API.Helpers
{
    public class RetryWithErrorHandler
    {
        private readonly RequestDelegate _next;
        private readonly int _maxRetryAttempts;
        private readonly TimeSpan _pauseBetweenFailures;
        private readonly AsyncRetryPolicy _retryPolicy;

        private int _retryAttempt;
        private string service;
        private string _correlationID;


        public RetryWithErrorHandler(RequestDelegate next, int maxRetryAttempts, TimeSpan pauseBetweenFailures)
        {
            _next = next;
            _maxRetryAttempts = maxRetryAttempts;  //Assign the value to _maxRetryAttempts
            _pauseBetweenFailures = pauseBetweenFailures;  // Assign the value to _pauseBetweenFailures
           

            _retryPolicy = Policy
                .Handle<Exception>() //Customize this to handle specific exceptions if needed
                            .WaitAndRetryAsync(_maxRetryAttempts, retryAttempt =>
                            {
                                return _pauseBetweenFailures;
                            },
                            (exception, timeSpan, retryCount, context) =>
                            {
                                _retryAttempt = retryCount;
                                Logging.LogException(_correlationID, $"{service} - Retry Attempt:{retryCount}", exception);
                            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            var routeData = context.GetRouteData();
            service = ErrorHandling.GetRequestDetails(context);
         
            CorrelationSettings.CorrelationId = Guid.NewGuid().ToString();
            _correlationID = CorrelationSettings.CorrelationId;

            try
            {
                await _retryPolicy.ExecuteAsync(async () => {

                    await _next(context);
                });
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);

            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task HandleExceptionAsync(HttpContext context, Exception error)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            HttpStatusCode statusCode = ErrorHandling.GetStatusCode(error); // Default code if unexpected

            string errorMessage = ErrorHandling.GetDefaultMessage(Convert.ToInt32(statusCode));
        
            Logging.LogException(_correlationID, $"{service} Exception: {statusCode}-{errorMessage}", error);

            var errorResponse = ErrorHandling.ErrorResponseDetailsByError(context, error);

            await context.Response.WriteAsync(JsonConvert.SerializeObject(errorResponse));
        }

    }

  
}
