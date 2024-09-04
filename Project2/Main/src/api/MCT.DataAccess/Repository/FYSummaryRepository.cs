// <copyright file="FYSummaryRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Repository
{
    using System.Collections.Generic;
    using System.Linq;

    using MCT.DataAccess;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;

    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// FY SummaryRepository.
    /// </summary>
    public class FYSummaryRepository : Repository<VwHrdatum>, IFYSummaryRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;
        /// <summary>Initializes a new instance of the <see cref="FYSummaryRepository" /> class.</summary>
        /// <param name="context">The context.</param>
        public FYSummaryRepository(ConversationContext context) : base(context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public async Task<List<FYSummaryDto>> GetCurrentYearEmployeesAsync(IEnumerable<string> managerAliasList)
        {
            List<FYSummaryDto> fySummaryDtos = new List<FYSummaryDto>();
            if (managerAliasList == null || managerAliasList.Count() == 0)
            {
                return fySummaryDtos;
            }

            fySummaryDtos = await _context.TblHrdata
                .AsQueryable()
                .Where(x => (x.CyManagerAlias != null && managerAliasList.Contains(x.CyManagerAlias)))
                .Select(x => new FYSummaryDto
                {
                    FullName = x.IcFullName,
                    Alias = x.Ic,
                    Q1 = x.CyQ1,
                    Q2 = x.CyQ2,
                    IsMoving = x.FymanagerChange == "Y" ? true : false,
                    RoleSummary = x.FyRoleSummary,
                    HasTaxonomyChange = HasTaxonomyChange(x)
                }).ToListAsync().ConfigureAwait(false);

            return fySummaryDtos;
        }    

        /// <inheritdoc/>
        public async Task<List<FYSummaryDto>> GetFutureYearEmployeesAsync(IEnumerable<string> managerAliasList)
        {
            List<FYSummaryDto> fySummaryDtos = new List<FYSummaryDto>();
            if (managerAliasList == null || managerAliasList.Count() == 0)
            {
                return fySummaryDtos;
            }

            fySummaryDtos = await _context.TblHrdata
                .AsQueryable()
                .Where(x => (x.FyManagerAlias != null && managerAliasList.Contains(x.FyManagerAlias)))
                .Select(x => new FYSummaryDto
                {
                    FullName = x.IcFullName,
                    Alias = x.Ic,
                    Q1 = x.FyQ1,
                    Q2 = x.FyQ2,
                    IsMoving = x.FymanagerChange == ApplicationConstants.Y ? true : false,
                    RoleSummary = x.FyRoleSummary,
                    HasTaxonomyChange = HasTaxonomyChange(x)
                }).ToListAsync().ConfigureAwait(false);

            return fySummaryDtos;
        }

        /// <summary>
        /// FY summary GetStatistics Method.
        /// </summary>
        /// <param name="managerAliasList">List of manager aliases provided.</param>
        public async Task<FYSummaryStatisticsResponse> GetStatisticsAsync(IEnumerable<string> managerAliasList)
        {
            FYSummaryStatisticsResponse statisticsResponse = new FYSummaryStatisticsResponse();

            if (managerAliasList == null || managerAliasList.Count() == 0)
            {
                return statisticsResponse;
            }

            statisticsResponse.CYTeam = await this.GetCurrentYearEmployeesCountAsync(managerAliasList).ConfigureAwait(false);
            statisticsResponse.FYTeam = await this.GetFutureYearEmployeesCountAsync(managerAliasList).ConfigureAwait(false);
            statisticsResponse.Joining = await this.GetJoiningEmployeesCountAsync(managerAliasList).ConfigureAwait(false);
            statisticsResponse.Leaving = await this.GetLeavingEmployeesCountAsync(managerAliasList).ConfigureAwait(false);
            statisticsResponse.FyTaxonomyChange = await this.GetFyTaxonomyChangeEmployeesCountAsync(managerAliasList).ConfigureAwait(false);

            return statisticsResponse;
        }

        private async Task<int> GetCurrentYearEmployeesCountAsync(IEnumerable<string> managersAliasesList)
        {
            return await _context.TblHrdata.AsQueryable().Where(x => (x.CyManagerAlias != null && managersAliasesList.Contains(x.CyManagerAlias))).CountAsync().ConfigureAwait(false);
        }

        private async Task<int> GetFutureYearEmployeesCountAsync(IEnumerable<string> managersAliasesList)
        {
            return await _context.TblHrdata.AsQueryable().Where(x => (x.FyManagerAlias != null && managersAliasesList.Contains(x.FyManagerAlias))).CountAsync().ConfigureAwait(false);
        }

        private async Task<int> GetJoiningEmployeesCountAsync(IEnumerable<string> managersAliasesList)
        {
            return await _context.TblHrdata.AsQueryable().Where(x => x.FyManagerAlias != null && managersAliasesList.Contains(x.FyManagerAlias) && (x.FymanagerChange == ApplicationConstants.Y)).CountAsync().ConfigureAwait(false);
        }

        private async Task<int> GetLeavingEmployeesCountAsync(IEnumerable<string> managersAliasesList)
        {
            return await _context.TblHrdata.AsQueryable().Where(x => x.CyManagerAlias != null && managersAliasesList.Contains(x.CyManagerAlias) && (x.FymanagerChange == ApplicationConstants.Y)).CountAsync().ConfigureAwait(false);
        }

        private async Task<int> GetFyTaxonomyChangeEmployeesCountAsync(IEnumerable<string> managersAliasesList)
        {
            return await _context.TblHrdata.AsQueryable().Where(x => x.FyManagerAlias != null && managersAliasesList.Contains(x.FyManagerAlias)   && (x.CyOrg != x.FyOrg ||
                                x.CyRoleSummary != x.FyRoleSummary ||
                                x.CyQ1 != x.FyQ1 ||
                                x.CyQ2 != x.FyQ2 ||
                                x.CyIncentivePlan != x.FyIncentivePlan)).CountAsync().ConfigureAwait(false);
        }

        private static bool HasTaxonomyChange(TblHrdatum x)
        {
            return  x.CyOrg != x.FyOrg ||
                                x.CyRoleSummary != x.FyRoleSummary ||
                                x.CyQ1 != x.FyQ1 ||
                                x.CyQ2 != x.FyQ2 ||
                                x.CyIncentivePlan != x.FyIncentivePlan ? true : false;
        }

    }

}
