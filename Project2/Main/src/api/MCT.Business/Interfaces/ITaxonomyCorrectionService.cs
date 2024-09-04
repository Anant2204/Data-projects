// <copyright file="ITaxonomyCorrectionService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;

    /// <summary>
    /// ITaxonomyCorrectionService Service interface.
    /// </summary>
    public interface ITaxonomyCorrectionService
    {
        /// <summary>
        /// get list of role summary based on org and career stage
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="taxonomyRoleSummaryChangeRequest"></param>
        /// <returns></returns>
        Task<TaxonomyDetailsInHierarchyResponse?> GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(string loggedInUserAlias, TaxonomyRoleSummaryChangeRequest taxonomyRoleSummaryChangeRequest);

        /// <summary>
        /// Submits taxonomy correction request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="loggedInUserFullName"></param>
        /// <param name="roleList"></param>
        /// <returns></returns>
        /// <exception cref="System.InvalidOperationException">
        /// CommonRepository is not available.
        /// </exception>
        Task<TaxonomyCorrectionResponse?> SubmitTaxonomyCorrectionRequestAsync(TaxonomyChangeRequest request, string loggedInUserAlias, string loggedInUserFullName, List<string> roleList);

        /// <summary>
        /// get list of taxonomy change requests
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roleList"></param>
        /// <returns></returns>
        Task<List<GetTaxonomyCorrectionRequestsResult>> GetTaxonomyChangeRequestAsync(string loggedInUserAlias, List<string> roleList);
    }
}
