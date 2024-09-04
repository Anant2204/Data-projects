// <copyright file="AuthService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.SharedServices
{
    using MCT.Business.Interfaces;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Repository;
    using MCT.DataAccess.UnitOfWork;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 
    /// </summary>
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork unitOfWork;

        /// <summary>
        /// Auth service constructor.
        /// </summary>
        /// <param name="unitOfWork">Unit of work.</param>
        public AuthService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        /// <inheritdoc/>
        public async Task<List<string>> GetAuthorizedAliasesListAsync(IEnumerable<string> managerAliasList, string loggedInUserAlias)
        {
            HashSet<string> authorizedManagerAliases = new HashSet<string>();
            var managerRepository = unitOfWork?.GetRepository<IManagerRepository>();

            if (managerRepository == null)
            {
                return new List<string>();
            }

            var managerList = await managerRepository.GetAll(loggedInUserAlias).ConfigureAwait(false);

            if (managerList == null || managerList.Count == 0)
            {
                return new List<string>();
            }

            foreach (var manager in managerList)
            {
                authorizedManagerAliases.Add(manager.Alias);
            }

            if (managerAliasList.Count() > 0)
            {
                foreach (var alias in authorizedManagerAliases)
                {
                    if (!managerAliasList.Contains(alias, StringComparer.InvariantCultureIgnoreCase))
                    {
                        authorizedManagerAliases.Remove(alias);
                    }
                }
            }

            return authorizedManagerAliases.ToList();
        }

        /// <inheritdoc/>
        public async Task<bool?> checkUserAccessForSelectedManager(string loggedInUserAlias, string selectedManagerList, string roles)
        {
            var commonRepository = unitOfWork?.GetRepository<ICommonRepository>();
            if (commonRepository == null)
            {
                return false;
            }

            return await commonRepository.checkUserAccessForSelectedManager(selectedManagerList, loggedInUserAlias, roles);

        }

        /// <inheritdoc/>
        public async Task<bool> HasAccessAsync(IEnumerable<string> employeeManagerAliasList, string loggedInUserAlias)
        {
            if (!employeeManagerAliasList.Any())
            {
                return false;
            }

            var managerRepository = unitOfWork?.GetRepository<IManagerRepository>();

            if (managerRepository == null)
            {
                return false;
            }

            var managerList = await managerRepository.GetAll(loggedInUserAlias).ConfigureAwait(false);

            if (managerList == null || managerList.Count == 0)
            {
                return false;
            }

            return employeeManagerAliasList.All(managerAlias => managerList.Select(m => m.Alias).Contains(managerAlias));

        }

        /// <inheritdoc/>
        public async Task<IEnumerable<string>?> GetManagerListForAuthorizedUser(List<string> managerAliases, string loggedInUserAlias, List<string> roleList, bool completeReportingHierarchy)
        {
            string selectedManagerList = String.Join(",", managerAliases);
            string rolesList = String.Join(",", roleList);

            var hasAccess = await checkUserAccessForSelectedManager(loggedInUserAlias, selectedManagerList, rolesList);

            if (hasAccess == null || hasAccess == false)
            {
                return null;
            }

            var aliasList = await GetHierachyByUser(managerAliases, completeReportingHierarchy);

            if (aliasList == null || aliasList.Count() == 0)
            {
                return null;
            }
            return aliasList;
        }


        /// <inheritdoc/>
        public async Task<IEnumerable<string>> GetHierachyByUser(List<string> selectedManager, bool completeReportingHierarchy)
        {
            var commonRepository = unitOfWork.GetRepository<ICommonRepository>();

            return await commonRepository.GetHierachyByUser(selectedManager, completeReportingHierarchy);


        }


    }

}
