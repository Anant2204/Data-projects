// <copyright file="FYSummaryController.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.API.Controllers
{
    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;

    using MCT.API.Attributes;
    using MCT.API.Extensions;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.Models;

    using Microsoft.ApplicationInsights.WindowsServer;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Constants = MCT.API.Constants;

    /// <summary>
    ///  FY Summary Controller.
    /// </summary>
    [ApiController]
    public class FYSummaryController : BaseApiController
    {
        private readonly IFYSummaryService fySummaryService;
        private readonly ApplicationStateOptions applicationState;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>FY Summary Constructor</summary>
        /// <param name="fySummaryService">FY summary service.</param>
        /// <param name="applicationState">State of the application.</param>
        /// <param name="httpcontext">The state of httpcontext</param>
        public FYSummaryController(IFYSummaryService fySummaryService, IOptions<ApplicationStateOptions> applicationState, IHttpContextAccessor httpcontext) : base(httpcontext)
        {
            this.fySummaryService = fySummaryService;
            this.applicationState = applicationState.Value;
            this.httpcontext = httpcontext;
        }

        /// <summary>Get the FY Summary statistic based on the list of manager alias provided</summary>
        /// <param name="fySummaryRequest">FY summary request model.</param>
        /// <returns>
        ///  Statistics to be shown in FY summary.
        /// </returns>
        [Route("/v1/fysummary/statistics/get")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FYSummaryStatisticsResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FYSummaryStatisticsResponse>> GetStatistics([FromBody][Required] FYSummaryRequest fySummaryRequest)
        {
            string responseCode = "";
            Instrument.Logger.LogMessage(EventLevel.Informational, "3027d971-719a-45e1-ad2b-2d3897fcaac4", $"{this.GetType()}.GetStatistics:Starting");

            string? user = this.CurrentUserAlias;

            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            List<string>? roleList = new List<string>();

            if (HttpContext.Items["Roles"] != null)
            {
                roleList = HttpContext.Items["Roles"] as List<string>;
            }

            if (roleList == null || !roleList.Any())
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            FYSummaryStatisticsResponse? response = await fySummaryService.GetStatisticsAsync(fySummaryRequest, user, roleList);

            if (response == null)
            {
                responseCode = StatusCodes.Status403Forbidden.ToString();
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            else
            {
                responseCode = StatusCodes.Status200OK.ToString();
                return Ok(response);
            }
        }

        /// <summary>Get the current year employee details based on the manager alias provided</summary>
        /// <param name="fySummaryRequest"></param>
        /// <returns>
        /// Current year employee details.
        /// </returns>
        [Route("/v1/fysummary/currentyear/get")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FYSummaryResponse))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<FYSummaryResponse>> GetCurrentYearEmployees([FromBody][Required] FYSummaryRequest fySummaryRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "4e8e72f9-a2d6-48e5-ae3a-97ac2d969927", $"{this.GetType()}.GetCurrentYearEmployees:Starting");

            string? user = this.CurrentUserAlias;

            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            List<string>? roleList = new List<string>();

            if (HttpContext.Items["Roles"] != null)
            {
                roleList = HttpContext.Items["Roles"] as List<string>;
            }

            if (roleList == null || !roleList.Any())
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            FYSummaryResponse? response = await fySummaryService.GetCurrentYearEmployeesAsync(fySummaryRequest, user, roleList);

            if (response == null)
            {
                responseCode = StatusCodes.Status403Forbidden.ToString();
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            else
            {
                responseCode = StatusCodes.Status200OK.ToString();
                return Ok(response);
            }
        }

        /// <summary>Get the future year employee details based on the manager alias provided</summary>
        /// <param name="fySummaryRequest"></param>
        /// <returns>
        /// Future year employee details.
        /// </returns>
        [Route("/v1/fysummary/futureyear/get")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FYSummaryResponse))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<FYSummaryResponse>> GetFutureYearEmployees([FromBody][Required] FYSummaryRequest fySummaryRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "356d5e11-9f29-4398-beba-741e7c8733b0", $"{this.GetType()}.GetFutureYearEmployees:Starting");

            string? user = this.CurrentUserAlias;

            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            List<string>? roleList = new List<string>();

            if (HttpContext.Items["Roles"] != null)
            {
                roleList = HttpContext.Items["Roles"] as List<string>;
            }

            if (roleList == null || !roleList.Any())
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            FYSummaryResponse? response = await fySummaryService.GetFutureYearEmployeesAsync(fySummaryRequest, user, roleList);

            if (response == null)
            {
                responseCode = StatusCodes.Status403Forbidden.ToString();
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            else
            {
                responseCode = StatusCodes.Status200OK.ToString();
                return Ok(response);
            }
        }
    }
}
