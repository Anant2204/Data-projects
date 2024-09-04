// <copyright file="ICommonRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Interfaces
{
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Models;

    /// <summary>
    ///    Common repository interface.
    /// </summary>
    public interface ICommonRepository
    {
        /// <summary>Gets the user permissions asynchronous.</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <returns>
        ///  UserAccessDetails
        /// </returns>
        Task<List<UserAccessDetails>> GetUserPermissionsAsync(string loggedInUserAlias);

        /// <summary>check UserAccess For SelectedManager.</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="selectedManagerList">selectedManagerList.</param>
        /// <param name="roleList">role list.</param>
        /// <returns>
        ///  access
        /// </returns>
        Task<bool?> checkUserAccessForSelectedManager(string selectedManagerList, string loggedInUserAlias, string roleList);

        /// <summary>Gets the hierarchy of manager.</summary>
        /// <param name="selectedManager">selectedManager.</param>
        /// <param name="completeReportingHierarchy">Toggle.</param>
        /// <returns>
        ///  UserAccessDetails
        /// </returns>
        Task<IEnumerable<string?>> GetHierachyByUser(List<string> selectedManager, bool completeReportingHierarchy);

        /// <summary>
        /// Gets the employee manager alias list.
        /// </summary>
        /// <param name="employeeAliasList">The employee alias list.</param>
        /// <returns>List of employee manager alias.</returns>
        Task<List<EmployeeManager>?> GetEmployeeManagerAliasList(IEnumerable<string> employeeAliasList);


        /// <summary>
        /// check the access 
        /// <param name="icAliasList">The request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">Logged in user alias.</param>
        /// <returns>Response indicating success or failure.</returns>
        /// </summary>
        Task<bool> FYManagerCorrectionApprovalAccessAsync(List<string> icAliasList, string loggedInUserAlias, List<string> roleList);

        /// <summary>
        /// Gets the manager and taxonomy details for CY and FY
        /// </summary>
        /// <param name="icAlias">The employee alias list.</param>
        /// <returns>Returns the manager and taxonomy details for CY and FY of given ic.</returns>
        Task<ManagerAndTaxonomyDetailsForCYandFY?> GetEmployeeDetailsForTaxonomyCorrectionAsync(string icAlias);

        /// <summary>
        /// Retrieves the taxonomy details in a hierarchical format based on the provided organization and request type.
        /// This information can be used for cascading drop-down menus.
        /// </summary>
        /// <param name="org">The organization for which to retrieve the taxonomy details.</param>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// <returns>Taxonomy details in hierarchy format to be used for cascading drop downs</returns>
        Task<TaxonomyDetailsWithIncentivePlanHierarchy?> GetTaxonomyDetailsInHierarchy(string org, string requestType);

        /// <summary>
        /// Gets Organization Details
        /// </summary>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// <returns>Returns list of organization names</returns>
        Task<List<string?>> GetOrgDetailsAsync(string requestType);

        /// <summary>
        /// Gets active start and end date of the window.
        /// </summary>
        /// <returns>ToolRuntimeWindow</returns>
        Task<ToolRuntimeWindow?> GetToolRuntimeWindowAsync();
    }
}
