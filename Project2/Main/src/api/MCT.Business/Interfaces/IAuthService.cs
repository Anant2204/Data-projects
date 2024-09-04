// <copyright file="IAuthService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;

    /// <summary>
    ///  Authorisation service interface.
    /// </summary>
    public interface IAuthService
    {
        /// <summary>Gets the authorized aliases list.</summary>
        /// <returns>
        ///  Get authorized aliases List
        /// </returns>
        Task<List<string>> GetAuthorizedAliasesListAsync(IEnumerable<string> managerAliasList, string loggedInUserAlias);

        /// <summary>
        /// Determines whether [has access asynchronous] [the specified employee manager alias list].
        /// </summary>
        /// <param name="employeeManagerAliasList">The employee manager alias list.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <returns>Whether user has access or not.</returns>
        Task<bool> HasAccessAsync(IEnumerable<string> employeeManagerAliasList, string loggedInUserAlias);

        /// <summary>
        /// Checks the user access for selected manager.
        /// </summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="selectedManagerList">The selected manager list.</param>
        /// <param name="roles">The role list.</param>
        /// <returns>Whether access is granted or not.</returns>
        Task<bool?> checkUserAccessForSelectedManager(string loggedInUserAlias, string selectedManagerList, string roles);

        /// <summary>
        /// Get list of manager alias for authorized user.
        /// </summary>
        /// <param name="managerAliases">Manager alias.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">roleList.</param>
        /// <param name="completeReportingHierarchy">toggle value.</param>
        /// <returns>Get list of manager alias for authorized user..</returns>
        Task<IEnumerable<string>?> GetManagerListForAuthorizedUser(List<string> managerAliases, string loggedInUserAlias, List<string> roleList, bool completeReportingHierarchy);

        /// <summary>Get list of manager alias for authorized user.</summary>
        /// <param name="selectedManager">The logged in user alias.</param>
        /// <param name="completeReportingHierarchy">The logged in user alias.</param>
        /// <returns>
        ///  List of managerlist
        /// </returns>
        Task<IEnumerable<string>> GetHierachyByUser(List<string> selectedManager, bool completeReportingHierarchy);
    }
}
