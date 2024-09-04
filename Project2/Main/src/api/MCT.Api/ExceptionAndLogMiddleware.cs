// <copyright file="ExceptionAndLogMiddleware.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.API
{
    using System;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Text;
    using MCT.API.Attributes;

    using Microsoft.AspNetCore;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    /// <summary>
    ///  Custom middleware for Exception and logging 
    /// </summary>
    public class ExceptionAndLogMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ApplicationStateOptions applicationState;

        /// <summary>
        /// Initializes a new instance of the <see cref="ExceptionAndLogMiddleware"/> class.
        /// </summary>
        /// <param name="next">The next.</param>
        /// <param name="applicationState">State of the application.</param>
        public ExceptionAndLogMiddleware(RequestDelegate next, IOptions<ApplicationStateOptions> applicationState)
        {
            _next = next;
            this.applicationState = applicationState.Value;
        }
        /// <summary>
        /// Invokes the asynchronous.
        /// </summary>
        /// <param name="context">The context.</param>
        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            var startTime = DateTimeOffset.UtcNow;
            string? controllerName = string.Empty;
            string? actionName = string.Empty;
            var success = false;
            bool isExceptionRaised = false;
            try
            {
                var request = context.Request;
                controllerName = Convert.ToString(request.RouteValues["controller"]) ?? string.Empty;
                actionName = Convert.ToString(request.RouteValues["action"]) ?? string.Empty;

                await _next(context);
            }
            catch (BadHttpRequestException ex)
            {
                var response = context.Response;

                response.ContentType = "text/plain; charset=utf-8";

                var httpStatusCode = ex.StatusCode;

                await HandleSpecificExceptionResponseAsync(context, httpStatusCode, ex.Message);

                isExceptionRaised = true;

                LogException(context, ex, stopwatch.ElapsedMilliseconds, ex.Message, controllerName, actionName);
            }
            catch (Exception ex)
            {
                var response = context.Response;

                response.ContentType = "text/plain; charset=utf-8";

                var httpStatusCode = StatusCodes.Status500InternalServerError;

                string message = $"Server error encountered while calling action {actionName} in {controllerName}";

                await HandleSpecificExceptionResponseAsync(context, httpStatusCode, message);

                isExceptionRaised = true;

                LogException(context, ex, stopwatch.ElapsedMilliseconds, message, controllerName, actionName);
            }

            finally
            {
                success = context.Response.StatusCode == StatusCodes.Status200OK ? true : false;

                if (isExceptionRaised)
                {
                    success = false;
                }

                stopwatch.Stop();
                LogExecutionTime(context, stopwatch.ElapsedMilliseconds, startTime, success, controllerName, actionName);
            }
        }
        /// <summary>
        /// Handles the specific exception response asynchronous.
        /// </summary>
        /// <param name="httpContext">The HTTP context.</param>
        /// <param name="httpStatusCode">The HTTP status code.</param>
        /// <param name="message">The message.</param>
        private async Task HandleSpecificExceptionResponseAsync(HttpContext httpContext, int httpStatusCode, string message)
        {
            httpContext.Response.Clear();
            httpContext.Response.ContentType = "text/plain; charset=utf-8";
            httpContext.Response.StatusCode = (int)httpStatusCode;
            await httpContext.Response.WriteAsync(message, Encoding.UTF8);
        }

        /// <summary>
        /// Logs the execution time.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="executionTime">The execution time.</param>
        /// <param name="startTime">The start time.</param>
        /// <param name="success">if set to <c>true</c> [success].</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="actionName">Name of the action.</param>
        private void LogExecutionTime(HttpContext context, long executionTime, DateTimeOffset startTime, bool success, string controllerName, string actionName)
        {
            string keyToCheck = $"{controllerName}#{actionName}";

            if (GuidConstants.ActionGuids.ContainsKey(keyToCheck))
            {
                string guid = GuidConstants.ActionGuids[keyToCheck];

                if (this.applicationState.LogRequestResponse)
                {
                    Instrument.Logger.LogRequest(guid, $"{controllerName}:{actionName}", context.Request.Method.ToString(), startTime, TimeSpan.FromMilliseconds(executionTime), context.Response.StatusCode.ToString(), success);
                }

                Instrument.Logger.LogMessage(EventLevel.Informational, guid, $"{controllerName}:{actionName}:Exiting");
            }
            else
            {
                string guid = GuidConstants.ActionGuids["Default"];
                Instrument.Logger.LogMessage(EventLevel.Informational, guid, $"{controllerName}:{actionName}:Exiting");
            }
        }

        /// <summary>
        /// Logs the exception.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="exception">The exception.</param>
        /// <param name="executionTime">The execution time.</param>
        /// <param name="message">The message.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="actionName">Name of the action.</param>
        private void LogException(HttpContext context, Exception exception, long executionTime, string message, string controllerName, string actionName)
        {
            string keyToCheck = $"{controllerName}#{actionName}";
            string guid;

            if (GuidConstants.ActionGuids.ContainsKey(keyToCheck))
            {
                guid = GuidConstants.ActionGuids[keyToCheck];
            }
            else
            {
                guid = GuidConstants.ActionGuids["Default"];
            }

            Instrument.Logger.LogException(guid, message, exception);
        }
    }
}
