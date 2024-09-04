// <copyright file="AuthMiddleware.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.API
{
    using System;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Security.Claims;
    using System.Text;
    using MCT.API.Extensions;
    using MCT.Business.Interfaces;
    using MCT.DataAccess;
    using MCT.DataAccess.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    /// <summary>
    /// AuthMiddleware
    /// </summary>
    public class AuthMiddleware
    { 
        private readonly RequestDelegate _next;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthMiddleware"/> class.
        /// </summary>
        /// <param name="next">The next.</param>
        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        /// <summary>
        /// Invokes the asynchronous.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="commonService"></param>
        public async Task InvokeAsync(HttpContext context, ICommonService commonService )
        {
            Instrument.Logger.LogMessage(EventLevel.Informational, "d4707f57-62eb-46e2-9e44-4e3f0c7c3892", $"Starting - {this.GetType()}.AuthMiddleware");
            var endpoint = context.GetEndpoint();
            string userAlias = string.Empty;
            string username = string.Empty;
            DateTime dateTimeNow = DateTime.UtcNow;

            if (context.User?.Identity?.IsAuthenticated == true)
            {
                //userAlias = context.User.Claims.GetAlias();
                var alias = context.User.Claims.FirstOrDefault(x => x.Type == "upn").Value;

                if (alias?.IndexOf('@') > 0)
                {
                    alias = alias[..alias.IndexOf('@')];
                }

                userAlias = alias ?? "ADMIN";
                if (userAlias == null)
                {
                    context.Response.Clear();
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    context.Response.ContentLength = 0;
                    await context.Response.WriteAsync("", Encoding.UTF8);

                    return;
                }

                var userPermissions = await commonService.GetLoggedInUserPrivilegeWithRunTimeWindowAsync(userAlias).ConfigureAwait(false);

                if (userPermissions == null || !userPermissions.Roles.Any() || !userPermissions.Permissions.Any())
                {
                    Instrument.Logger.LogMessage(EventLevel.Informational, "985b4a44-1711-41d6-8534-98f3cd2c4bb5", $"Insufficient permissions - {this.GetType()}.AuthMiddleware");
                    await this.HandleContextResponseAsync(context, Constants.AccessRestrictedMessage).ConfigureAwait(false);
                    return;
                }

                if(userPermissions.Roles.Any())
                {
                    context.Items["Roles"] = userPermissions.Roles;
                }

                if (userPermissions.StartDate != null
                    && dateTimeNow < userPermissions.StartDate // Today's date is prior to start date
                    && !(userPermissions.Roles.Contains(ApplicationConstants.AdminRole) || userPermissions.Roles.Contains(ApplicationConstants.ScriptContributorRole)))
                {
                    await this.HandleContextResponseAsync(context, Constants.ToolNotOpenedMessage).ConfigureAwait(false);
                    return;
                }
                else if ( userPermissions.EndDate != null
                    && dateTimeNow > userPermissions.EndDate // End Date is Prior to Today's date
                    && !userPermissions.Roles.Contains(ApplicationConstants.AdminRole))
                {
                    await this.HandleContextResponseAsync(context, Constants.ToolClosedMessage).ConfigureAwait(false);
                    return;
                }

                Instrument.Logger.LogMessage(EventLevel.Informational, "cbe8e497-3257-477a-b205-10a81133b254", $"Ending - {this.GetType()}.AuthMiddleware");
                await _next(context);
            }
            else
            {
                context.Response.Clear();
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentLength = 0;
                await context.Response.WriteAsync("", Encoding.UTF8);

                return;
            }
        }

        private async Task HandleContextResponseAsync(HttpContext context, string message)
        {
            context.Response.Clear();
            context.Response.ContentType = Constants.HttpContextResponseContentType;
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync(message, Encoding.UTF8);
        }
    }
}

