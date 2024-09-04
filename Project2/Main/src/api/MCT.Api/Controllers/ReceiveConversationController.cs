// <copyright file="ReceiveConversationController.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.API.Controllers
{
    using System;
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
    ///  ReceiveConversationController
    /// </summary>
    [ApiController]
    public class ReceiveConversationController : BaseApiController
    {

        private readonly IReceiveConversationService _receiveConversationService;

        private readonly IConversationScriptTaxonomyService _conversationScriptTaxonomyService;
        private readonly ApplicationStateOptions applicationState;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary> Receive conversation service</summary>
        /// <param name="receiveConversationService">The receive conversation service.</param>
        /// <param name="applicationState">The applicationState.</param>
        /// <param name="conversationScriptTaxonomyService">The  conversation Taxonomy service.</param>
        /// <param name="httpcontext">The state of httpcontext</param>
        public ReceiveConversationController(IReceiveConversationService receiveConversationService,
            IConversationScriptTaxonomyService conversationScriptTaxonomyService,
            IOptions<ApplicationStateOptions> applicationState,IHttpContextAccessor httpcontext) : base(httpcontext)
        {
            _receiveConversationService = receiveConversationService;
            _conversationScriptTaxonomyService = conversationScriptTaxonomyService;
            this.applicationState = applicationState.Value;
            this.httpcontext = httpcontext;
        }


        /// <summary>Get the receive conversations list based on the manager alias and filter option  provided</summary>
        /// <param name="conversationListRequest">Conversation list request model.</param>
        /// <returns>
        ///   ReceiveConversationResponse
        /// </returns>
        [Route("/v1/conversation/receive/get")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ReceiveConversationResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ReceiveConversationResponse>> Get([FromBody][Required] ConversationListRequest conversationListRequest)
        {
            try
            {
                string responseCode = "";
                Instrument.Logger.LogMessage(EventLevel.Informational, "3826521a-557a-42fa-b805-a40ef6518e6d", $"{this.GetType()}.GetReceiveConversationList:Starting");

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


                ReceiveConversationResponse? response = await _receiveConversationService.Get(conversationListRequest, user, roleList);

                if (response == null)
                {
                    responseCode = StatusCodes.Status403Forbidden.ToString();
                    return StatusCode(StatusCodes.Status403Forbidden, null); //this.Forbid(Constants.InsufficientPermissionsErrorMessage);
                }
                else
                {
                    responseCode = StatusCodes.Status200OK.ToString();
                    return Ok(response);
                }
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, null); //this.Forbid(Constants.InsufficientPermissionsErrorMessage);
            }

        }


        /// <summary>Get the statistics related to receive conversations list based on the manager alias</summary>
        /// <param name="conversationStatisticsRequest">Conversation statistics request model.</param>
        /// <returns>
        ///   ConversationStatisticsResponse
        /// </returns>
        [Route("/v1/conversation/receive/statistics/get")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ConversationStatisticsResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ConversationStatisticsResponse>> GetStatistics([FromBody][Required] ConversationStatisticsRequest conversationStatisticsRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "3826521a-557a-123d-b805-a40ef659asgh2", $"{this.GetType()}.GetReceiveConversationsStatistic:Starting");

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

            ConversationStatisticsResponse? response = await _receiveConversationService.GetStatistics(conversationStatisticsRequest, user, roleList);
            if (response != null)
            {
                responseCode = StatusCodes.Status200OK.ToString();
                return Ok(response);
            }

            else
            {
                responseCode = StatusCodes.Status403Forbidden.ToString();
                return StatusCode(StatusCodes.Status403Forbidden, null); //this.Forbid(Constants.InsufficientPermissionsErrorMessage);
            }
        }

        /// <summary>Get the script taxonomy  based on the employee alias</summary>
        /// <param name="empAlias">Conversation Script Taxonomy  request model.</param>
        /// <returns>
        ///   EmpConversationScriptResponse
        /// </returns>
        [Route("/v1/conversation/receive/script")]
        [HttpGet]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpConversationScriptResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EmpConversationScriptResponse>> GetEmpConversationScript([FromQuery][Required] string empAlias)
        {
            string responseCode = "";
            Instrument.Logger.LogMessage(EventLevel.Informational, "98261216-1694-4a25-a66a-962826ef0895", $"{this.GetType()}.GetconversationScriptTaxonomy:Starting");

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

            EmpConversationScriptResponse? response = await _conversationScriptTaxonomyService.GetEmpConversationScript(empAlias, user, roleList, "Receive");

            if (response != null)
            {
                responseCode = StatusCodes.Status200OK.ToString();
                return Ok(response);
            }

            else
            {
                responseCode = StatusCodes.Status403Forbidden.ToString();
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
        }



        /// <summary>Completes send conversation based on the employee alias provided</summary>
        /// <param name="conversationCompleteRequest">Send Conversation complete request model.</param>
        /// <returns>
        ///   Success or failure.
        /// </returns>
        [Route("/v1/conversation/receive/complete")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        public async Task<ActionResult<bool>> CompleteReceiveConversation([FromBody][Required] List<ConversationCompletionRequest> conversationCompleteRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "1b872ffe-6a97-448b-b255-ee65e9558186", $"{this.GetType()}.CompleteReceiveConversation:Starting");

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


            bool? response = await _receiveConversationService.SetConversationComplete(conversationCompleteRequest, user, roleList);

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
