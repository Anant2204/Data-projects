// <copyright file="ISendStayRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Interfaces
{
    using MCT.DataAccess.Models;

    /// <summary>
    /// interface sendstayRepository.
    /// </summary>
    public interface ISendStayRepository
    {
        /// <summary>
        ///declaration of get  method
        /// </summary>
        Task<List<SendConversationDto>> Get(IEnumerable<string> managerAliasList);

        /// <summary>
        ///declaration of GetStatistics  method
        /// </summary>
        Task<ConversationStatisticsResponse> GetStatistics(IEnumerable<string> managerAliasList);

        /// <summary>
        /// Gets current year manager alias.
        /// </summary>
        /// <param name="icAlias">The ic alias.</param>
        /// <returns>Current year manager alias</returns>
        Task<string?> GetCYManagerAlias(string icAlias);

        /// <summary>
        /// Marks completion send stay conversation.
        /// </summary>
        /// <param name="conversationCompletionRequest">Conversation completion request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <returns></returns>
        Task<bool> CompleteConversation(List<ConversationCompletionRequest> conversationCompletionRequest, string loggedInUserAlias);

    }
}
