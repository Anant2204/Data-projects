// <copyright file="AccessRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Repository
{
    using System.Data;
    using System.Text;
    using Microsoft.Data.SqlClient;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using Microsoft.EntityFrameworkCore;
    using MCT.DataAccess.Context;
    using System.Collections.Generic;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.EfModels.EfCustomModels;

    /// <summary>
    /// Access Repository.
    /// </summary>
    public class CommonRepository : ICommonRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;

        /// <summary>Initializes a new instance of the <see cref="CommonRepository" /> class.</summary>
        /// <param name="context">The context.</param>
        public CommonRepository(ConversationContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Checks whether logged in user has access to tool or not.
        /// </summary>
        public async Task<List<UserAccessDetails>> GetUserPermissionsAsync(string loggedInUserAlias)
        {
            var results = await _context.GetRoleFeaturesAndPermissions(loggedInUserAlias);
            return results;
        }

        /// <summary>
        /// Checks whether logged in user has access for selected manager
        /// </summary>
        public async Task<bool?> checkUserAccessForSelectedManager(string selectedManagerList,
            string loggedInUserAlias, string roleList)
        {

            return await _context.checkUserAccessForSelectedManager(loggedInUserAlias, selectedManagerList, roleList);

        }


        /// <summary>Gets the hierarchy of manager.</summary>
        /// <returns>
        ///   manager alais list
        /// </returns>
        public async Task<IEnumerable<string?>> GetHierachyByUser(List<string> selectedManager, bool completeReportingHierarchy)
        {
            if (completeReportingHierarchy)
            {
                return await _context.DimManagerhierarchies
                    .AsQueryable()
                    .Where(s => s.ManagerAlias != null && selectedManager.Contains(s.ManagerAlias))
                    .Select(s => s.DirectManagerAlias)
                    .Distinct().ToListAsync().ConfigureAwait(false);
            }
            else
            {
                return selectedManager;
            }

        }

        /// <summary>
        /// Gets the employee manager alias list.
        /// </summary>
        /// <param name="employeeAliasList">The employee alias list.</param>
        /// <returns>List of employee manager alias.</returns>
        public async Task<List<EmployeeManager>?> GetEmployeeManagerAliasList(IEnumerable<string> employeeAliasList)
        {
            if (employeeAliasList == null)
            {
                return null;
            }
            else
            {
                var query = _context.TblHrdata.AsQueryable().Where(x => x.Ic != null && employeeAliasList.Contains(x.Ic));
                return await query.Select(s => new EmployeeManager()
                {
                    EmployeeAlias = s.Ic!,
                    CYManagerAlias = s.CyManagerAlias,
                    FYManagerAlias = s.FyManagerAlias
                }).Distinct().ToListAsync();
            }
        }

        /// <summary>
        /// Gets the manager and taxonomy details for CY and FY
        /// </summary>
        /// <param name="icAlias">The employee alias list.</param>
        /// <returns>Returns the manager and taxonomy details for CY and FY of given ic.</returns>
        public async Task<ManagerAndTaxonomyDetailsForCYandFY?> GetEmployeeDetailsForTaxonomyCorrectionAsync(string icAlias)
        {
            if (icAlias == null)
            {
                return null;
            }
            else
            {
                return await _context.TblHrdata.AsQueryable().Where(x => x.Ic != null && x.Ic == icAlias).Select(x => new ManagerAndTaxonomyDetailsForCYandFY
                {
                    Ic = x.Ic,
                    IcFullName = x.IcFullName,
                    CyOrg = x.CyOrg,
                    CyRoleSummary = x.CyRoleSummary,
                    CyQ1 = x.CyQ1,
                    CyQ2 = x.CyQ2,
                    CyCareerStage = x.CyCareerStage,
                    CyCostCenter = x.CyCostCenter,
                    FyOrg = x.FyOrg,
                    FyRoleSummary = x.FyRoleSummary,
                    FyQ1 = x.FyQ1,
                    FyQ2 = x.FyQ2,
                    FyCareerStage = x.FyCareerStage,
                    FyCostCenter = x.FyCostCenter,
                    CyManagerAlias = x.CyManagerAlias,
                    FyManagerAlias = x.FyManagerAlias,
                    CyIncentivePlan = x.CyIncentivePlan,
                    FyIncentivePlan = x.FyIncentivePlan,
                }).FirstOrDefaultAsync().ConfigureAwait(false);
            }
        }

        /// <summary>
        /// chech access 
        /// </summary>
        public Task<bool> FYManagerCorrectionApprovalAccessAsync(List<string> icAliasList, string loggedInUserAlias, List<string> roleList)
        {
            var icAliases = String.Join(",", icAliasList);
            var roles = String.Join(",", roleList);

            var hasAccess = this._context.FYManagerCorrectionsApprovalAccess(icAliases, loggedInUserAlias, roles);
            return hasAccess;
        }

        /// <summary>
        /// Retrieves the taxonomy details in a hierarchical format based on the provided organization and request type.
        /// This information can be used for cascading drop-down menus.
        /// </summary>
        /// <param name="org">The organization for which to retrieve the taxonomy details.</param>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// <returns>Taxonomy details in hierarchy format to be used for cascading drop downs</returns>
        public async Task<TaxonomyDetailsWithIncentivePlanHierarchy?> GetTaxonomyDetailsInHierarchy(string org, string requestType)
        {
            List<GetTaxonomyWithIncentiveResult> entities = new List<GetTaxonomyWithIncentiveResult>();
            if (requestType.ToLower() == ApplicationConstants.CY.ToLower())
            {
                IQueryable<MctEdmMappingCy> query = _context.MctEdmMappingCies;
                if (!string.Equals(org, ApplicationConstants.All, StringComparison.InvariantCultureIgnoreCase))
                {
                    query = query.Where(x => x.Org == org);
                }
                entities = await query
                    .Select(x => new GetTaxonomyWithIncentiveResult()
                    {
                        RoleSummary = x.RoleSummary,
                        Q1 = x.Q1,
                        Q2 = x.Q2,
                        IncentivePlan = x.IncentivePlan
                    })
                    .Distinct()
                    .OrderBy(x => x.RoleSummary)
                    .ToListAsync()
                    .ConfigureAwait(false);
            }
            else if (requestType.ToLower() == ApplicationConstants.FY.ToLower())
            {
                IQueryable<MctEdmMapping> query = _context.MctEdmMappings;
                if (!string.Equals(org, ApplicationConstants.All, StringComparison.InvariantCultureIgnoreCase))
                {
                    query = query.Where(x => x.Org == org);
                }
                entities = await query
                    .Select(x => new GetTaxonomyWithIncentiveResult()
                    {
                        RoleSummary = x.RoleSummary,
                        Q1 = x.Q1,
                        Q2 = x.Q2,
                        IncentivePlan = x.IncentivePlan
                    })
                    .Distinct()
                    .OrderBy(x => x.RoleSummary)
                    .ToListAsync()
                    .ConfigureAwait(false);
            }

            if (entities.Count == 0)
            {
                return null;
            }

            TaxonomyDetailsWithIncentivePlanHierarchy taxonomyDetailsWithIIncentivePlanHierarchy = new TaxonomyDetailsWithIncentivePlanHierarchy();
            taxonomyDetailsWithIIncentivePlanHierarchy.TaxonomyInfoDetails = CreateRoleSummary(entities, org);

            return taxonomyDetailsWithIIncentivePlanHierarchy;
        }

        /// <summary>
        /// Get Distinct Organation Details
        /// </summary>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// <returns>Returns list of organization names</returns>
        public async Task<List<string?>> GetOrgDetailsAsync(string requestType)
        {
            List<string?> orgDetails = new List<string?>();
            if (requestType.ToLower() == ApplicationConstants.CY.ToLower())
            {
                orgDetails = await _context.MctEdmMappingCies.Select(x => (string?)x.Org).Distinct().OrderBy(s => s).ToListAsync().ConfigureAwait(false);

            }
            else if (requestType.ToLower() == ApplicationConstants.FY.ToLower())
            {
                orgDetails = await _context.MctEdmMappings.Select(x => (string?)x.Org).Distinct().OrderBy(s => s).ToListAsync().ConfigureAwait(false);
            }
            orgDetails.Insert(0, ApplicationConstants.All);
            return orgDetails;
        }

        /// <summary>
        /// Gets active start and end date of the window.
        /// </summary>
        /// <returns>ToolRuntimeWindow</returns>
        public async Task<ToolRuntimeWindow?> GetToolRuntimeWindowAsync()
        {
            return await _context.ToolRuntimeWindows
                   .AsQueryable()
                   .Where(s => (bool)s.IsActive)
                   .OrderByDescending(x => x.ModifiedDate)
                   .FirstOrDefaultAsync();
        }

        #region PrivateMethods 

        private List<TaxonomyInfoDetails?> CreateRoleSummary(List<GetTaxonomyWithIncentiveResult> entites, string org)
        {
            List<string?> roleSummaries = new List<string?>();
            List<TaxonomyInfoDetails?> list = new List<TaxonomyInfoDetails?>();

            roleSummaries = entites.Where(x => x.RoleSummary != null).Select(x => x.RoleSummary).Distinct().OrderBy(s => s).ToList();
            roleSummaries.Insert(0, ApplicationConstants.All);

            foreach (var roleSummary in roleSummaries)
            {
                TaxonomyInfoDetails taxonomyDetails = new TaxonomyInfoDetails()
                {
                    RoleSummary = roleSummary,
                    QualifierAndIncentivePlan = CreateQ1(entites, roleSummary),
                };

                list.Add(taxonomyDetails);
            }

            return list;
        }

        private List<QualifierAndIncentivePlan?> CreateQ1(List<GetTaxonomyWithIncentiveResult> entites, string? roleSummary)
        {
            List<QualifierAndIncentivePlan?> qualifierAndIncentivePlan = new List<QualifierAndIncentivePlan>();

            var qualifier1List = entites
                                 .Where(x => x.Q1 != null && (roleSummary == ApplicationConstants.All || x.RoleSummary == roleSummary))
                                 .Select(x => x.Q1)
                                 .Distinct()
                                 .OrderBy(x => x)
                                 .ToList();

            qualifier1List.Insert(0, ApplicationConstants.All);

            var filteredEntities = roleSummary != ApplicationConstants.All
                ? entites.Where(x => x.RoleSummary == roleSummary).ToList()
                : entites;

            foreach (var qualifier1 in qualifier1List)
            {
                QualifierAndIncentivePlan info = new QualifierAndIncentivePlan()
                {
                    Q1 = qualifier1,
                    q2AndIncentivePlan = CreateQ2(filteredEntities, qualifier1),
                };

                qualifierAndIncentivePlan.Add(info);
            }

            return qualifierAndIncentivePlan;
        }

        private List<Q2AndIncentivePlan?> CreateQ2(List<GetTaxonomyWithIncentiveResult> entites, string? q1)
        {
            List<string?> qualifier2List = new List<string?>();
            List<Q2AndIncentivePlan?> q2AndIncentivePlan = new List<Q2AndIncentivePlan?>();
            qualifier2List = entites.Where(x => x.Q2 != null && (q1 == ApplicationConstants.All || x.Q1 == q1))
                                   .Select(x => x.Q2)
                                   .Distinct()
                                   .OrderBy(x => x)
                                   .ToList();
            qualifier2List.Insert(0, ApplicationConstants.All);

            var filteredEntities = q1 != ApplicationConstants.All
                ? entites.Where(x => x.Q1 == q1).ToList()
                : entites;

            foreach (var qualifier2 in qualifier2List)
            {
                Q2AndIncentivePlan info = new Q2AndIncentivePlan()
                {
                    Q2 = qualifier2,
                    IncentivePlan = CreateIncentivePlan(filteredEntities, qualifier2),
                };

                q2AndIncentivePlan.Add(info);
            }
            return q2AndIncentivePlan;
        }

        private List<string?> CreateIncentivePlan(List<GetTaxonomyWithIncentiveResult> entities, string? q2)
        {
            var filteredEntities = entities.Where(x => x.IncentivePlan != null);
            if (q2 != ApplicationConstants.All)
            {
                filteredEntities = filteredEntities.Where(x => x.Q2 == q2);
            }

            var incentivePlan = filteredEntities.Select(x => x.IncentivePlan).Distinct().OrderBy(x => x).ToList();
            incentivePlan.Insert(0, ApplicationConstants.All);

            return incentivePlan;
        }

        #endregion

    }
}

