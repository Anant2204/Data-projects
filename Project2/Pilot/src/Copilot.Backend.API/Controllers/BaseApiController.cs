//-----------------------------------------------------------------------
// <copyright file="BaseApiController.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.API.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;

    /// <summary>
    /// Base API Controller.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public abstract class BaseApiController : ControllerBase
    {
        /// <summary>
        /// The trace identifier.
        /// </summary>
        public readonly string TraceId;

        /// <summary>
        /// the details.
        /// </summary>
        public readonly string CurrentUserAlias;

        /// <summary>
        /// the details http context.
        /// </summary>
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>
        /// the Configuration.
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseApiController"/> class.
        /// </summary>
        /// <param name="httpcontext">The http context.</param>
        /// <param name="configuration">The configuration.</param>
        public BaseApiController(IHttpContextAccessor httpcontext, IConfiguration configuration)
        {
            this.httpcontext = httpcontext;
            var name = this.httpcontext?.HttpContext?.User?.Identity?.Name;
            this.TraceId = httpcontext?.HttpContext?.TraceIdentifier;
            this.configuration = configuration;
            if (!string.IsNullOrEmpty(name))
            {
                this.CurrentUserAlias = name;
            }
            else
            {
                this.CurrentUserAlias = this.configuration["TestLoginUser"] ?? string.Empty;
            }
        }
    }
}