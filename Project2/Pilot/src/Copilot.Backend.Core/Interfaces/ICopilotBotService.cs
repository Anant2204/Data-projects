//-----------------------------------------------------------------------
// <copyright file="ICopilotBotService.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Azure.Data.AppConfiguration;
    using Copilot.Backend.Core.DTO;
    using Microsoft.AspNetCore.Http;

    /// <summary>
    /// Interface for Copilot Bot Service
    /// </summary>
    public interface ICopilotBotService
    {
        /// <summary>
        /// Post the db copilot question
        /// </summary>
        /// <param name="question">The Question which is ask to bot</param>
        /// <param name="parentId">The Parent id of chat bot</param>
        /// <param name="sessionId">The sessionId</param>
        /// <param name="userAlias">The userAlias</param>
        /// <returns></returns>
        Task<ResponseDto> PostQuestionToDbCopilot(BotQuestionParams parameters);

        /// <summary>
        /// Auto suggested questions based on input provided by user
        /// </summary>
        /// <param name="parameters">AutoSuggestionParams</param>
        /// <returns></returns>
        Task<List<string>> GetAutoSuggestionsFromDbCopilot(AutoSuggestionParams parameters);

        /// <summary>
        /// Get all configurations from Azure App Configuration For Copilot Ui
        /// </summary>
        /// <returns></returns>
        Task<Dictionary<string, string>> GetAllAzureAppConfigurationsForCopilotUI();
       
    }
}
