// <copyright file="ErrorHandling.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.API.Services;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Localization;
using Polly;
using System;
using System.Net;
using WebApi.Helpers;

namespace MCAPSHelpVNext.API.Utility
{
    public static class ErrorHandling
    {
       
        public static string GetDefaultMessage(int statusCode)
        {
            return DefaultMessages.TryGetValue(statusCode, out var message) ? message : "An internal server error occurred while processing the request.";
        }

        public static HttpStatusCode GetStatusCode(Exception error)
        {
            HttpStatusCode statusCode;

            switch (error)
            {
                case UnauthorizedAccessException:
                    statusCode = HttpStatusCode.Unauthorized;
                    break;
                case DllNotFoundException:
                    statusCode = HttpStatusCode.NotFound;
                    break;
                case AppException:
                    statusCode = HttpStatusCode.BadRequest;
                    break;
                case NotImplementedException:
                    statusCode = HttpStatusCode.NotImplemented;
                    break;
                case TimeoutException:
                    statusCode = HttpStatusCode.RequestTimeout;
                    break;
                case DivideByZeroException:
                case HttpRequestException:
                case ArgumentException:
                case IOException:
                case SqlException:
                    // You can map multiple exception types to the same status code if you want
                    statusCode = HttpStatusCode.InternalServerError;
                    break;

                default:
                    // Handle any other exceptions here
                    statusCode = HttpStatusCode.InternalServerError;
                    break;
            }

            return statusCode;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="error"></param>
        /// <returns></returns>
        public static ErrorResponse ErrorResponseDetailsByError(HttpContext context, Exception error)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            HttpStatusCode statusCode = GetStatusCode(error);

            string requestName = GetRequestDetails(context);

            string errorMessage = GetDefaultMessage(Convert.ToInt32(statusCode));

            errorMessage = $"{errorMessage} Unable to process request with {requestName}";

            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";


            var errorResponse = new Utility.ErrorResponse
            {
                Code = Convert.ToInt32(statusCode),
                Message = errorMessage,
                CorrelationId = CorrelationSettings.CorrelationId

            };

            return errorResponse;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="statusCode"></param>
        /// <returns></returns>
        public static ErrorResponse ErrorResponseDetailsByStatusCode(HttpContext context, int statusCode)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            string requestName = GetRequestDetails(context);
            string errorMessage = GetDefaultMessage(Convert.ToInt32(statusCode));

            errorMessage = $"{errorMessage} Unable to process request with {requestName}";

            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";

            var errorResponse = new Utility.ErrorResponse
            {
                Code = Convert.ToInt32(statusCode),
                Message = errorMessage,
                CorrelationId = CorrelationSettings.CorrelationId
            };

            return errorResponse;
        }

        public static string GetRequestDetails(HttpContext context)
        {
           
            var routeData = context.GetRouteData();
            string service = routeData?.Values["controller"]?.ToString();
            string action = routeData?.Values["action"]?.ToString();

            var serviceRequest = $"{service}/{action}";

            return serviceRequest.ToString();
        }

        private static readonly Dictionary<int, string> DefaultMessages = new Dictionary<int, string>
        {
            {400, "The request could not be understood or was missing required parameters."},
            {401, "Authentication failed or user lacks necessary permissions."},
            {403, "The authenticated user does not have permission to access this resource."},
            {404, "The requested resource could not be found."},
            {405, "The method specified in the request is not allowed for the resource."},
            {409, "Conflict - The request could not be completed due to a conflict with the current state of the target resource."},
            {500, "An internal server error occurred while processing the request."},
            {503, "The server is currently unable to handle the request due to temporary overloading or maintenance of the server."},
            {422, "Unprocessable Entity - The server understands the content type of the request entity but was unable to process the contained instructions."},
        };
    }

    public class ErrorResponse
    {
        public int Code { get; set; }
        public string Message { get; set; }

        public string CorrelationId { get; set; }
    }
}
