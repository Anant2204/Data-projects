// <copyright file="IReceiveConversationRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Interfaces
{
    using MCT.DataAccess.Models;
    /// <summary>
    ///  interface IReceiveCoversationRepository
    /// </summary>
    public interface IReceiveConversationRepository
    {
        /// <summary>Get receive  conversations  based on  manager alias.</summary>
        /// <param name="managerAlias">The manager alias.</param>
        /// <returns>
        ///   ReceiveConversationDto
        /// </returns>
        Task<List<ReceiveConversationDto>> Get(IEnumerable<string> managerAlias);

        /// <summary>Get receive  conversations statistics based on  manager alias
        ///<param name="managerAliasList">The manager alias.</param>
        ///<returns>
        ///   ReceiveConversationDto
        /// </returns>
        /// </summary>
        Task<ConversationStatisticsResponse> GetStatistics(IEnumerable<string> managerAliasList);

        /// <summary>
        /// Marks completion send stay conversation.
        /// </summary>
        /// <param name="conversationCompletionRequest">Conversation completion request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <returns></returns>
        Task<bool> CompleteConversation(List<ConversationCompletionRequest> conversationCompletionRequest, string loggedInUserAlias);

        /// <summary>
        /// Get future year manager alias.
        /// </summary>
        Task<string?> GetFYManagerAlias(string icAlias);

    }
}
