//-----------------------------------------------------------------------
// <copyright file="CopilotController.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.API.Controllers
{
    using Copilot.Backend.API.Filters;
    using Copilot.Backend.Core.Constants;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Logger.Core;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;
    using System.Globalization;
    using System.Net.Mime;
    using System.Threading.Tasks;
    using static Copilot.Backend.Core.DTO.Enum;

    /// <summary>
    /// Copilot Controller.
    /// </summary>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ResponseDto), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ResponseDto), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ResponseDto), StatusCodes.Status400BadRequest)]
    public class CopilotController : BaseApiController
    {
        /// <summary>
        /// The http context.
        /// </summary>
        private readonly IHttpContextAccessor httpcontext;

        // /// <summary>
        // /// The Copilot service
        // /// </summary>
        private readonly ICopilotBotService copilotBotService;

        /// <summary>
        /// The Azure AI Semantic Search service.
        /// </summary>
        private readonly IAzureAISemantiSearch azureAISemanticSearch;

        // /// <summary>
        // /// The Copilot service
        // /// </summary>
        private readonly IApplicationLogging applicationLogging;

        /// <summary>
        /// The configuration.
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="CopilotController"/> class.
        /// </summary>
        /// <param name="applicationLogging">The Application logging.</param>
        /// <param name="copilotBotService">The Copilot service.</param>
        /// <param name="httpcontext">The http context.</param>
        /// <param name="configuration">The configuration.</param>
        public CopilotController(IApplicationLogging applicationLogging, ICopilotBotService copilotBotService, IAzureAISemantiSearch azureAISemanticSearch, IHttpContextAccessor httpcontext, IConfiguration configuration)
            : base(httpcontext, configuration)
        {
            this.applicationLogging = applicationLogging;
            this.copilotBotService = copilotBotService;
            this.azureAISemanticSearch = azureAISemanticSearch;
            this.httpcontext = httpcontext;
            this.configuration = configuration;
        }

        /// <summary>
        /// The question ask to Db Copilot bot.
        /// </summary>
        /// <param name="parameters">Bot Question params.</param>
        /// <returns>The response return.</returns>
        [HttpPost("Question")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> Question([FromBody] BotQuestionParams parameters)
        {
            parameters.UserAlias = this.CurrentUserAlias;
            this.HttpContext.Items["BotQuestionParams"] = parameters;
            ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsStart(parameters, "CopilotController", "Question"));

            var result = await this.copilotBotService.PostQuestionToDbCopilot(parameters);
            if (result == null)
            {
                //ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsEnd(parameters, result, "CopilotController", "Question"));
                //return this.BadRequest(new ErrorResponse { TraceId = this.TraceId, ErrorCode = StatusCodes.Status400BadRequest.ToString(CultureInfo.CurrentCulture), ErrorDetail = VirtuosoCopilotConstants.CopilotBotFailureResponse });
                ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(result), "CopilotController", "Question"));
                return this.BadRequest(new ResponseDto { ConversationId = parameters.ConversationId, Question = parameters.Question, ResponseType = ResponseType.error.ToString(), Data = new { ErrorCode = StatusCodes.Status400BadRequest.ToString(CultureInfo.CurrentCulture), ErrorMessage = VirtuosoCopilotConstants.CopilotBotFailureResponse }, Source=string.Empty });
            }

            //ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsEnd(parameters, result, "CopilotController", "Question"));
            ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(result), "CopilotController", "Question"));
            return this.Ok(result);
        }


      
        /// <summary>
        /// Return Auto suggested questions based on input provided by user.
        /// </summary>
        /// <param name="parameters">Bot Question params.</param>
        /// <returns>The response return.</returns>
        [HttpPost("AutoSuggestion")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> AutoSuggestion([FromBody] AutoSuggestionParams parameters)
        {
            this.HttpContext.Items["AutoSuggestionParams"] = parameters;
            ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsAutoSuggestStart(parameters, "CopilotController", "AutoSuggestion"));

            var result = await this.copilotBotService.GetAutoSuggestionsFromDbCopilot(parameters);
            if (result == null)
            {
                ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsAutoSuggestEnd(parameters, "No Result Found", "CopilotController", "AutoSuggestion"));
                return this.BadRequest(new ErrorResponse { TraceId = this.TraceId, ErrorCode = StatusCodes.Status500InternalServerError.ToString(CultureInfo.CurrentCulture), ErrorDetail = VirtuosoCopilotConstants.GeneralExceptionMessage });
            }
            else
            {
                string logresult;
                if (result != null && result.Count > 0)
                {
                    logresult = string.Join(",", result);
                }
                else
                {
                    logresult = "No Result Found";
                }
                ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsAutoSuggestEnd(parameters, logresult, "CopilotController", "AutoSuggestion"));
            }
            //ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsAutoSuggestEnd(parameters, result, "CopilotController", "AutoSuggestion"));
            return this.Ok(result);
        }

        /// <summary>
        /// Return Auto suggested questions based on input provided by user.
        /// </summary>
        /// <param name="parameters">Bot Question params.</param>
        /// <returns>The response return.</returns>
        [HttpPost("SuggestQuestions")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> SuggestQuestions([FromBody] AutoSuggestionParams parameters)
        {
            this.HttpContext.Items["AutoSuggestionParams"] = parameters;
            ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsAutoSuggestStart(parameters, "CopilotController", "AutoSuggestion"));

            var result = this.azureAISemanticSearch.GetSimilarQuestions(parameters);
            if (result == null)
            {
                ApplicationLogHelper.LogInformation(this.applicationLogging.LogDetailsAutoSuggestEnd(parameters, "No Result Found", "CopilotController", "AutoSuggestion"));
                return this.BadRequest(new ErrorResponse { TraceId = this.TraceId, ErrorCode = StatusCodes.Status500InternalServerError.ToString(CultureInfo.CurrentCulture), ErrorDetail = VirtuosoCopilotConstants.GeneralExceptionMessage });
            }
            return this.Ok(result);
        }
    }
}
