// <copyright file="IFutureManagerCorrectionService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;

    /// <summary>
    /// IFutureManagerCorrection Service interface.
    /// </summary>
    public interface IFutureManagerCorrectionService
    {
        /// <summary>
        /// Gets the future manager.
        /// </summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="searchString">The search string.</param>
        /// <returns></returns>
        Task<List<FutureManager>> GetFutureManager(string loggedInUserAlias,string searchString);

        /// <summary>
        /// Updates the future manager.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">The role list.</param>
        /// <returns>Response indicating success or failure.</returns>
        Task<FutureManagerChangeResponse?> UpdateFutureManager(FutureManagerChangeRequest request, string loggedInUserAlias, List<string> roleList);

        /// <summary>
        /// Get future manager status list.
        /// </summary>
        /// <param name="loggedInUserAlias">logged in user Alias.</param>
        /// <param name="roleList">Logged in user roles.</param>
        /// <returns>List of GetFutureManagerCorrectionResult.</returns>
        Task<List<GetFutureManagerRequestsResult>> GetFutureManagerCorrectionRequest(string loggedInUserAlias, List<string> roleList);

        /// <summary>
        /// Updates the status.
        /// </summary>
        /// <param name="updateStatusOfManagerCorrectionRequest">updateStatusOfManagerCorrectionRequest.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">The role list.</param>
        /// <returns>Response indicating success or failure.</returns>
        Task<bool?> UpdateFYManagerCorrectionStatusAsync(UpdateFYManagerCorrectionStatusRequest updateStatusOfManagerCorrectionRequest, string loggedInUserAlias, List<string> roleList);
    }
}

