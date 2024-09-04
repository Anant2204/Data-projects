// <copyright file="ITaxonomyCorrectionRepository.cs" company="Microsoft">
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
    public interface ITaxonomyCorrectionRepository
    {

        /// <summary>
        /// get list of role summary based on org and career stage
        /// </summary>
        /// <param name="taxonomyRoleSummaryChangeRequest"></param>
        /// <returns></returns>
        Task<TaxonomyDetailsInHierarchyResponse?> GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(TaxonomyRoleSummaryChangeRequest taxonomyRoleSummaryChangeRequest);

        /// <summary>
        /// Update the future manager.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="icDetails">The details of IC.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="loggedInUserFullName"></param>
        /// <returns>True if the update is successful, otherwise false.</returns>
        Task<bool> SubmitTaxonomyCorrectionRequestAsync(TaxonomyChangeRequest request, ManagerAndTaxonomyDetailsForCYandFY icDetails, string loggedInUserAlias, string loggedInUserFullName);

        /// <summary>
        /// Get list of Taxonomy change request
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roleList"></param>
        /// <param name="completeReportingHierarchy"></param>
        /// <returns>List of TaxonomyCorrection Requests</returns>
        Task<List<GetTaxonomyCorrectionRequestsResult>> GetTaxonomyChangeRequestAsync(string loggedInUserAlias, string roleList, bool completeReportingHierarchy = true);
    }
}
