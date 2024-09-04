//-----------------------------------------------------------------------
// <copyright file="ConfigurationController.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.API.Controllers
{
    using Copilot.Backend.Core.Constants;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Logger.Core;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using System.Globalization;
    using System.Net.Mime;
    using System.Threading.Tasks;

    /// <summary>
    /// Configuration controller
    /// </summary>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public class ConfigurationController : BaseApiController
    {
        /// <summary>
        /// The http context.
        /// </summary>
        private readonly IHttpContextAccessor httpcontext;

        // /// <summary>
        // /// The Copilot service
        // /// </summary>
        private readonly ICopilotBotService copilotBotService;

        // /// <summary>
        // /// The Copilot service
        // /// </summary>
        private readonly IApplicationLogging applicationLogging;

        /// <summary>
        /// The configuration.
        /// </summary>
        private readonly IConfiguration configuration;

        public ConfigurationController(IApplicationLogging applicationLogging, ICopilotBotService copilotBotService, IHttpContextAccessor httpcontext, IConfiguration configuration)
            : base(httpcontext, configuration)
        {
            this.applicationLogging = applicationLogging;
            this.copilotBotService = copilotBotService;
            this.httpcontext = httpcontext;
            this.configuration = configuration;
        }


        /// <summary>
        /// Get all configurations from azure app configurations for copliot UI
        /// </summary>
        /// <param name="appConfigurationName">parameter for app config name</param>
        /// <param name="label">parameter for label</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllAzureAppConfigurations()
        {
            var result = await this.copilotBotService.GetAllAzureAppConfigurationsForCopilotUI();
            if(result == null)
            {
                return this.BadRequest(new ErrorResponse { TraceId = this.TraceId, ErrorCode = StatusCodes.Status500InternalServerError.ToString(CultureInfo.CurrentCulture), ErrorDetail = VirtuosoCopilotConstants.GeneralExceptionMessage });
            }
            return Ok(result);
        }
    }
}
