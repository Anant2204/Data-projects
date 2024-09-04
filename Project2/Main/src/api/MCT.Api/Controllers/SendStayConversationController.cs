// <copyright file="SendStayConversationController.cs" company="Microsoft">
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
    ///   Send and Stay Conversation Controller
    /// </summary>
    [ApiController]
    public class SendStayConversationController : BaseApiController
    {

        private readonly ISendStayConversationService _sendStayConversationService;
        private readonly ApplicationStateOptions applicationState;
        private readonly IConversationScriptTaxonomyService _conversationScriptTaxonomyService;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>SendStayConversationService Constructor</summary>
        /// <param name="sendStayConversationService">The send stay conversation service.</param>
        /// <param name="conversationScriptTaxonomyService">The conversation taxonomy service.</param>
        /// <param name="applicationState">State of the application.</param>
        ///  <param name="httpcontext">State of the application.</param>
        public SendStayConversationController(ISendStayConversationService sendStayConversationService,
                                              IConversationScriptTaxonomyService conversationScriptTaxonomyService,
                                              IOptions<ApplicationStateOptions> applicationState, IHttpContextAccessor httpcontext) : base(httpcontext)
        {
            _sendStayConversationService = sendStayConversationService;
            _conversationScriptTaxonomyService = conversationScriptTaxonomyService;
            this.applicationState = applicationState.Value;
            this.httpcontext = httpcontext;

        }


        /// <summary>Get the send and stay conversations list based on the manager alias and filter option provided provided</summary>
        /// <param name="conversationListRequest">Conversation list request model.</param>
        /// <returns>
        ///   List of send stay conversations
        /// </returns>
        [Route("/v1/conversation/sendstay/get")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SendStayConversationResponse))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SendStayConversationResponse>> Get([FromBody][Required] ConversationListRequest conversationListRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "0c55840c-828b-4013-a834-74134dd95735", $"{this.GetType()}.GetSendStayConversationsList:Starting");

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

            SendStayConversationResponse? response = await _sendStayConversationService.Get(conversationListRequest, user, roleList);

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

        /// <summary>Completes send conversation based on the employee alias provided</summary>
        /// <param name="conversationCompleteRequest">Send Conversation complete request model.</param>
        /// <returns>
        ///   Success or failure.
        /// </returns>
        [Route("/v1/conversation/sendstay/complete")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<bool>> CompleteSendConversation([FromBody][Required] List<ConversationCompletionRequest> conversationCompleteRequest)
        {
            string responseCode = "";

            Instrument.Logger.LogMessage(EventLevel.Informational, "72918224-9f3e-40e9-ac7a-ca0bef535767", $"{this.GetType()}.CompleteSendConversation:Starting");

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

            bool? response = await _sendStayConversationService.SetConversationComplete(conversationCompleteRequest, user, roleList);

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

        /// <summary>Get the statistics related to send and stay conversations list based on the manager alias</summary>
        /// <param name="conversationStatisticsRequest">Conversation statistics request model.</param>
        /// <returns>
        ///   Statistic of send stay conversations
        /// </returns>
        [Route("/v1/conversation/sendstay/statistics/get")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ConversationStatisticsResponse))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<ConversationStatisticsResponse>> GetStatistics([FromBody][Required] ConversationStatisticsRequest conversationStatisticsRequest)
        {
            string responseCode = "";
            Instrument.Logger.LogMessage(EventLevel.Informational, "e2a5a9c9-7371-4eee-949a-6a7ace9a4672", $"{this.GetType()}.GetSendStayStatistic:Starting");

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

            ConversationStatisticsResponse? response = await _sendStayConversationService.GetStatistics(conversationStatisticsRequest, user, roleList);
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

        /// <summary>Get the script taxonomy  based on the employee alias</summary>
        /// <param name="empAlias">Conversation Script Taxonomy  request model.</param>
        /// <returns>
        ///   EmpConversationScriptResponse
        /// </returns>
        [Route("/v1/conversation/sendstay/script")]
        [HttpGet]
        [ValidateModelState]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EmpConversationScriptResponse))]
        public async Task<ActionResult<EmpConversationScriptResponse>> GetEmpConversationScript([FromQuery][Required] string empAlias)
        {
            try
            {
                string responseCode = "";
                Instrument.Logger.LogMessage(EventLevel.Informational, "eb652d2e-774e-4247-b2aa-382326ed3283", $"{this.GetType()}.GetconversationScriptTaxonomy:Starting");

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

                EmpConversationScriptResponse? response = await _conversationScriptTaxonomyService.GetEmpConversationScript(empAlias, user, roleList, "Send");
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
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "No record found with this data.");
            }

        }
    }
}
