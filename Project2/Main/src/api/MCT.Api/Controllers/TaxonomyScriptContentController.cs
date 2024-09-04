// <copyright file="TaxonomyScriptContentController.cs" company="Microsoft">
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
    using MCT.DataAccess;
    using MCT.DataAccess.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Constants = MCT.API.Constants;

    /// <summary>
    ///   Taxonomy Script Content Controller
    /// </summary>
    [ApiController]
    public class TaxonomyScriptContentController : BaseApiController
    {

        private readonly ApplicationStateOptions applicationState;
        private readonly ITaxonomyScriptContentService _taxonomyScriptContentService;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>TaxonomyScriptContentController Constructor</summary>
        /// <param name="taxonomyScriptContentService">The TaxonomyScriptContent service.</param>
        /// <param name="applicationState">State of the application.</param>
        /// <param name="configuration">configuration of the application</param>
        ///  <param name="httpcontext">State of the application.</param>
        public TaxonomyScriptContentController(ITaxonomyScriptContentService taxonomyScriptContentService,
                                              IOptions<ApplicationStateOptions> applicationState,
                                              IConfiguration configuration,IHttpContextAccessor httpcontext) : base(httpcontext)
        {          
            _taxonomyScriptContentService = taxonomyScriptContentService;
            this.applicationState = applicationState.Value;
            _configuration = configuration;
            this.httpcontext = httpcontext;
        }


        /// <summary>Get the Taxonomy Script Content </summary>
        /// <returns>
        ///   List of Taxonomy Script Content 
        /// </returns>
        [Route("/v1/taxonomyScriptContent/get")]
        [HttpGet]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TaxonomyScriptContentResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TaxonomyScriptContentResponse>> Get()
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "a3efb457-abdf-4733-9418-906951b53a3e", $"{this.GetType()}.Get:Starting");

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

            TaxonomyScriptContentResponse? response = await _taxonomyScriptContentService.Get(user, roleList);

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


        /// <summary>
        /// Gets the FYManagers for script exclusion
        /// </summary>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpGet]
        [Route("/v1/taxonomyScriptContent/exclusion")]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FutureManager>))]
        public async Task<ActionResult<List<FutureManager>>> GetFYManagersForScriptExclusion([FromQuery][Required] string searchString)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "8111e6c5-e06c-48d4-9ec3-c39442248787", $"{this.GetType()}.GetFYManagersForScriptExclusion:Starting");

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

            var response = await this._taxonomyScriptContentService.GetFYManagersForScriptExclusionAsync(user, roleList, searchString).ConfigureAwait(false);

            if (response == null)
            {
                responseCode = StatusCodes.Status403Forbidden.ToString();
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            else
            {
                return this.StatusCode(StatusCodes.Status200OK, response);
            }
        }

        /// <summary>
        /// TaxonomyScriptContent GetStatistics
        /// </summary>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpGet]
        [Route("v1/taxonomyScriptContent/statistics")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TaxonomyScriptContentStatisticResponse))]
        public async Task<ActionResult<TaxonomyScriptContentStatisticResponse>> GetStatisticsAsync()
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "2a780cae-1ee7-4889-9746-51ac234963e5", $"{this.GetType()}.GetStatisticsAsync:Starting");

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

            var response = await this._taxonomyScriptContentService.GetStatisticsAsync(user, roleList).ConfigureAwait(false);

            if (response == null)
            {
                responseCode = StatusCodes.Status403Forbidden.ToString();
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            else
            {
                return this.StatusCode(StatusCodes.Status200OK, response);
            }
        }

        /// <summary>
        /// Get Audit Details of TaxonomyScriptContent
        /// </summary>
        /// <param name="id">ScriptId</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpGet]
        [Route("v1/taxonomyScriptContent/{id}/auditDetails")]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<TaxonomyScriptContentAuditHistoryResponse>))]
        public async Task<ActionResult<List<TaxonomyScriptContentAuditHistoryResponse>>> GetAuditDetailsAsync([FromRoute][Required] int id)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "b2334b5b-ded2-46c1-8168-afd61fac0302", $"{this.GetType()}.GetAuditDetailsAsync:Starting");

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

            List<TaxonomyScriptContentAuditHistoryResponse>? response = await _taxonomyScriptContentService.GetAuditDetailsAsync(id, roleList, user).ConfigureAwait(false);

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

        /// <summary>
        /// Update Status of TaxonomyScriptContent
        /// </summary>
        /// <param name="scriptId"></param>
        /// <returns>True if the update is successful, otherwise false</returns>
        [Route("/v1/taxonomyScriptContent/{scriptId}/approve")]
        [HttpPut]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(int))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateTaxonomyScriptContentStatusAsync([FromRoute] int scriptId)
        {
            Instrument.Logger.LogMessage(EventLevel.Informational, "3c3fe474-e291-452c-a013-786dd33292fc", $"{this.GetType()}.UpdateTaxonomyScriptContentStatusAsync:Starting");

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

            bool? response = await _taxonomyScriptContentService.UpdateTaxonomyScriptContentStatusAsync(scriptId, user, roleList).ConfigureAwait(false);

            if (response == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            else if (response == false)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, response);
            }
            else
            {
                return Ok(response);
            }
        }

        /// <summary>create Or Update Taxonomy Content </summary>
        /// <param name="taxonomyScriptContentUpsertRequest">taxonomyScriptContentUpsert Request model</param>
        /// <returns>
        ///   true or false based on api success
        /// </returns>
        [Route("/v1/taxonomyScriptContent/Upsert")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TaxonomyScriptContentResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TaxonomyScriptContentResponse>> CreateOrUpdateTaxonomyScriptContent([FromBody][Required] TaxonomyScriptContentUpsertRequest taxonomyScriptContentUpsertRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "a9d8f849-4a24-4de4-8de2-730fde7000e1", $"{this.GetType()}.CreateOrUpdateTaxonomyScriptContent:Starting");

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

            bool? response = await _taxonomyScriptContentService.CreateOrUpdateTaxonomyScriptContentAsync(taxonomyScriptContentUpsertRequest, user, roleList);

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

        /// <summary>create Or Update List of Taxonomy Content </summary>
        /// <param name="taxonomyScriptContentUpsertRequest">taxonomyScriptContentUpsert Request model</param>
        /// <returns>
        ///   true or false based on api success
        /// </returns>
        [Route("/v1/taxonomyScriptContent/import")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<bool>> ImportTaxonomyScriptContent([FromBody][Required] List<TaxonomyScriptContentUpsertRequest> taxonomyScriptContentUpsertRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "59b39d39-72cf-4bd0-92d2-9ee1b6660a97", $"{this.GetType()}.ImportTaxonomyScriptContent:Starting");

            string? user = this.CurrentUserAlias;
            List<string> supersUsers = _configuration[ApplicationConstants.SuperUsers]?.Split(",")?.ToList() ?? new List<string>();


            List<string>? roleList = new List<string>();

            if (HttpContext.Items["Roles"] != null)
            {
                roleList = HttpContext.Items["Roles"] as List<string>;
            }

            if (roleList == null || !roleList.Any())
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            bool? response = await _taxonomyScriptContentService.ImportTaxonomyScriptContentAsync(taxonomyScriptContentUpsertRequest, roleList, user);

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
