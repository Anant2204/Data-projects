// <copyright file="IReceiveConversationService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.Models;

    /// <summary>
    ///   Receive Conversation service
    /// </summary>
    public interface IReceiveConversationService
    {
        /// <summary>Get the receive Conversations based on manageralias.</summary>
        /// <param name="conversationListRequest">The manager alias.</param>
        /// <param name="loggedInUserAlias">The Logged in user.</param>
        /// <param name="roleList"> roleList.</param>

        /// <returns>
        ///   ReceiveConversationResponse
        /// </returns>
        Task<ReceiveConversationResponse?> Get(ConversationListRequest conversationListRequest, string loggedInUserAlias,List<string> roleList);

        /// <summary>Gets the specified receive Conversations statistics based on  manager alias.</summary>
        /// <param name="conversationStatisticRequest">The conversation statistics request.</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <param name="roleList"> roleList.</param>

        /// <returns>
        ///   SendandStayStatistic
        /// </returns>
        Task<ConversationStatisticsResponse?> GetStatistics(ConversationStatisticsRequest conversationStatisticRequest, string loggedInUserAlias, List<string> roleList);

        /// <summary>
        /// Marks a send stay conversation as complete.
        /// </summary>
        /// <param name="conversationCompletionRequest">Conversation completion request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">Logged in user alias.</param>

        /// <returns></returns>
        Task<bool?> SetConversationComplete(List<ConversationCompletionRequest> conversationCompletionRequest, string loggedInUserAlias, List<string> roleList);
    }
}
