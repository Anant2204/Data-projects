// <copyright file="ITaxonomyScriptContentRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Interfaces
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.EfModels.EfCustomModels;

    /// <summary>
    /// ITaxonomyCorrectionRepository
    /// </summary>
    public interface ITaxonomyScriptContentRepository
    {

        /// <summary>Get.</summary>
        /// <returns>
        ///   TaxonomyScriptContentResponse
        /// </returns>
        Task<TaxonomyScriptContentResponse> Get();

        /// <summary>Gets the user permissions asynchronous.</summary>
        /// <param name="searchString">The search string.</param>
        /// <returns>
        ///  List of DirectManagers
        /// </returns>
        Task<List<FutureManager>> GetFYManagersForScriptExclusionAsync(string searchString);

        /// <summary>
        /// TaxonomyScriptContent GetStatistics Method.
        /// </summary>
        /// <returns></returns>
        Task<TaxonomyScriptContentStatisticResponse> GetStatisticsAsync();

        /// <summary>
        /// Update Status of TaxonomyScriptContent
        /// </summary>
        /// <param name="scriptId"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <returns>True if the update is successful, otherwise false </returns>
        Task<bool> UpdateTaxonomyScriptContentStatusAsync(int scriptId, string loggedInUserAlias);
    
        /// <summary>Create Or Edit Script.</summary>
        /// <param name="taxonomyScriptContentUpsertRequest"> TaxonomyScriptContentUpsertRequest. model</param>
        /// <param name="loggedInUserAlias"> loggedInUserAlias</param>
        /// <returns>
        ///   true or false base on api success
        /// </returns>
        Task<bool> CreateOrUpdateTaxonomyScriptContentAsync(TaxonomyScriptContentUpsertRequest taxonomyScriptContentUpsertRequest, string? loggedInUserAlias);

        /// <summary>Create Or Edit List of Scripts.</summary>
        /// <param name="taxonomyScriptContentUpsertRequest"> TaxonomyScriptContentUpsertRequest. model</param>
        /// <param name="loggedInUserAlias"> loggedInUserAlias</param>
        /// <returns>
        ///   true or false base on api success
        /// </returns>
        Task<bool> ImportTaxonomyScriptContentAsync(List<TaxonomyScriptContentUpsertRequest> taxonomyScriptContentUpsertRequest, string? loggedInUserAlias);


        /// <summary>
        /// Get Audit Details of TaxonomyScriptContent 
        /// </summary>
        /// <param name="scriptId"></param>
        /// <returns>ModifiedBy and ModifiedDate Details</returns>
        Task<List<TaxonomyScriptContentAuditHistoryResponse>> GetAuditDetailsAsync(int scriptId);
    }
}

