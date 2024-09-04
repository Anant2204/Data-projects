// <copyright file="FutureMnagerCorrection.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.API.Controllers
{
    using MCT.API.Attributes;
    using MCT.API.Extensions;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Newtonsoft.Json;

    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics.CodeAnalysis;
    using System.Diagnostics.Tracing;

    /// <summary>
    ///   Future Manager Correction Controller
    /// </summary>
    [ApiController]
    public class FutureManagerCorrection : BaseApiController
    {

        private readonly IFutureManagerCorrectionService futureManagerCorrectionService;
        private readonly ApplicationStateOptions applicationState;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>
        /// Initializes a new instance of the <see cref="FutureManagerCorrection"/> class.
        /// </summary>
        /// <param name="futureManagerCorrectionService">The future manager correction service.</param>
        /// <param name="applicationState">State of the application.</param>
        /// <param name="httpcontext">The state of httpcontext</param>
        public FutureManagerCorrection(IFutureManagerCorrectionService futureManagerCorrectionService, IOptions<ApplicationStateOptions> applicationState, IHttpContextAccessor httpcontext) : base(httpcontext)
        {
            this.futureManagerCorrectionService = futureManagerCorrectionService;
            this.applicationState = applicationState.Value;
            this.httpcontext = httpcontext;
        }

        /// <summary>
        /// Get LoggedIn User Privilege.
        /// </summary>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpGet]
        [Route("/v1/futureManagerCorrection/getFutureManager")]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FutureManager))]
        [ExcludeFromCodeCoverage]
        public async Task<IActionResult> GetFutureManager([FromQuery][Required] string searchString)
        {
            Instrument.Logger.LogMessage(EventLevel.Informational, "bed4948d-c29b-4ea2-ajjf-3bab60987226", $"{this.GetType()}.GetFutureManager:Starting");

            string? user = this.CurrentUserAlias;

            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            List<FutureManager> response = new List<FutureManager>();
            response = await this.futureManagerCorrectionService.GetFutureManager(user, searchString).ConfigureAwait(false);


            return this.StatusCode(StatusCodes.Status200OK, response);
        }

        /// <summary>
        /// Updates the future manager.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [Route("/v1/futureManagerCorrection/futuremanager")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FutureManagerChangeRequest))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<FutureManagerChangeResponse>> UpdateFutureManager([FromBody][Required] FutureManagerChangeRequest request)
        {
            Instrument.Logger.LogMessage(EventLevel.Informational, "409ea077-abc5-4611-bbbb-2e93e90f7641", $"{this.GetType()}.UpdateFutureManager:Starting");

            List<string> roleList = new List<string>();
            string? user = this.CurrentUserAlias;
            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            if (HttpContext.Items["Roles"] != null)
            {
                roleList = (List<string>)HttpContext.Items["Roles"]!;
            }

            if (roleList == null || !roleList.Any())
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            FutureManagerChangeResponse? response = await futureManagerCorrectionService.UpdateFutureManager(request, user, roleList);

            if (response == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            else if (response.ResponseStatus == false)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, response.Response);
            }
            else
            {
                return Ok(response);
            }
        }

        /// <summary>
        /// Gets the future manager correction status.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("/v1/futureManagerCorrection/requests")]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK, Type = typeof(List<GetFutureManagerRequestsResult>))]
        [ProducesResponseTypeAttribute(StatusCodes.Status204NoContent, Type = typeof(NoContentResult))]
        public async Task<IActionResult> GetFutureManagerCorrectionRequests()
        {

            Instrument.Logger.LogMessage(EventLevel.Informational, "1DDD2E4D-EDED-4AAC-9E12-A04A66314E1B", $"{this.GetType()}.GetFutureManagerCorrectionRequests:Starting");
            string? user = this.CurrentUserAlias;
            List<string>? roleList = new List<string>();

            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            if (HttpContext.Items["Roles"] != null)
            {
                roleList = HttpContext.Items["Roles"] as List<string>;
            }
            if (roleList == null || !roleList.Any())
            {
                return this.BadRequest();
            }

            var statusresponse = await this.futureManagerCorrectionService.GetFutureManagerCorrectionRequest(user, roleList).ConfigureAwait(false);

            return StatusCode(StatusCodes.Status200OK, statusresponse);
        }


        /// <summary>Update status for future manager correction for provided employee alias information</summary>
        /// <param name="updateStatusOfManagerCorrectionRequest">UpdateStatus Of ManagerCorrectionRequest.</param>
        /// <returns>
        ///   Success or failure.
        /// </returns>
        [Route("/v1/futureManagerCorrection/updateStatus")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        public async Task<ActionResult<bool>> UpdateFYManagerCorrectionStatusAsync([FromBody][Required] UpdateFYManagerCorrectionStatusRequest updateStatusOfManagerCorrectionRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "3322d1d7-b264-4da4-bcc6-b05aed4c73b6", $"{this.GetType()}.UpdateStatusOfManagerCorrection:Starting");

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

            bool? response = await futureManagerCorrectionService.UpdateFYManagerCorrectionStatusAsync(updateStatusOfManagerCorrectionRequest, user, roleList).ConfigureAwait(false);

            if (response == null)
            {
                responseCode = StatusCodes.Status403Forbidden.ToString();
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            else if (response == false)
            {
                responseCode = StatusCodes.Status500InternalServerError.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, "No record found with this data.");
            }
            else
            {
                responseCode = StatusCodes.Status200OK.ToString();
                return Ok(response);
            }
        }

    }
}

