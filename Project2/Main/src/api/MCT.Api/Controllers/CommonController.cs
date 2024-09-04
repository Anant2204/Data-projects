// <copyright file="CommonController.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.API.Controllers
{
    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics.CodeAnalysis;
    using System.Diagnostics.Tracing;

    using MCT.API.Attributes;
    using MCT.API.Extensions;
    using MCT.Business.Interfaces;
    using MCT.DataAccess;
    using MCT.DataAccess.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.KeyVault;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Newtonsoft.Json;

    /// <summary>
    /// Common Controller
    /// </summary>
    [ApiController]
    public class CommonController : BaseApiController
    {

        private readonly ICommonService commonService;
        private readonly ApplicationStateOptions applicationState;
        private readonly IKeyVaultClient keyVault;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>
        /// Initializes a new instance of the <see cref="CommonController"/> class.
        /// </summary>
        /// <param name="commonService">The common service.</param>
        /// <param name="applicationState">State of the application.</param>
        /// <param name="keyVault">State of the keyVault.</param>
        /// <param name="httpcontext">The state of httpcontext</param>
        public CommonController(ICommonService commonService, IOptions<ApplicationStateOptions> applicationState, IKeyVaultClient keyVault, IHttpContextAccessor httpcontext) : base(httpcontext)
        {
            this.commonService = commonService;
            this.applicationState = applicationState.Value;
            this.keyVault = keyVault;
            this.httpcontext = httpcontext;
        }

        /// <summary>
        /// Get LoggedIn User Privilege.
        /// </summary>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpGet]
        [Route("/v1/auth/getloggedinuserprivilege")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserPermissions))]
        public async Task<IActionResult> GetLoggedInUserPrivilege()
        {
            Instrument.Logger.LogMessage(EventLevel.Informational, "bed4948d-c29b-4ea2-a1bf-3bab60987226", $"{this.GetType()}.GetLoggedInUserPrivilege:Starting");

             string? user = this.CurrentUserAlias;
           
            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            var result = await this.commonService.GetLoggedInUserPrivilege(user).ConfigureAwait(false);

            return this.StatusCode(StatusCodes.Status200OK, result);
        }

        /// <summary>
        /// Get list of role summaries based on org and career stage
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("/v1/common/{org}/getTaxonomyDetails/{requestType}")]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TaxonomyDetailsWithIncentivePlanHierarchy))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<TaxonomyDetailsWithIncentivePlanHierarchy>> GetTaxonomyDetailsInHierarchy(string org, string requestType)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "ea0e8fb7-d9c0-42b3-be2a-8a9a5cc9ee67", $"{this.GetType()}.GetTaxonomyDetailsInHierarchy:Starting");

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

            var response = await this.commonService.GetTaxonomyDetailsInHierarchyAsync(org, requestType, user, roleList).ConfigureAwait(false);

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
        /// Get list of Organization names
        /// </summary>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// <returns>Returns list of organization names</returns>
        [HttpGet]
        [Route("/v1/common/getOrgDetails/{requestType}")]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<string?>))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<List<string?>>> GetOrgDetails(string requestType)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "db95912d-6545-47c6-a37f-96204f0c873c", $"{this.GetType()}.GetOrgDetails:Starting");

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

            var response = await this.commonService.GetOrgDetailsAsync(requestType, user, roleList).ConfigureAwait(false);

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
        /// Summarize the Content
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("/v1/common/summarize")]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<string>> SummarizeContent([FromBody][Required] string content)
        {
            try
            {
                var response = await commonService.SummarizeContent(content, this.CurrentUserAlias);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Gets the license key related to AG Grid.
        /// </summary>
        /// <response code="200">Successful operation.</response>
        /// <returns>The action result.</returns>
        [HttpGet]
        [Route("/v1/clientconfig/grid")]
        [ValidateModelState]
        [ProducesResponseType(statusCode: 200, type: typeof(string))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> GetGridSettingsAsync()
        {
            Instrument.Logger.LogMessage(EventLevel.Informational, "652b2ce4-7330-4af8-bdc8-045ffc44fb2e", $"{this.GetType()}.GetGridSettings:Starting");
            var value = await this.keyVault.GetSecretAsync(ApplicationConstants.AgGridLicenseKey).ConfigureAwait(false);

            return this.StatusCode(StatusCodes.Status200OK, value);
        }
    }
}

