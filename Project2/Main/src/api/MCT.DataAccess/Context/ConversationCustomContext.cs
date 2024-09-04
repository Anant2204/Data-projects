// <copyright file="IUnitOfWork.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

using MCT.DataAccess.EfModels.EfCustomModels;
using MCT.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
namespace MCT.DataAccess.Context
{
    /// <summary>
    /// This partial class is going to use for the sp calling.
    /// </summary>
    public partial class ConversationContext : DbContext
    {
        /// <summary>
        /// Gets or sets the UserAccessDetails.
        /// </summary>
        public virtual DbSet<UserAccessDetails> UserAccessDetails { get; set; }

        /// <summary>
        /// Gets or sets the managerlist response.
        /// </summary>
        public virtual DbSet<GetManagerListResult> ManagersListResponse { get; set; }

        /// <summary>
        /// Gets or sets the checkUserAccess response.
        /// </summary>
        public virtual DbSet<CheckUserAccess> Result { get; set; }
        /// <summary>
        /// Gets or sets the hasAccess response.
        /// </summary>
        public virtual DbSet<CheckUserAccess> HasAccess { get; set; }

        /// <summary>
        /// Gets or sets the Conversation list response.
        /// </summary>
        public virtual DbSet<GetConversationListResult> ConversationListResponse { get; set; }

        /// <summary>
        /// Gets or sets the future manager correction result.
        /// </summary>
        public virtual DbSet<GetFutureManagerRequestsResult> FutureManagerCorrectionResult { get; set; }

        /// <summary>
        /// Gets or sets the taxonomy correction result.
        /// </summary>
        public virtual DbSet<GetTaxonomyCorrectionRequestsResult> TaxonomyCorrectionResults { get; set; }

        /// <summary>
        /// Gets or sets the SectionDetails result.
        /// </summary>
        public virtual DbSet<GetSectionDetailsResult> SectionDetailsResult { get; set; }

        /// <summary>
        /// Gets or sets the ApproverLevelResult result.
        /// </summary>
        public virtual DbSet<GetLevelsOfApprovalRequired> ApproverLevelResult { get; set; }

        /// <summary>
        /// Gets or sets the ApproveRejectAccessResult result.
        /// </summary>
        public virtual DbSet<FYManagerCorrectionApprovalResult> ApproveRejectAccessResult { get; set; }

        /// <summary>
        /// Gets or sets the GetRoleSummaryQ1Q2Result result.
        /// </summary>
        public virtual DbSet<GetTaxonomyResult> RoleSummaryQ1Q2Result { get; set; }

        /// <summary>
        /// Gets or sets the taxonomy script content result.
        /// </summary>
        public virtual DbSet<GetTaxonomyScriptContentResult> TaxonomyScriptContentResults { get; set; }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserAccessDetails>(entity =>
                entity.HasNoKey());
            modelBuilder.Entity<GetManagerListResult>(entity =>
                entity.HasNoKey());

            modelBuilder.Entity<CheckUserAccess>(entity =>
             entity.HasNoKey());

            modelBuilder.Entity<GetConversationListResult>(entity =>
            entity.HasNoKey());

            modelBuilder.Entity<GetFutureManagerRequestsResult>(entity =>
            entity.HasNoKey());

            modelBuilder.Entity<GetTaxonomyCorrectionRequestsResult>(entity =>
            entity.HasNoKey());

            modelBuilder.Entity<GetSectionDetailsResult>(entity =>
           entity.HasNoKey());

            modelBuilder.Entity<GetLevelsOfApprovalRequired>(entity =>
           entity.HasNoKey());

            modelBuilder.Entity<FYManagerCorrectionApprovalResult>(entity =>
          entity.HasNoKey());

            modelBuilder.Entity<GetTaxonomyResult>(entity =>
          entity.HasNoKey());

            modelBuilder.Entity<GetTaxonomyScriptContentResult>(entity =>
          entity.HasNoKey());
        }

        /// <summary>
        /// Methos which will return all permissions.
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <returns></returns>
        public async Task<List<UserAccessDetails>> GetRoleFeaturesAndPermissions(string loggedInUserAlias)
        {
            return await this.UserAccessDetails
                .FromSqlInterpolated($"[dbo].[GetRoleFeaturesAndPermissions] @alias={loggedInUserAlias}")
                .ToListAsync();
        }

        /// <summary>
        /// Get the list of manager and default selection.
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="completeView"></param>
        /// <param name="roleList"></param>
        /// <returns></returns>
        public async Task<List<GetManagerListResult>?> GetManagersList(string loggedInUserAlias, bool? completeView, string roleList)
        {
            var result = await this.ManagersListResponse
            .FromSqlInterpolated($"[dbo].[getManagersList] @loggedInUserAlias={loggedInUserAlias}, @completeView={completeView}, @rolesList={roleList}").ToListAsync();
            return result;
        }

        /// <summary>
        /// Check the user Access.
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="selectedManagerAlias"></param>
        /// <param name="roleList"></param>
        /// <returns></returns>
        public async Task<bool?> checkUserAccessForSelectedManager(string loggedInUserAlias, string selectedManagerAlias, string roleList)
        {
            var result = await this.Result.FromSqlInterpolated($"[dbo].[checkUserAccessForSelectedManager] @loggedInUserAlias={loggedInUserAlias}, @selectedManagerAliases={selectedManagerAlias}, @rolesList={roleList}").ToListAsync();

            var hasAccess = result != null && result[0].hasAccess == 1 ? true : false;
            return hasAccess;
        }

        /// <summary>
        /// Gets the conversation list.
        /// </summary>
        /// <param name="employeeManagerAliases">The selected manager alias.</param>
        /// <param name="requestFrom">The request from.</param>
        /// <returns>Gets list of conversations.</returns>
        public async Task<List<GetConversationListResult>?> GetConversationList(string employeeManagerAliases, string requestFrom)
        {
            var result = await this.ConversationListResponse
            .FromSqlInterpolated($"[dbo].[GetConversationList] @employeeManagerAliases={employeeManagerAliases}, @requestFrom={requestFrom}").ToListAsync();
            return result;
        }

        /// <summary>
        /// Gets the list of future manager request.
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roleList"></param>
        /// <param name="CompleteReportingHierarchy"></param>
        /// <returns>List of GetFutureManagerCorrectionResult.</returns>
        public async Task<List<GetFutureManagerRequestsResult>> GetFutureManagerCorrectionRequest(string loggedInUserAlias, string roleList, bool CompleteReportingHierarchy = true)
        {
            var result = await this.FutureManagerCorrectionResult
             .FromSqlInterpolated($"[dbo].[getFutureManagerRequests] @loggedInUserAlias={loggedInUserAlias}, @completeView={CompleteReportingHierarchy}, @rolesList={roleList}").ToListAsync();
            return result;
        }

        /// <summary>
        /// Gets the section details list.
        /// </summary>
        /// <param name="employeeManagerAlias">The  employee alias.</param>
        /// <param name="requestFrom">if set to <c>true</c> [is send stay].</param>
        /// <returns>Gets section details.</returns>
        public async Task<List<GetSectionDetailsResult>?> GetSectionDetailsResult(string? employeeManagerAlias, string requestFrom)
        {
            var result = await this.SectionDetailsResult
            .FromSqlInterpolated($"[dbo].[GetSectionsDetails] @empAlias={employeeManagerAlias}, @isSendOrReceive={requestFrom}").ToListAsync();
            return result;
        }

        /// <summary>
        /// Gets the section details list.
        /// </summary>
        /// <param name="ic">ic</param>
        /// <returns>Gets section details.</returns>
        public async Task<bool> GetApproverLevelResult(string? ic)
        {
            var result = await this.ApproverLevelResult
               .FromSqlInterpolated($"[dbo].[FyManagerTwoLevelApprovalRequired] @employeeAlias={ic}").ToListAsync();


            var hasAccess = result != null ? result.FirstOrDefault().TwoLevelApprovalRequired : false;
            return hasAccess;
        }

        /// <summary>
        /// Gets the CheckApproveAndRejectAccess list.
        /// </summary>
        /// <param name="ic">ic</param>
        /// <param name="loggedInUserAlias">ic</param>
        /// <param name="roleList">ic</param>
        /// <returns>bool.</returns>
        public async Task<bool> FYManagerCorrectionsApprovalAccess(string? ic, string loggedInUserAlias, string roleList)
        {
            var result = await this.ApproveRejectAccessResult
               .FromSqlInterpolated($"[dbo].[FYManagerCorrectionsApprovalAccess] @icAliases={ic},@loggedInUserAlias={loggedInUserAlias},@rolesList={roleList}").ToListAsync();


            var hasAccess = result != null ? result.FirstOrDefault().AccessGranted : false;
            return hasAccess;
        }

        /// <summary>
        /// Gets the GetTaxonomyResult details list.
        /// </summary>
        /// <param name="org">The  org.</param>
        /// <param name="careerStage">careerStage.</param>
        /// <returns>Gets roleSummaryQ1Q2 details.</returns>
        public async Task<List<GetTaxonomyResult>?> GetTaxonomyResult(string? org, string careerStage)
        {
            var result = await this.RoleSummaryQ1Q2Result
            .FromSqlInterpolated($"dbo.[GetTaxonomyDetails] @Org={org}, @CareerStage={careerStage}").ToListAsync();
            return result;
        }

        /// <summary>
        /// Gets GetTaxonomyCorrectionRequestsResult details list.
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roleList"></param>
        /// <param name="CompleteReportingHierarchy"></param>
        /// <returns></returns>
        public async Task<List<GetTaxonomyCorrectionRequestsResult>> GetTaxonomyChangeRequest(string loggedInUserAlias, string roleList, bool CompleteReportingHierarchy = true)
        {

            var result = await this.TaxonomyCorrectionResults
           .FromSqlInterpolated($"[dbo].[GetTaxonomyCorrectionRequests] @loggedInUserAlias={loggedInUserAlias}, @completeView={CompleteReportingHierarchy}, @rolesList={roleList}").ToListAsync();
            return result;
        }

        /// <summary>
        /// Gets TaxonomyScriptContent  list.
        /// </summary>
        /// <returns></returns>
        public async Task<List<GetTaxonomyScriptContentResult>> GetTaxonomyScriptContent()
        {
            var result = await this.TaxonomyScriptContentResults
           .FromSqlInterpolated($"[dbo].GetTaxonomyScriptContent").ToListAsync();
            return result;
        }
    }
}
