//-----------------------------------------------------------------------
// <copyright file="IntentFinderService.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.Services
{
    using Azure;
    using Azure.AI.OpenAI;
    using Microsoft.Extensions.Configuration;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Copilot.Backend.Core.Constants;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Shared.Helpers;
    using Copilot.Backend.Logger.Core;

    /// <summary>
    /// Intent Finder Service
    /// </summary>
    /// <seealso cref="Copilot.Backend.Core.Interfaces.IntentFinderService" />
    public class IntentFinderService : IIntentFinderService
    {
        /// <summary>
        /// The application configuration
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// The application Logging
        /// </summary>
        private readonly IApplicationLogging applicationLogging;

        /// <summary>
        /// Initializes a new instance of the <see cref="IntentFinderService"/> class.
        /// </summary>
        /// <param name="logger"></param>
        public IntentFinderService(IConfiguration configuration, IApplicationLogging applicationLogging)
        {
            this.configuration = configuration;
            this.applicationLogging = applicationLogging;
        }

        /// <summary>
        /// IntentFinderResponse function
        /// </summary>
        /// <param name="question">The question</param>
        /// <returns>Intent response</returns>
        public async Task<string> IntentFinderResponse(string question, BotQuestionParams botQuestionParams, string promptInstruction="")
        {
            try
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(botQuestionParams, "IntentFinderService", "IntentFinderResponse"));
                if (question == null || botQuestionParams is null)
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(botQuestionParams, default, "IntentFinderService", "IntentFinderResponse"));
                    return default;
                }
                string requestUrl = configuration[VirtuosoCopilotConstants.OpenAiEndpoint] ?? string.Empty;
                string appKey = configuration[VirtuosoCopilotConstants.CopilotDbBotOpenApikvr] ?? string.Empty;
                int maxTokenvalue = 8000;
                string instructions = promptInstruction ?? string.Empty;
                
                if (string.IsNullOrEmpty(promptInstruction))
                {
                    instructions = configuration[VirtuosoCopilotConstants.IntentDetectionPrompt] ?? string.Empty;
                }
                
                string maxTokenString = configuration[VirtuosoCopilotConstants.MaxTokenValue] ?? string.Empty;

                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(botQuestionParams, "IntentFinderService", "IntentFinderResponse",
                    $"OpenAiEndpoint: {requestUrl}, Instruction: {instructions} "));


                if (int.TryParse(maxTokenString, out int resultone))
                {
                    maxTokenvalue = resultone;
                }
                Response<ChatCompletions> response = null;
                try
                {
                    OpenAIClient client = new OpenAIClient(new Uri(requestUrl), new AzureKeyCredential(appKey));
                    response = await client.GetChatCompletionsAsync(
                   new ChatCompletionsOptions()
                   {
                       DeploymentName = configuration[VirtuosoCopilotConstants.DeploymentOrModelName],
                       Messages =
                          {
                         // The system message represents instructions or other guidance about how the assistant should behave
                        new ChatRequestSystemMessage(instructions),
                        // User messages represent current or historical input from the end user
                        new ChatRequestUserMessage(question),
                          },

                       Temperature = 0.0f,
                       MaxTokens = maxTokenvalue,
                       NucleusSamplingFactor = 0.0f,
                       FrequencyPenalty = 0.0f,
                       PresencePenalty = 0.0f
                   }).ConfigureAwait(false);
                }
                catch (Exception exc)
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(botQuestionParams, "IntentFinderService", "IntentFinderResponse", $"OpenAi Exception IntentFinderService {exc.ToString()}"));
                    ApplicationLogHelper.LogError(exc, $"IntentFinderService OpenAi Exception");
                    throw;
                }
                ChatCompletions completions = response.Value;
                var responseData = completions.Choices[0].Message.Content;
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(botQuestionParams, responseData, "IntentFinderService", "IntentFinderResponse"));
                return responseData;
            }
            catch (Exception ex)
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(botQuestionParams, "IntentFinderService", "IntentFinderResponse", $"Exception IntentFinderService {ex.ToString()}"));
                ApplicationLogHelper.LogError(ex, $"IntentFinderService Exception");
                throw;
            }
        }
    }
}
