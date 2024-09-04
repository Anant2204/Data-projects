// <copyright file="ICommonService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;

    /// <summary>
    ///  Common service interface.
    /// </summary>
    public interface ICommonService
    {

        /// <summary>Gets the logged in user privilege.</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <returns>
        ///  UserPermissions
        /// </returns>
        Task<UserPermissions> GetLoggedInUserPrivilege(string loggedInUserAlias);

        /// <summary>Gets the logged in user privilege with run time window.</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <returns>
        ///  UserPermissionsExtended
        /// </returns>
        Task<UserPermissionsAndToolWindow> GetLoggedInUserPrivilegeWithRunTimeWindowAsync(string loggedInUserAlias);

        /// <summary>
        /// Asynchronously retrieves the taxonomy details in a hierarchical format based on the provided organization, request type, and role list of logged in user.
        /// </summary>
        /// <param name="org">The organization for which to retrieve the taxonomy details.</param>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">The list of roles for logged in user.</param>
        /// <returns>A Task that represents the asynchronous operation. The task result contains the taxonomy details in a hierarchical format.</returns>
        Task<TaxonomyDetailsWithIncentivePlanHierarchy?> GetTaxonomyDetailsInHierarchyAsync(string org, string requestType, string loggedInUserAlias, List<string> roleList);

        /// <summary>
        /// Gets Organization Details
        /// </summary>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">The list of roles for logged in user.</param>
        /// <returns>Returns list of organization names</returns>
        Task<List<string?>> GetOrgDetailsAsync(string requestType, string loggedInUserAlias, List<string> roleList);

        /// <summary>
        /// Summarize the content 
        /// </summary>
        /// <param name="content"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <returns>summary</returns>
        Task<string> SummarizeContent(string content, string? loggedInUserAlias);
    }
}

