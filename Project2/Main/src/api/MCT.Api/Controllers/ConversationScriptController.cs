// <copyright file="ConversationScriptController.cs" company="Microsoft">
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
    using MCT.DataAccess.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Constants = MCT.API.Constants;

    /// <summary>
    ///   Conversation Script Controller
    /// </summary>
    [ApiController]
    public class ConversationScriptController : BaseApiController
    {
        private readonly ApplicationStateOptions applicationState;
        private readonly IConversationScriptTaxonomyService _conversationScriptTaxonomyService;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>ConversationScriptController Constructor</summary>
        /// <param name="conversationScriptTaxonomyService">The conversation taxonomy service.</param>
        /// <param name="applicationState">State of the application.</param>
        /// <param name="httpcontext">The state of httpcontext</param>      
        public ConversationScriptController(IConversationScriptTaxonomyService conversationScriptTaxonomyService,
                                              IOptions<ApplicationStateOptions> applicationState, IHttpContextAccessor httpcontext) : base(httpcontext)
        {
            _conversationScriptTaxonomyService = conversationScriptTaxonomyService;
            this.applicationState = applicationState.Value;
            this.httpcontext = httpcontext;
        }

        /// <summary>UpdateConversationScript  based on provided data</summary>
        /// <param name="conversationScriptUpdateScenarioRequest">conversationScript Update Scenario Requestmodel.</param>
        /// <returns>
        ///   bool
        /// </returns>
        [Route("/v1/conversationscript/scenario")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<bool>> UpdateConversationScript([FromBody][Required] ConversationScriptUpdateScenarioRequest conversationScriptUpdateScenarioRequest)
        {
            string responseCode = "";
            Instrument.Logger.LogMessage(EventLevel.Informational, "214dc57e-55a0-45d0-ab28-3b114197b604", $"{this.GetType()}.UpdateConversationScript:Starting");


            string? user = this.CurrentUserAlias;

            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }

            bool response = await _conversationScriptTaxonomyService.UpdateConversationScript(conversationScriptUpdateScenarioRequest, user);

            if (response == true)
            {
                responseCode = StatusCodes.Status200OK.ToString();
                return Ok(response);
            }
            else
            {
                responseCode = StatusCodes.Status500InternalServerError.ToString();
                return StatusCode(StatusCodes.Status500InternalServerError, "No record found with this data.");
            }
        }

        ///// <summary>Get the GetSpecificChanges</summary>       
        ///// <returns>
        /////   ConversationScriptScenarioResponse
        ///// </returns>
        //[Route("/v1/conversationscript/scenario")]
        //[HttpGet]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TaxonomyScriptContentResponse))]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<ActionResult<TaxonomyScriptContentResponse>> GetSpecificChanges()
        //{
        //    string responseCode = "";
        //    Instrument.Logger.LogMessage(EventLevel.Informational, "6351e317-5470-4155-b0ab-d149d9a1f400", $"{this.GetType()}.SpecificChanges:Starting");

        //    string? user = this.User?.Identity?.GetAlias();

        //    TaxonomyScriptContentResponse? response = await _conversationScriptTaxonomyService.GetSpecificChanges(user);
        //    if (response != null)
        //    {
        //        responseCode = StatusCodes.Status200OK.ToString();
        //        return Ok(response);
        //    }

        //    else
        //    {
        //        responseCode = StatusCodes.Status403Forbidden.ToString();
        //        return StatusCode(StatusCodes.Status403Forbidden, null); //this.Forbid(Constants.InsufficientPermissionsErrorMessage);
        //    }
        //}

        ///// <summary>UpdateDisciplineContext  based on provided data</summary>
        ///// <param name="disciplineContextRequest">UpdateDisciplineContext Update Scenario Requestmodel.</param>
        ///// <returns>
        /////   bool
        ///// </returns>
        //[Route("/v1/conversationscript/displinecontext")]
        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<ActionResult<bool>> UpdateDisciplineContext([FromBody][Required] DisciplineContextRequest disciplineContextRequest)
        //{
        //    var start = DateTimeOffset.UtcNow;
        //    var duration = Stopwatch.StartNew();
        //    string responseCode = "";
        //    var success = false;
        //    Instrument.Logger.LogMessage(EventLevel.Informational, "afe4453e-db71-4aa9-8a5b-ad01a201b79d", $"{this.GetType()}.UpdateDisciplineContext:Starting");

        //    try
        //    {
        //        string? user = this.User?.Identity?.GetAlias();

        //        if (user == null)
        //        {
        //            responseCode = StatusCodes.Status403Forbidden.ToString();
        //            return this.Forbid(Constants.RetrievingUserContextErrorMessage);
        //        }

        //        bool response = await _conversationScriptTaxonomyService.GetEmpConversationScript(disciplineContextRequest, user);
        //        if (response != null)
        //        {
        //            responseCode = StatusCodes.Status200OK.ToString();
        //            return Ok(response);
        //        }

        //        else
        //        {
        //            responseCode = StatusCodes.Status403Forbidden.ToString();
        //            return StatusCode(StatusCodes.Status403Forbidden, null); //this.Forbid(Constants.InsufficientPermissionsErrorMessage);
        //        }
        //    }

        //    catch (Exception ex)
        //    {
        //        Instrument.Logger.LogMessage(EventLevel.Error, "afe4453e-db71-4aa9-8a5b-ad01a201b79d", $"{this.GetType()}.UpdateDisciplineContext:Errored. {ex.Message}");
        //        responseCode = StatusCodes.Status500InternalServerError.ToString();
        //        return StatusCode(StatusCodes.Status500InternalServerError, "Server error encountered while fetching receive conversations statistics");
        //    }

        //    finally
        //    {
        //        if (this.applicationState.LogRequestResponse)
        //        {
        //            Instrument.Logger.LogRequest("afe4453e-db71-4aa9-8a5b-ad01a201b79d", "UpdateDisciplineContext", "GET", start, TimeSpan.FromMilliseconds(duration.ElapsedMilliseconds), responseCode, success);
        //        }

        //        Instrument.Logger.LogMessage(EventLevel.Informational, "afe4453e-db71-4aa9-8a5b-ad01a201b79d", $"{this.GetType()}.UpdateDisciplineContext:Exiting");
        //    }

        //}

        ///// <summary>Get the script taxonomy  based on the employee alias</summary>
        ///// <param name="empAlias">Conversation Script Taxonomy  request model.</param>
        ///// <returns>
        /////   GetDisciplineContext
        ///// </returns>
        //[Route("/v1/conversationscript/displinecontext")]
        //[HttpGet]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DisciplineContextResponse))]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<ActionResult<DisciplineContextResponse>> GetDisciplineContext([FromQuery][Required] string empAlias)
        //{
        //    var start = DateTimeOffset.UtcNow;
        //    var duration = Stopwatch.StartNew();
        //    string responseCode = "";
        //    var success = false;
        //    Instrument.Logger.LogMessage(EventLevel.Informational, "109ed215-6c00-4fac-b594-ebc965daa4bc", $"{this.GetType()}.getDisciplineContext:Starting");

        //    try
        //    {
        //        string? user = this.User?.Identity?.GetAlias();

        //        if (user == null)
        //        {
        //            responseCode = StatusCodes.Status403Forbidden.ToString();
        //            return this.Forbid(Constants.RetrievingUserContextErrorMessage);
        //        }

        //        DisciplineContextResponse? response = await _conversationScriptTaxonomyService.GetEmpConversationScript(empAlias, user);
        //        if (response != null)
        //        {
        //            responseCode = StatusCodes.Status200OK.ToString();
        //            return Ok(response);
        //        }

        //        else
        //        {
        //            responseCode = StatusCodes.Status403Forbidden.ToString();
        //            return StatusCode(StatusCodes.Status403Forbidden, null); //this.Forbid(Constants.InsufficientPermissionsErrorMessage);
        //        }
        //    }

        //    catch (Exception ex)
        //    {
        //        Instrument.Logger.LogMessage(EventLevel.Error, "109ed215-6c00-4fac-b594-ebc965daa4bc", $"{this.GetType()}.getDisciplineContext:Errored. {ex.Message}");
        //        responseCode = StatusCodes.Status500InternalServerError.ToString();
        //        return StatusCode(StatusCodes.Status500InternalServerError, "Server error encountered while fetching receive conversations statistics");
        //    }

        //    finally
        //    {
        //        if (this.applicationState.LogRequestResponse)
        //        {
        //            Instrument.Logger.LogRequest("109ed215-6c00-4fac-b594-ebc965daa4bc", "getDisciplineContext", "GET", start, TimeSpan.FromMilliseconds(duration.ElapsedMilliseconds), responseCode, success);
        //        }

        //        Instrument.Logger.LogMessage(EventLevel.Informational, "109ed215-6c00-4fac-b594-ebc965daa4bc", $"{this.GetType()}.getDisciplineContext:Exiting");
        //    }

        //}
    }
}
