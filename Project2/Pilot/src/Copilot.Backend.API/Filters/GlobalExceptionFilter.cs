//-----------------------------------------------------------------------
// <copyright file="GlobalExceptionFilter.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace Copilot.Backend.API.Filters
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Net;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;
    using Copilot.Backend.Core.Constants;
    using Copilot.Backend.Core.DTO;
    using LogHelper = Copilot.Backend.Logger.Core.ApplicationLogHelper;

    /// <summary>
    ///  the details.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Filters.IExceptionFilter" />
    public class GlobalExceptionFilter : IExceptionFilter
    {
        /// <summary>
        /// the details.
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="GlobalExceptionFilter"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public GlobalExceptionFilter(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Called after an action has thrown an <see cref="T:System.Exception" />.
        /// </summary>
        /// <param name="context">The <see cref="T:Microsoft.AspNetCore.Mvc.Filters.ExceptionContext" />.</param>
        public void OnException(ExceptionContext context)
        {
            if (context != null && !context.HttpContext.Response.HasStarted)
            {
                var showExceptionMessage = Convert.ToBoolean(this.configuration["ShowExceptionMessage"], CultureInfo.InvariantCulture);
                var dict = new Dictionary<string, string>();
                var path = context.HttpContext?.Request?.Path;
                var user = context.HttpContext?.User?.Identity?.Name;
                var traceId = context.HttpContext?.TraceIdentifier;
                var actionName = context.ActionDescriptor.DisplayName;
                BotQuestionParams body = (BotQuestionParams)context.HttpContext?.Items["BotQuestionParams"];

                if (body != null)
                {
                    dict.Add("Question", body.Question ?? string.Empty);
                    dict.Add("ParentId", body.ParentId ?? string.Empty);
                    dict.Add("SessionId", body.SessionId ?? string.Empty);
                    dict.Add("ConversationId", body.ConversationId ?? string.Empty);
                }

                dict.Add("User", user ?? string.Empty);
                dict.Add("traceId", traceId ?? string.Empty);
                dict.Add("actionName", actionName ?? string.Empty);
                dict.Add("operation", path ?? string.Empty);

                LogHelper.LogError(context.Exception, dict);

                context.Result = new JsonResult(new ErrorResponse
                {
                    TraceId = traceId,
                    ErrorCode = StatusCodes.Status500InternalServerError.ToString(CultureInfo.InvariantCulture),
                    ErrorDetail = showExceptionMessage ? context.Exception.Message + " , " + context.Exception.StackTrace : VirtuosoCopilotConstants.GeneralExceptionMessage,
                });

                context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                HttpResponse response = context.HttpContext.Response;
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.ContentType = "application/json";
                response.WriteAsync(JsonConvert.SerializeObject(context.Exception.ToString()));
            }
        }
    }
}
