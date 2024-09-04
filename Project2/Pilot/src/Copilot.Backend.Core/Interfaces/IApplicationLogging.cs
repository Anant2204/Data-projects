//-----------------------------------------------------------------------
// <copyright file="IApplicationLogging.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.Interfaces
{
    using Copilot.Backend.Core.DTO;
    /// <summary>
    /// IApplicationLogging Interface
    /// </summary>
    public interface IApplicationLogging
    {
        /// <summary>
        /// Logging message at start of the method 
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="serviceControllerName"></param>
        /// <param name="methodName"></param>
        /// <returns></returns>
        string LogDetailsStart(BotQuestionParams parameters, string serviceControllerName, string methodName);

        /// <summary>
        /// Logging Message at end of the method 
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="result"></param>
        /// <param name="serviceControllerName"></param>
        /// <param name="methodName"></param>
        /// <returns></returns>
        string LogDetailsEnd(BotQuestionParams parameters, string result, string serviceControllerName, string methodName);
        /// <summary>
        /// Other LogDetails
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="serviceControllerName"></param>
        /// <param name="methodName"></param>
        /// <param name="OtherMessage"></param>
        /// <returns></returns>
        string LogDetails(BotQuestionParams parameters, string serviceControllerName, string methodName, string OtherMessage);


        /// <summary>
        /// Logging message at start of the method 
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="serviceControllerName"></param>
        /// <param name="methodName"></param>
        /// <returns></returns>
        string LogDetailsAutoSuggestStart(AutoSuggestionParams parameters, string serviceControllerName, string methodName);

        /// <summary>
        /// Logging Message at end of the method 
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="result"></param>
        /// <param name="serviceControllerName"></param>
        /// <param name="methodName"></param>
        /// <returns></returns>
        string LogDetailsAutoSuggestEnd(AutoSuggestionParams parameters, string result, string serviceControllerName, string methodName);
        /// <summary>
        /// Other LogDetails
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="serviceControllerName"></param>
        /// <param name="methodName"></param>
        /// <param name="OtherMessage"></param>
        /// <returns></returns>
        string LogDetailsAutoSuggest(AutoSuggestionParams parameters, string serviceControllerName, string methodName, string OtherMessage);
    }
}
