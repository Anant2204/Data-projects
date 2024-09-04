//-----------------------------------------------------------------------
// <copyright file="IAIResponseGeneratorService.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.Interfaces
{
    using System.Threading.Tasks;
    using Copilot.Backend.Core.DTO;

    /// <summary>
    /// AIResponseGenerator Interface
    /// </summary>
    public interface IAIResponseGeneratorService
    {
        /// <summary>
        /// RephraseAIResponse function
        /// </summary>
        /// <param name="question">The question</param>
        /// <param name="data">The data</param>
        /// <returns>Ai response</returns>
        Task<string> ProcessDataWithGptEngine(string question, string data, BotQuestionParams parameters);
    }
}
