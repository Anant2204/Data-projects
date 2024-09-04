// <copyright file="IFutureManagerCorrectionRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Interfaces
{
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;

    /// <summary>
    ///    Common repository interface.
    /// </summary>
    public interface IFutureManagerCorrectionRepository
    {
        /// <summary>Gets the user permissions asynchronous.</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="searchString">The search string.</param>
        /// <returns>
        ///  UserAccessDetails
        /// </returns>
        Task<List<FutureManager>> GetFutureManager(string loggedInUserAlias, string searchString);

        /// <summary>
        /// Updates a record in the TblHrDataToolInput table.
        /// </summary>
        /// <param name="request">The HR data tool request DTO.</param>
        /// <param name="employeeManager"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <returns>True if the update is successful, otherwise false.</returns>
        Task<bool> UpdateFutureManager(FutureManagerChangeRequest request, EmployeeManager employeeManager, string loggedInUserAlias);

        /// <summary>
        /// Gets future manager correction status.
        /// </summary>
        /// <param name="loggedInUserAlias">logged in user alias.</param>
        /// <param name="roleList">logged in user roles.</param>
        /// <param name="CompleteReportingHierarchy">complete view or compact view.</param>
        /// <returns>List of Correction status relult</returns>

        Task<List<GetFutureManagerRequestsResult>> GetFutureManagerCorrectionRequest(string loggedInUserAlias, string roleList, bool CompleteReportingHierarchy = true);

        /// <summary>
        /// Checks the circular reference asynchronous.
        /// </summary>
        /// <param name="icAlias">The ic alias.</param>
        /// <param name="mgrAlias">The MGR alias.</param>
        /// <returns></returns>
        Task<bool> CheckCircularReferenceAsync(string icAlias, string mgrAlias);

        /// <summary>
        /// Gets the future manager correction status.
        /// </summary>
        /// <param name="icAlias">The ic alias.</param>
        /// <returns></returns>
        Task<FutureManagerCorrectionStatusResponse?> GetFutureManagerCorrectionStatus(string icAlias);

        /// <summary>
        /// Checks whether tagged as exception or not.
        /// </summary>
        /// <param name="alias">The ic alias.</param>
        /// <returns>Whether tagged as exception or not.</returns>
        Task<bool> IsTaggedAsExceptionAsync(string alias);


        /// <summary>
        /// Updates the status.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">role list.</param>
        /// <returns>Response indicating success or failure.</returns>
        Task<bool?> UpdateFYManagerCorrectionStatusAsync(UpdateFYManagerCorrectionStatusRequest request, string loggedInUserAlias, List<string> roleList);
        
        /// <summary>
        /// Checks whether status is approved or not.
        /// </summary>
        /// <param name="alias">The ic alias.</param>
        /// <returns>whether status is approved or not.</returns>
        Task<bool> IsEmployeeRecordApproved(string alias);


        /// <summary>
        /// Checks whether Manager is there or not in table.
        /// </summary>
        /// <param name="alias">The ic alias.</param>
        /// <returns>Whether Manager is there or not in table.</returns>
        Task<bool> IsSelectedManagerIsValid(string alias);

    }
}
