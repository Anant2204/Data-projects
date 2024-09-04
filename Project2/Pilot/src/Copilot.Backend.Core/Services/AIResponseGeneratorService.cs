//-----------------------------------------------------------------------
// <copyright file="AIResponseGeneratorService.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.Services
{
    using Azure.AI.OpenAI;
    using Azure;
    using Microsoft.Extensions.Configuration;
    using System;
    using System.Threading.Tasks;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Logger.Core;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Constants;

    /// <summary>
    /// Intent Finder Service
    /// </summary>
    /// <seealso cref="Copilot.Backend.Core.Interfaces.AIResponseGeneratorService" />
    public class AIResponseGeneratorService : IAIResponseGeneratorService
    {

        /// <summary>
        /// The application configuration.
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// The application Logging.
        /// </summary>
        private readonly IApplicationLogging applicationLogging;

        /// <summary>
        /// Initializes a new instance of the <see cref="AIResponseGeneratorService"/> class.
        /// </summary>
        /// <param name="configuration"></param>
        public AIResponseGeneratorService(IConfiguration configuration, IApplicationLogging applicationLogging)
        {
            this.configuration = configuration;
            this.applicationLogging = applicationLogging;
        }

        /// <summary>
        /// RephraseAIResponse function.
        /// </summary>
        /// <param name="question">The question.</param>
        /// <param name="data">The data.</param>
        /// <param name="parameters">All parameter of bots.</param>
        /// <returns>Ai response.</returns>
        public async Task<string> ProcessDataWithGptEngine(string question, string data, BotQuestionParams parameters)
        {
            try
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "AIResponseGeneratorService", "RephaseCloudGptResponse"));
                string requestUrl = configuration[VirtuosoCopilotConstants.OpenAiEndpoint] ?? string.Empty;
                string appKey = configuration[VirtuosoCopilotConstants.CopilotDbBotOpenApikvr] ?? string.Empty;
                int maxTokenvalue = 8000;
                float temperature = 0.7f;
                var instructions = configuration[VirtuosoCopilotConstants.AIInstructions] ?? string.Empty;
                string maxTokenString = configuration[VirtuosoCopilotConstants.MaxTokenValue] ?? string.Empty;
                string temperatureValue = configuration[VirtuosoCopilotConstants.TemperatureValue] ?? string.Empty;

                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "AIResponseGeneratorService", "RephaseCloudGptResponse",
                    $"OpenAiEndpoint: {requestUrl}, Instructions: {instructions}"));


                if (int.TryParse(maxTokenString, out int resultone))
                {
                    maxTokenvalue = resultone;
                }

                if (float.TryParse(temperatureValue, out float result))
                {
                    temperature = result;
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
                        new ChatRequestSystemMessage("You are an AI assistant that helps people find information."),

                        // User messages represent current or historical input from the end user
                        new ChatRequestUserMessage(instructions + Environment.NewLine + "-----------" + Environment.NewLine + question + Environment.NewLine  + data),
                           },

                        Temperature = temperature,
                        MaxTokens = maxTokenvalue,
                        NucleusSamplingFactor = (float)0.95,
                        FrequencyPenalty = 0,
                        PresencePenalty = 0
                    }).ConfigureAwait(false);
                }
                catch (Exception exc)
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "AIResponseGeneratorService", "RephaseCloudGptResponse", $"OpenAi Exception AIResponseGeneratorService {exc.ToString()}"));
                    ApplicationLogHelper.LogError(exc, $"AIResponseGeneratorService OpenAi Exception");
                    throw;
                }
                ChatCompletions completions = response.Value;
                var responseData = completions.Choices[0].Message.Content;
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, responseData, "AIResponseGeneratorService", "RephaseCloudGptResponse"));
                return responseData;
            }
            catch (Exception ex)
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "AIResponseGeneratorService", "RephaseCloudGptResponse", $"Exception AIResponseGeneratorService {ex.ToString()}"));
                ApplicationLogHelper.LogError(ex, $"AIResponseGeneratorService Exception");
                var exceptionMessage = ex.Message;
                if (exceptionMessage.Contains("ErrorCode: context_length_exceeded"))
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "AIResponseGeneratorService", "RephaseCloudGptResponse", $"RephraseAIResponse Exception:" + ex.ToString() + " InnerException :" + ex.InnerException?.Message + DateTime.Now));
                    ApplicationLogHelper.LogInformation($"RephraseAIResponse Exception:" + ex.ToString() + " InnerException :" + ex.InnerException?.Message + DateTime.Now);
                    return configuration[VirtuosoCopilotConstants.RephraseAIFailureResponse] ?? string.Empty;
                }
                throw;
            }
        }
    }
}
