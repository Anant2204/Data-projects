//-----------------------------------------------------------------------
// <copyright file="ApplicationLogging.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.Services
{
    using Newtonsoft.Json;
    using System;
    using Copilot.Backend.Core.Constants;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;
    /// <summary>
    /// Intent Finder Service
    /// </summary>
    /// <seealso cref="Copilot.Backend.Core.Interfaces.IApplicationLogging" />
    public class ApplicationLogging : IApplicationLogging
    {
        /// <summary>
        /// Log details.  
        /// </summary>
        /// <param name="parameters">All Bot parameters.</param>
        /// <param name="serviceControllerName">Service or Controller name.</param>
        /// <param name="methodName">Method name.</param>
        /// <param name="OtherMessage">Other Message.</param>
        /// <returns>return log message.</returns>
        public string LogDetails(BotQuestionParams parameters, string serviceControllerName, string methodName, string OtherMessage)
        {
            return $"Method {serviceControllerName}.{methodName} Details at {DateTime.UtcNow} with Bot Name: {VirtuosoCopilotConstants.VirtuosoCopilotBotName} and user: {parameters.UserAlias}" +
                           $" and question: {parameters.Question}  and vww-cloudgpt-parentID:  {parameters.ParentId} and vww-db-sessionId:  {parameters.SessionId} and conversationId: {parameters.ConversationId} and {OtherMessage}";
        }

        /// <summary>
        /// Logging Message End.
        /// </summary>
        /// <param name="parameters">All Bot parameters.</param>
        /// <param name="result">result of methods.</param>
        /// <param name="serviceControllerName">Service or Controller name.</param>
        /// <param name="methodName">Method name.</param>
        /// <returns>return log message.</returns>
        public string LogDetailsEnd(BotQuestionParams parameters, string result, string serviceControllerName, string methodName)
        {
            return $"Method {serviceControllerName}.{methodName} completed at {DateTime.UtcNow} with Bot Name: {VirtuosoCopilotConstants.VirtuosoCopilotBotName} and response: {JsonConvert.SerializeObject(result)}, user: {parameters.UserAlias}" +
                           $" and question: {parameters.Question}  and vww-cloudgpt-parentID:  {parameters.ParentId} and vww-db-sessionId:  {parameters.SessionId} and conversationId: {parameters.ConversationId}";
        }

        /// <summary>
        /// Logging Message start.
        /// </summary>
        /// <param name="parameters">All Bot parameters.</param>
        /// <param name="serviceControllerName">Service or Controller name.</param>
        /// <param name="methodName">Method name.</param>
        /// <returns>return log message.</returns>
        public string LogDetailsStart(BotQuestionParams parameters, string serviceControllerName, string methodName)
        {
            return $"Method {serviceControllerName}.{methodName} started at {DateTime.UtcNow} with Bot Name: {VirtuosoCopilotConstants.VirtuosoCopilotBotName} for user: {parameters.UserAlias}" +
                             $" and question: {parameters.Question}  and vww-cloudgpt-parentID:  {parameters.ParentId} and vww-db-sessionId:  {parameters.SessionId} and conversationId: {parameters.ConversationId}";
        }

        /// <summary>
        /// Log details.  
        /// </summary>
        /// <param name="parameters">All Bot parameters.</param>
        /// <param name="serviceControllerName">Service or Controller name.</param>
        /// <param name="methodName">Method name.</param>
        /// <param name="OtherMessage">Other Message.</param>
        /// <returns>return log message.</returns>
        public string LogDetailsAutoSuggest(AutoSuggestionParams parameters, string serviceControllerName, string methodName, string OtherMessage)
        {
            return $"Method {serviceControllerName}.{methodName} Details at {DateTime.UtcNow} with Bot Name: {VirtuosoCopilotConstants.VirtuosoCopilotBotName} and search string: {parameters.SearchString}" +
                           $" and NumberOfRecords: {parameters.NumberOfRecords}  and additionalParams:  {parameters.AdditionalParams} and {OtherMessage}";
        }

        /// <summary>
        /// Logging Message End.
        /// </summary>
        /// <param name="parameters">All Bot parameters.</param>
        /// <param name="result">result of methods.</param>
        /// <param name="serviceControllerName">Service or Controller name.</param>
        /// <param name="methodName">Method name.</param>
        /// <returns>return log message.</returns>
        public string LogDetailsAutoSuggestEnd(AutoSuggestionParams parameters, string result, string serviceControllerName, string methodName)
        {
            return $"Method {serviceControllerName}.{methodName} completed at {DateTime.UtcNow} with Bot Name: {VirtuosoCopilotConstants.VirtuosoCopilotBotName} and response: {JsonConvert.SerializeObject(result)}" +
                           $" and search string: {parameters.SearchString} and NumberOfRecords: {parameters.NumberOfRecords}  and additionalParams:  {parameters.AdditionalParams}";
        }

        /// <summary>
        /// Logging Message start.
        /// </summary>
        /// <param name="parameters">All Bot parameters.</param>
        /// <param name="serviceControllerName">Service or Controller name.</param>
        /// <param name="methodName">Method name.</param>
        /// <returns>return log message.</returns>
        public string LogDetailsAutoSuggestStart(AutoSuggestionParams parameters, string serviceControllerName, string methodName)
        {
            return $"Method {serviceControllerName}.{methodName} started at {DateTime.UtcNow} with Bot Name: {VirtuosoCopilotConstants.VirtuosoCopilotBotName}" +
                             $" and search string: {parameters.SearchString} and NumberOfRecords: {parameters.NumberOfRecords}  and additionalParams:  {parameters.AdditionalParams}";
        }
    }
}
