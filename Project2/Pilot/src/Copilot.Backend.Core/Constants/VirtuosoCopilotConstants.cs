//-----------------------------------------------------------------------
// <copyright file="MCSConstants.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

using System.ComponentModel;

namespace Copilot.Backend.Core.Constants
{
    /// <summary>
    /// The Virtuoso Constants class.
    /// </summary>
    [Localizable(false)]
    public static class VirtuosoCopilotConstants
    {
        /// <summary>
        /// The general exception message
        /// </summary>
        public static readonly string GeneralExceptionMessage = "Some error has occured.Please contact with administrator.";

        ///<summary>
        ///Copilot bot sorry words
        ///</summary>
        public static List<string> BotSorryWords = new() { "sorry", "not available", "oops", "does not exist", "not found", "not mentioned", "apologize", "afraid" };

        ///<summary>
        ///Copilot Bot failure message
        ///</summary>
        public const string CopilotDbBotFailureResponse = "Sorry, we couldn't find an answer to your query. Please rephrase your question and try again.";


        ///<summary>
        ///Copilot Bot failure response
        ///</summary>
        public const string CopilotBotFailureResponse = "Sorry the CloudGPT service is down right now. Please try again later.";

      
        /// <summary>
        /// Copilot Bot Name
        /// </summary>
        public const string VirtuosoCopilotBotName = "Project Management Copilot";

        /// <summary>
        /// OpenAi Endpoint 
        /// </summary>
        public const string OpenAiEndpoint = "OpenAiEndpoint";

        /// <summary>
        /// copilot DbBot OpenApi kvr 
        /// </summary>
        public const string CopilotDbBotOpenApikvr = "copilotDbBotOpenApi-kvr";

        /// <summary>
        /// Cloud Instruction 
        /// </summary>
        public const string IntentDetectionPrompt = "IntentDetectionPrompt";

        /// <summary>
        /// Max Token Value of bot
        /// </summary>
        public const string MaxTokenValue = "MaxTokenValue";

        /// <summary>
        /// Temperature Value of bot
        /// </summary>
        public const string TemperatureValue = "TemperatureValue";

        /// <summary>
        /// Deployment Or Model Name of bot
        /// </summary>
        public const string DeploymentOrModelName = "deploymentOrModelName";

        /// <summary>
        /// Copilot DbCloudGpt kvr
        /// </summary>
        public const string CopilotDbCloudGptkvr = "copilotDbCloudGpt-kvr";

        /// <summary>
        /// CloudGpt Endpoint
        /// </summary>
        public const string CloudGptEndpoint = "CloudGptEndpoint";

        /// <summary>
        /// Rephrase AI Failure Response
        /// </summary>
        public const string RephraseAIFailureResponse = "RephraseAIFailureResponse";

        /// <summary>
        /// AI Instructions
        /// </summary>
        public const string AIInstructions = "Instructions";

        /// <summary>
        /// Copilot DbEndpoint
        /// </summary>
        public const string CopilotDbEndpoint = "CopilotDbEndpoint";

        /// <summary>
        /// Copilot DbDebugModeOn
        /// </summary>
        public const string IsCopilotDbDebugModeOn = "IsCopilotDbDebugModeOn";

        /// <summary>
        /// Copilot DbBotApi kvr
        /// </summary>
        public const string CopilotDbBotApikvr = "copilotDbBotApi-kvr";

        /// <summary>
        /// Ai Flag
        /// </summary>
        public const string AiFlag = "AiFlag";

        /// <summary>
        /// Confidential Message
        /// </summary>
        public const string ConfidentialMessage = "Note :- Confidential data not included in the response";

        /// <summary>
        /// Copilot DbAutoSuggestionBotApi kvr
        /// </summary>
        public const string CopilotAzureOpenAITextConfigApiKeykvr = "copilotAzureOpenAITextConfigApiKey-kvr";

        /// <summary>
        /// Copilot DbAutoSuggestionBotApi kvr
        /// </summary>
        public const string CopilotAzAISearchConfigApiKeykvr = "copilotAzAISearchConfigApiKey-kvr";

        /// <summary>
        /// Copilot Db Auto Suggestion Endpoint with filter
        /// </summary>
        public const string CopilotDbAutoSuggestionEndpointWithFilter = "CopilotDbAutoSuggestionEndpointWithFilter";

        ///// <summary>
        ///// Copilot Db Auto Suggestion Endpoint without filter
        ///// </summary>
        //public const string CopilotDbAutoSuggestionEndpointWithoutFilter = "CopilotDbAutoSuggestionEndpointWithoutFilter";

        /// <summary>
        /// Copilot IntentAndResponseDetectionPrompt
        /// </summary>
        public const string IntentAndResponseDetectionPrompt = "IntentAndResponseDetectionPrompt";

        /// <summary>
        /// Copilot Db Auto Suggestion Endpoint Key
        /// </summary>
        public const string CopilotDbAutoSuggestionAISearchBotApikvr = "copilotDbAutoSuggestionAISearchBotApi-kvr";

        /// <summary>
        /// App configuration endpoint
        /// </summary>
        public const string AppConfigurationEndpoint = "AppConfigurationEndpoint";

        /// <summary>
        /// User assigned client id for copilot App configuration
        /// </summary>
        public const string UserAssignedClientId = "UserAssignedClientId";

        /// <summary>
        /// Label for copilot ui in app configuration
        /// </summary>
        public const string CopiloUiLabel = "Copilot-Ui";

    }
}
