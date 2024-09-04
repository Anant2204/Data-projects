//-----------------------------------------------------------------------
// <copyright file="GlobalActionFilter.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace Copilot.Backend.API.Filters
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Copilot.Backend.Logger.Core;

    /// <summary>
    /// Global Action Filter.
    /// </summary>
    public class GlobalActionFilter : IActionFilter
    {
        /// <summary>
        /// OnActionExecuting.
        /// OnActionExecuting is called before any of the action method.
        /// </summary>
        /// <param name="context">Action Executing Context.</param>
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (context != null)
            {
                var dict = new Dictionary<string, string>();
                var path = context.HttpContext?.Request?.Path;
                var user = context.HttpContext?.User?.Identity?.Name;
                var traceId = context.HttpContext?.TraceIdentifier;
                var actionName = context.ActionDescriptor.DisplayName;
                var actionRouteTemplate = context.ActionDescriptor?.AttributeRouteInfo?.Template;

                foreach (var item in context.ActionArguments)
                {
                    dict.Add(item.Key, Convert.ToString(item.Value, CultureInfo.InvariantCulture));
                }

                dict.Add("User", user ?? string.Empty);
                dict.Add("traceId", traceId ?? string.Empty);
                dict.Add("actionName", actionName ?? string.Empty);
                dict.Add("operation", path ?? string.Empty);
                dict.Add("actionRouteTemplate", actionRouteTemplate ?? string.Empty);

                ApplicationLogHelper.LogInformation($"Method {actionName} started ", dict);
            }
        }

        /// <summary>
        /// OnActionExecuted is called after any of the action method is completed.
        /// </summary>
        /// <param name="context">Action excuted context.</param>
        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context != null)
            {
                var dict = new Dictionary<string, string>();
                var path = context.HttpContext?.Request?.Path;
                var user = context.HttpContext?.User?.Identity?.Name;
                var traceId = context.HttpContext?.TraceIdentifier;
                var actionName = context.ActionDescriptor.DisplayName;
                var actionRouteTemplate = context.ActionDescriptor?.AttributeRouteInfo?.Template;

                dict.Add("User", user ?? string.Empty);
                dict.Add("traceId", traceId ?? string.Empty);
                dict.Add("actionName", actionName ?? string.Empty);
                dict.Add("operation", path ?? string.Empty);
                dict.Add("logType", "actionCompletion");

                var statusCode = 0;
                if (context.Result == null || context.Exception != null)
                {
                    statusCode = StatusCodes.Status500InternalServerError;
                }
                else
                {
                    statusCode = context.HttpContext.Response.StatusCode;
                }

                dict.Add("statusCodeReturned", statusCode.ToString(CultureInfo.InvariantCulture));
                dict.Add("actionRouteTemplate", actionRouteTemplate ?? string.Empty);

                ApplicationLogHelper.LogInformation($"Method {actionName} completed and status code {statusCode} returned ", dict);
            }
        }
    }
}
