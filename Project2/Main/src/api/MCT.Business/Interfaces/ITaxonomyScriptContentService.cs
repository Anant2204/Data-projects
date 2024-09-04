// <copyright file="ITaxonomyScriptContentService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Models;

    /// <summary>
    ///   ITaxonomyScriptContentService
    /// </summary>
    public interface ITaxonomyScriptContentService
    {


        /// <summary>Gets the specified  Conversations taxonomy based on  employee alias.</summary>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <param name="roleList">Role list.</param>
        /// <returns>
        ///   EmpConversationScriptResponse
        /// </returns>
        Task<TaxonomyScriptContentResponse?> Get(string loggedInUserAlias, List<string> roleList);

        /// <summary>Gets the user permissions asynchronous.</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="roles">Roles</param>
        /// <param name="searchString">The search string.</param>
        /// <returns>
        ///  List of DirectManagers
        /// </returns>
        Task<List<FutureManager>?> GetFYManagersForScriptExclusionAsync(string loggedInUserAlias, List<string> roles, string searchString);

        /// <summary>
        /// TaxonomyScriptContent GetStatistics Method
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roles"></param>
        /// <returns>Get Statistics for readyForReview and approved status</returns>
        Task<TaxonomyScriptContentStatisticResponse> GetStatisticsAsync(string loggedInUserAlias, List<string> roles);

        /// <summary>
        /// Update Status of TaxonomyScriptContent
        /// </summary>
        /// <param name="scriptId"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roleList"></param>
        /// <returns>True if the update is successful, otherwise false</returns>
        Task<bool?> UpdateTaxonomyScriptContentStatusAsync(int scriptId, string loggedInUserAlias, List<string> roleList);

        /// <summary>Create Or Edit Script.</summary>
        /// <param name="taxonomyScriptContentUpsertRequest"> TaxonomyScriptContentUpsertRequest. model</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <param name="roleList"> roleList.</param>
        /// <returns>
        ///   true or false base on api success
        /// </returns>
        Task<bool?> CreateOrUpdateTaxonomyScriptContentAsync(TaxonomyScriptContentUpsertRequest taxonomyScriptContentUpsertRequest, string? loggedInUserAlias, List<string> roleList);
        /// <summary>
        /// Get Audit Details of TaxonomyScriptContent
        /// </summary>
        /// <param name="scriptId"></param>
        /// <param name="roleList"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <returns>ModifiedBy and ModifiedDate Details</returns>
        Task<List<TaxonomyScriptContentAuditHistoryResponse>?> GetAuditDetailsAsync(int scriptId, List<string> roleList, string loggedInUserAlias);

        /// <summary>Create Or Edit List of Script.</summary>
        /// <param name="taxonomyScriptContentUpsertRequest"> TaxonomyScriptContentUpsertRequest. model</param>
        /// <param name="roleList"></param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <returns>
        ///   true or false base on api success
        /// </returns>
        Task<bool?> ImportTaxonomyScriptContentAsync(List<TaxonomyScriptContentUpsertRequest> taxonomyScriptContentUpsertRequest,List<string> roleList, string? loggedInUserAlias);

    }
}
