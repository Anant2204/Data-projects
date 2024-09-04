// <copyright file="TaxonomyCorrectionController.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.API.Controllers
{
    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics.Tracing;
    using MCT.API.Attributes;
    using MCT.API.Extensions;
    using MCT.Business.Interfaces;
    using MCT.Business.Services;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    /// <summary>
    /// Taxonomy Correction Controller
    /// </summary>
    [ApiController]
    public class TaxonomyCorrectionController : BaseApiController
    {
        private readonly ITaxonomyCorrectionService taxonomyCorrectionService;
        private readonly ApplicationStateOptions applicationState;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>
        /// TaxonomyCorrectionController
        /// </summary>
        /// <param name="applicationState"></param>
        /// <param name="taxonomyCorrectionService"></param>
        ///  <param name="httpcontext">State of the application.</param>
        public TaxonomyCorrectionController(IOptions<ApplicationStateOptions> applicationState, ITaxonomyCorrectionService taxonomyCorrectionService,
             IHttpContextAccessor httpcontext) : base(httpcontext)
        {
            this.applicationState = applicationState.Value;
            this.taxonomyCorrectionService = taxonomyCorrectionService;
            this.httpcontext = httpcontext;
        }


        /// <summary>
        /// Get list of role summaries based on org and career stage
        /// </summary>
        /// <param name="taxonomyRoleSummaryChangeRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("/v1/taxonomyCorrection/getTaxonomyDetails")]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TaxonomyDetailsInHierarchyResponse))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<TaxonomyRoleSummaryChangeResponse>> GetTaxonomyDetailsBasedOnOrgAndCareerStage([FromBody][Required] TaxonomyRoleSummaryChangeRequest taxonomyRoleSummaryChangeRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "da0497f8-73c6-41a1-a68f-231245dcf0df", $"{this.GetType()}.GetTaxonomyDetailsBasedOnOrgAndCareerStage:Starting");
            
            string? user = this.CurrentUserAlias;

            var response = await this.taxonomyCorrectionService.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(user, taxonomyRoleSummaryChangeRequest).ConfigureAwait(false);

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
        /// get list of taxonomy correction requests
        /// </summary>
        /// <returns>List of TaxonomyCorrection Requests</returns>
        [HttpGet]
        [Route("/v1/taxonomyCorrection/requests")]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<GetTaxonomyCorrectionRequestsResult>))]
        public async Task<ActionResult<GetTaxonomyCorrectionRequestsResult>> GetTaxonomyChangeRequestAsync()
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "abdbd329-8d5a-44a1-bb87-7f56d93bd9c2", $"{this.GetType()}.GetTaxonomyChangeRequestAsync:Starting");

            string? user = this.CurrentUserAlias;
            List<string>? roleList = new List<string>();

            if (HttpContext.Items["Roles"] != null)
            {
                roleList = HttpContext.Items["Roles"] as List<string>;
            }
            if (roleList == null || !roleList.Any())
            {
                return this.BadRequest();
            }
            List<GetTaxonomyCorrectionRequestsResult> response = await this.taxonomyCorrectionService.GetTaxonomyChangeRequestAsync(user, roleList).ConfigureAwait(false);

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
        /// Updates the taxonomy.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [Route("/v1/taxonomyCorrection/updateTaxonomy")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TaxonomyChangeRequest))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<TaxonomyCorrectionResponse>> UpdateTaxonomy([FromBody][Required] TaxonomyChangeRequest request)
        {
            Instrument.Logger.LogMessage(EventLevel.Informational, "6d2df25b-54fd-40f6-820e-55b3f0c1b5e1", $"{this.GetType()}.UpdateTaxonomy:Starting");

            List<string> roleList = new List<string>();
            string? user = this.CurrentUserAlias;
            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            string? fullName = this.User?.Claims?.GetFullName();

            if (HttpContext.Items["Roles"] != null)
            {
                roleList = (List<string>)HttpContext.Items["Roles"]!;
            }

            if (roleList == null || !roleList.Any())
            {
                return this.BadRequest();
            }

            TaxonomyCorrectionResponse? response = await taxonomyCorrectionService.SubmitTaxonomyCorrectionRequestAsync(request, user, fullName, roleList).ConfigureAwait(false);

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
    }
}
