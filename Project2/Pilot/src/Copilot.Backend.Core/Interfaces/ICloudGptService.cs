//-----------------------------------------------------------------------
// <copyright file="ICloudGptService.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------



namespace Copilot.Backend.Core.Interfaces
{
    using Copilot.Backend.Core.DTO;
    /// <summary>
    /// Interface for CloudGpt Service
    /// </summary>
    public interface ICloudGptService
    {
    
        /// <summary>
        /// The function for response
        /// </summary>
        /// <param name="question">The question</param>
        /// <param name="parentId">The parent Id of previous conversation. </param>
        /// <returns>cloud response</returns>
        Task<string> GetResponseFromCloudGPT(string question, BotQuestionParams parameters);
    }
}
