// <copyright file="ManagerRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Repository
{
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Data;
    using static System.Net.Mime.MediaTypeNames;

    /// <summary>
    /// Manager Repository.
    /// </summary>
    public class ManagerRepository : Repository<VwManagerList>, IManagerRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;

        /// <summary>Initializes a new instance of the <see cref="ManagerRepository" /> class.</summary>
        /// <param name="context">The context.</param>
        public ManagerRepository(ConversationContext context) : base(context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all Manager data.
        /// </summary>
        public async Task<List<Manager>> GetAll()
        {
            return await GetAll(string.Empty);
        }

        /// <summary>
        /// Get all Manager data with Authorization.
        /// </summary>
        public async Task<List<Manager>> GetAll(string currentUserAlias)
        {
            var query = _context.VwManagerSecurities.AsQueryable();
            if (!string.IsNullOrEmpty(currentUserAlias))
            {
                query = query.Where(p => p.ManagerAlias == currentUserAlias || p.Proxy.Contains("@" + currentUserAlias + "@"));
            }
            return await query.Select(s => new Manager()
            {
                FullName = s.DirectManagerFullName,
                Alias = s.DirectManagerAlias

            }).Distinct().ToListAsync();
        }

        /// <summary>
        /// Get all Manager data with Authorization.
        /// </summary>
        public async Task<List<GetManagerListResult>?> GetManagersList(string currentUserAlias, bool? completeReportingHierarchy, List<string> roleList)
        {
            string roleString = string.Join(",", roleList.Select(i => i));
            return await _context.GetManagersList(currentUserAlias, completeReportingHierarchy, roleString);
        }

        /// <summary>
        /// Get cy or fy  Manager for emp alias.
        /// </summary>
        public async Task<string> GetManagersListByEmpAlias(string empAlias, string isSendOrReceive)
        {
            if (isSendOrReceive == "send")
            {
                return await _context.VwHrdata.AsQueryable().Where(s => s.Ic == empAlias).Select(s => s.CyManagerAlias).FirstOrDefaultAsync().ConfigureAwait(false);
            }              
            else
            {
                return await _context.VwHrdata.AsQueryable().Where(s => s.Ic == empAlias).Select(s => s.FyManagerAlias).FirstOrDefaultAsync().ConfigureAwait(false);
            }
        }
    }
}
