// <copyright file="IConversationScriptTaxonomyRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Interfaces
{
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Models;
    /// <summary>
    ///  interface IConversationTaxonomyRepository
    /// </summary>
    public interface IConversationScriptTaxonomyRepository
    {

        /// <summary>
        /// Gets the emp conversation script.
        /// </summary>
        /// <param name="empHrData">The emp hr data.</param>
        /// <param name="requestFrom">The request from.</param>
        /// <returns>EmpConversationScriptResponse.</returns>
        Task<EmpConversationScriptResponse> GetEmpConversationScript(HrDataModel empHrData,string requestFrom);

        /// <summary>Update ConversationScript based on  provided data.</summary>
        /// <param name="conversationScriptUpdateScenarioRequest">The conversation statistics request.</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <returns>
        ///   bool
        /// </returns>
        Task<bool> UpdateConversationScript(ConversationScriptUpdateScenarioRequest conversationScriptUpdateScenarioRequest, string loggedInUserAlias);

        /// <summary>Gets the  EmpHrData.</summary>
        /// <param name="empAlias">The empAlias.</param>
        Task<HrDataModel?> GetEmpHrData(string empAlias);

    }
}
