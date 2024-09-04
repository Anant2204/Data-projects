// <copyright file="ISendStayConversationService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.Models;

    /// <summary>
    ///  SendStayConversationService
    /// </summary>
    public interface ISendStayConversationService
    {
        /// <summary>Gets the specified statistics based on  manager alias.</summary>
        /// <param name="conversationListRequest">The conversation list request.</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <param name="roleList"> roleList.</param>
        /// <returns>
        ///   SendandStayStatistic
        /// </returns>
        Task<SendStayConversationResponse?> Get(ConversationListRequest conversationListRequest, string loggedInUserAlias,List<string> roleList);

        /// <summary>Gets the specified statistics based on  manager alias.</summary>
        /// <param name="conversationStatisticRequest">The conversation statistics request.</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <param name="roleList">roleList.</param>

        /// <returns>
        ///   SendandStayStatistic
        /// </returns>
        Task<ConversationStatisticsResponse?> GetStatistics(ConversationStatisticsRequest conversationStatisticRequest, string loggedInUserAlias, List<string> roleList);

        /// <summary>
        /// Marks a send stay conversation as complete.
        /// </summary>
        /// <param name="conversationCompletionRequest">Conversation completion request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList"> roleList.</param>
        /// <returns></returns>
        Task<bool?> SetConversationComplete(List<ConversationCompletionRequest> conversationCompletionRequest, string loggedInUserAlias, List<string> roleList);
    }
}
