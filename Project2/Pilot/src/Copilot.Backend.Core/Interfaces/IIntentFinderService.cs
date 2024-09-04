//-----------------------------------------------------------------------
// <copyright file="IIntentFinderService.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.Interfaces
{
    using System.Threading.Tasks;
    using Copilot.Backend.Core.DTO;

    /// <summary>
    /// Interface for IntentFinder Service
    /// </summary>
    public interface IIntentFinderService
    {
        /// <summary>
        /// IntentFinderResponse function
        /// </summary>
        /// <param name="question">The question</param>
        /// <returns>Intent response</returns>
        Task<string> IntentFinderResponse(string question, BotQuestionParams botQuestionParams,string promptInstruction="");
    }
}
