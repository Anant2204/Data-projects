// <copyright file="TaxonomyScriptContentRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Repository
{
    using System.Data;
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.EfModels.EfCustomModels;

    /// <summary>
    /// TaxonomyScriptContentRepository
    /// </summary>
    public class TaxonomyScriptContentRepository : ITaxonomyScriptContentRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;

        /// <summary>Initializes a new instance of the <see cref="TaxonomyScriptContentRepository" /> class.</summary>
        /// <param name="context">The context.</param>
        public TaxonomyScriptContentRepository(ConversationContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Get .
        /// </summary>
        /// <returns></returns>
        public async Task<TaxonomyScriptContentResponse> Get()
        {
            TaxonomyScriptContentResponse taxonomyScriptContentData = new TaxonomyScriptContentResponse();

            var taxonomyScriptContent = await _context.GetTaxonomyScriptContent().ConfigureAwait(false);
            List<TaxonomyScriptContent?> scriptContentList = new List<TaxonomyScriptContent?>();

            foreach (var s in taxonomyScriptContent)
            {
                List<ExcludedManagerDetails> exclusions = new List<ExcludedManagerDetails>();
                if (!string.IsNullOrEmpty(s.Exclusions))
                {
                    var exclusionForSpecificScriptId = s.Exclusions.Split(";");
                    foreach (var exclusionDetails in exclusionForSpecificScriptId)
                    {
                        ExcludedManagerDetails exclusion = FormatExclusionDetails(exclusionDetails);
                        exclusions.Add(exclusion);
                    }
                }

                TaxonomyScriptContent scData = new TaxonomyScriptContent()
                {
                    CreatedDate = s.CreatedDate,
                    ScriptTitle = s.ScriptTitle,
                    CreatedBy = s.CreatedBy,
                    Status = s.Status,
                    ScriptContent = s.ScriptContent,
                    CyOrg = s.CyOrg,
                    CyQ1 = s.CyQ1,
                    CyRoleSummary = s.CyRoleSummary,
                    FyRoleSummary = s.FyRoleSummary,
                    CyIncentivePlan = s.CyIncentivePlan,
                    FyIncentivePlan = s.FyIncentivePlan,
                    CyQ2 = s.CyQ2,
                    FyOrg = s.FyOrg,
                    FyQ1 = s.FyQ1,
                    FyQ2 = s.FyQ2,
                    Id = s.Id,
                    ModifiedBy = s.ModifiedBy,
                    ModifiedDate = s.ModifiedDate,
                    ScriptAppliedEmployeesCount = s.ScriptAppliedEmployeesCount,
                    Exclusions = exclusions,
                };
                scriptContentList.Add(scData);
            }

            taxonomyScriptContentData.TaxonomyScriptsContent = scriptContentList;
            return taxonomyScriptContentData;
        }


        /// <summary>Gets the FYManagers for script exclusion</summary>
        /// <param name="searchString">The search string.</param>
        /// <returns>
        ///  List of Direct Managers
        /// </returns>
        public async Task<List<FutureManager>> GetFYManagersForScriptExclusionAsync(string searchString)
        {
            var exclusionManagers = await _context.DimManagerhierarchies
                        .Where(x => (x.DirectManagerAlias != null ? x.DirectManagerAlias.Contains(searchString) : false || x.DirectManagerFullName != null ? x.DirectManagerFullName.Contains(searchString) : false) && (x.Mtype == ApplicationConstants.FY))
                        .Select(s => new FutureManager
                        {
                            Ic = s.DirectManagerAlias ?? string.Empty,
                            FullName = s.DirectManagerFullName ?? string.Empty

                        }).Distinct().ToListAsync().ConfigureAwait(false);

            return exclusionManagers;
        }

        /// <summary>
        /// TaxonomyScriptContent GetStatisticsAsync Method.
        /// </summary>
        /// <returns>Get Statistics for readyForReview and approved status</returns>
        public async Task<TaxonomyScriptContentStatisticResponse> GetStatisticsAsync()
        {
            TaxonomyScriptContentStatisticResponse statisticResponse = new TaxonomyScriptContentStatisticResponse();
            List<string?> statistics = await _context.ScriptTaxonomyContents.Select(x => x.Status).ToListAsync().ConfigureAwait(false);
            var allCounts = statistics
                .GroupBy(x => 1)
                .Select(g => new
                {
                    TotalChangeContextScript = g.Count(x => x == ApplicationConstants.ReadyForReview && x == ApplicationConstants.Approved),
                    TotalApproved = g.Count(x => x == ApplicationConstants.Approved),
                    TotalReadyForReview = g.Count(x => x == ApplicationConstants.ReadyForReview)
                }).FirstOrDefault();

            statisticResponse.TotalChangeContextScript = allCounts?.TotalChangeContextScript ?? 0;
            statisticResponse.TotalApproved = allCounts?.TotalApproved ?? 0;
            statisticResponse.TotalReadyForReview = allCounts?.TotalReadyForReview ?? 0;

            return statisticResponse;
        }

        /// <summary>
        /// Update Status of TaxonomyScriptContent
        /// </summary>
        /// <param name="scriptId"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <returns>True if the update is successful, otherwise false</returns>
        public async Task<bool> UpdateTaxonomyScriptContentStatusAsync(int scriptId, string loggedInUserAlias)
        {
            bool isUpdate = false;
            var scriptTaxonomyContent = await _context.ScriptTaxonomyContents.FirstOrDefaultAsync(x => x.Id == scriptId && x.Status == ApplicationConstants.ReadyForReview).ConfigureAwait(false);
            if (scriptTaxonomyContent != null)
            {
                scriptTaxonomyContent.Status = ApplicationConstants.Approved;
                scriptTaxonomyContent.ModifiedBy = loggedInUserAlias;
                scriptTaxonomyContent.ModifiedDate = DateTime.UtcNow;

                _context.Entry(scriptTaxonomyContent).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
                isUpdate = true;
            }
            return isUpdate;
        }


        /// <summary>Create Or Edit Script.</summary>
        /// <param name="taxonomyScriptContentUpsertRequest"> TaxonomyScriptContentUpsertRequest. model</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <returns>
        ///   true or false base on api success
        /// </returns>
        public async Task<bool> CreateOrUpdateTaxonomyScriptContentAsync(TaxonomyScriptContentUpsertRequest taxonomyScriptContentUpsertRequest, string? loggedInUserAlias)
        {
            bool isCreatedOrUpdated = false;

            if (taxonomyScriptContentUpsertRequest != null)
            {
                isCreatedOrUpdated = await UpsertContentAsync(taxonomyScriptContentUpsertRequest, loggedInUserAlias).ConfigureAwait(false);
            }

            return isCreatedOrUpdated;
        }

        /// <summary>Create Or Edit List of Scripts.</summary>
        /// <param name="taxonomyScriptContentUpsertRequest"> TaxonomyScriptContentUpsertRequest. model</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <returns>
        ///   true or false base on api success
        /// </returns>
        public async Task<bool> ImportTaxonomyScriptContentAsync(List<TaxonomyScriptContentUpsertRequest> taxonomyScriptContentUpsertRequest, string? loggedInUserAlias)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    if (taxonomyScriptContentUpsertRequest != null)
                    {
                        foreach (var cont in taxonomyScriptContentUpsertRequest)
                        {
                            await UpsertContentAsync(cont, loggedInUserAlias).ConfigureAwait(false);
                        }
                        transaction.Commit();
                        return true;
                    }
                    return false;

                }
                catch (Exception ex)
                {
                    // Handle exceptions and rollback transaction if needed
                    transaction.Rollback();
                    throw ex;
                }
            }

        }


        /// <summary>
        /// Get Audit Details of TaxonomyScriptContent 
        /// </summary>
        /// <param name="scriptId"></param>
        /// <returns>ModifiedBy and ModifiedDate Details</returns>
        public async Task<List<TaxonomyScriptContentAuditHistoryResponse>> GetAuditDetailsAsync(int scriptId)
        {
            List<TaxonomyScriptContentAuditHistoryResponse>? auditHistory = new List<TaxonomyScriptContentAuditHistoryResponse>();

            var taxonomyContent = await _context.ScriptTaxonomyContents.FirstOrDefaultAsync(x => x.Id == scriptId).ConfigureAwait(false);
            if (taxonomyContent != null)
            {
                auditHistory = await _context.ScriptTaxonomyContentHistories.Where(x => x.Id == scriptId)
                                        .Select(x => new TaxonomyScriptContentAuditHistoryResponse { ModifiedBy = x.ModifiedBy, ModifiedDate = x.ValidTo })
                                        .ToListAsync().ConfigureAwait(false);

                auditHistory.Add(new TaxonomyScriptContentAuditHistoryResponse { ModifiedBy = taxonomyContent.CreatedBy, ModifiedDate = taxonomyContent.CreatedDate });
            }
            return auditHistory.OrderByDescending(x => x.ModifiedDate).ToList();
        }

        private async Task<bool> UpsertContentAsync(TaxonomyScriptContentUpsertRequest content, string? loggedInUserAlias)
        {
            var exclusions = string.Join(",", content.Exclusion);

            var parameters = new[]
            {
                    new SqlParameter("@Id", content.Id),
                    new SqlParameter("@CyOrg", content.CyOrg),
                    new SqlParameter("@CyRoleSummary", content.CyRoleSummary),
                    new SqlParameter("@CyQ1", content.CyQ1),
                    new SqlParameter("@CyQ2", content.CyQ2),
                    new SqlParameter("@FyOrg", content.FyOrg),
                    new SqlParameter("@FyRoleSummary", content.FyRoleSummary),
                    new SqlParameter("@FyQ1", content.FyQ1),
                    new SqlParameter("@FyQ2", content.FyQ2),
                    new SqlParameter("@CyIncentivePlan", content.CyIncentivePlan),
                    new SqlParameter("@FyIncentivePlan", content.FyIncentivePlan),
                    new SqlParameter("@Content", content.ScriptContent),
                    new SqlParameter("@Status",ApplicationConstants.ReadyForReview),
                    new SqlParameter("@Title", content.Title),
                    new SqlParameter("@loggedInUserAlias", loggedInUserAlias),
                    new SqlParameter("@exclusions", exclusions)
                };

            await _context.Database.ExecuteSqlRawAsync(
                @"EXEC [dbo].[UpsertTaxonomyScriptContentData]
                     @Id, @CyOrg, @CyRoleSummary, @CyQ1, @CyQ2, @FyOrg, @FyRoleSummary, @FyQ1, @FyQ2,@CyIncentivePlan,@FyIncentivePlan,
                     @Content, @Status, @Title, @loggedInUserAlias, @exclusions ",
                parameters
            );
            return true;

        }

        private ExcludedManagerDetails FormatExclusionDetails(string exclusionDetails)
        {
            ExcludedManagerDetails exclusionManagerDetails = new ExcludedManagerDetails();

            var splitedExclusionManagerDetails = exclusionDetails.Split(",");
            exclusionManagerDetails.Alias = splitedExclusionManagerDetails[1];
            exclusionManagerDetails.FullName = splitedExclusionManagerDetails[0];
            return exclusionManagerDetails;
        }

    }
}
