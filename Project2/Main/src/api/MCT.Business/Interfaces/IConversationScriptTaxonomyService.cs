// <copyright file="IConversationScriptTaxonomyService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Models;

    /// <summary>
    ///   Receive Conversation service
    /// </summary>
    public interface IConversationScriptTaxonomyService
    {

        /// <summary>
        /// Gets the emp conversation script.
        /// </summary>
        /// <param name="empAlias">The emp alias.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="roleList">The role list.</param>
        /// <param name="requestFrom">The request from.</param>
        /// <returns>EmpConversationScriptResponse.</returns>
        Task<EmpConversationScriptResponse?> GetEmpConversationScript(string empAlias, string loggedInUserAlias, List<string> roleList,string  requestFrom);

        /// <summary>Update ConversationScript based on  employee alias.</summary>
        /// <param name="conversationScriptUpdateScenarioRequest">The conversation statistics request.</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <returns>
        ///   EmpConversationScriptResponse
        /// </returns>
        Task<bool> UpdateConversationScript(ConversationScriptUpdateScenarioRequest conversationScriptUpdateScenarioRequest, string loggedInUserAlias);

    }
}
