// <copyright file="ReceiveConversationRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Repository
{
    using System.Globalization;
    using System.Text;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;
    using Constants = MCT.DataAccess.ApplicationConstants;

    /// <summary>
    /// ReceiveCoversationRepository
    /// </summary>
    public class ReceiveConversationRepository : Repository<VwHrdatum>, IReceiveConversationRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;

        /// <summary>ReceiveCoversationRepository</summary>
        /// <param name="context">The context.</param>
        public ReceiveConversationRepository(ConversationContext context) : base(context)
        {
            _context = context;
        }

        /// <summary>Get the receive conversations based on  manager alias.</summary>
        /// <param name="managerAlias">The manager alias.</param>
        /// <returns>
        ///   ReceiveConversationDto
        /// </returns>
        public async Task<List<ReceiveConversationDto>> Get(IEnumerable<string> managerAlias)
        {
            List<ReceiveConversationDto> receiveConversationDtos = new List<ReceiveConversationDto>();

            if (managerAlias == null || !managerAlias.Any())
            {
                return receiveConversationDtos;
            }
            else
            {
                string employeeManagerAliases = String.Join(",", managerAlias);
                var conversations = await _context.GetConversationList(employeeManagerAliases, ApplicationConstants.Receive).ConfigureAwait(false);

                if (conversations == null || !conversations.Any())
                {
                    return receiveConversationDtos;
                }

                receiveConversationDtos = conversations.Where(c => c.FyManagerChange == Constants.Y)
                .Select(conversation => new ReceiveConversationDto
                {
                    FullName = conversation.IC_FullName,
                    Alias = conversation.IcAlias,
                    FyManagerChange = conversation.FyManagerChange,
                    SendingConversationStatus = conversation.SendingFormatingStatus,
                    ReceiveConversationStatus = conversation.ReceivingFormatingStatus,
                    CyManagerAlias = conversation.Cy_ManagerAlias,
                    EdmValidation = conversation.R2_EdmValidation,
                    FyManagerAlias = conversation.Fy_ManagerAlias,
                    FyOrg = conversation.Fy_Org,
                    FyRoleSummary = conversation.Fy_RoleSummary,
                    FyQ1 = conversation.Fy_Q1,
                    FyQ2 = conversation.Fy_Q2,
                    FyIncentivePlan = conversation.Fy_IncentivePlan,
                    FyCostCenter = conversation.Fy_CostCenter,
                    CyOrg = conversation.Cy_Org,
                    CyRoleSummary = conversation.Cy_RoleSummary,
                    CyQ1 = conversation.Cy_Q1,
                    CyQ2 = conversation.Cy_Q2,
                    CyCostCenter = conversation.Cy_CostCenter,
                    CyIncentivePlan = conversation.Cy_IncentivePlan,
                    CyCareerStage = conversation.Cy_CareerStage,
                    CyManagerFullName = conversation.Cy_ManagerFullName,
                    HasActiveFutureManagerRequest = conversation.HasActiveFutureManagerRequest,
                    HasActiveTaxonomyCorrectionRequest = conversation.HasActiveTaxonomyManagerRequest,
                    TaxonomyCorrectionRequestSubmittedBy = conversation.TaxonomyCorrectionRequestSubmittedBy,
                    FyCareerStage = conversation.Fy_CareerStage,
                    FyManagerFullName = conversation.Fy_ManagerFullName,
                    FutureManagerRequestSubmittedBy = conversation.FutureManagerRequestSubmittedBy,
                    IsEmployeeRecordApproved = conversation.IsEmployeeRecordApproved,
                })
                .ToList();

                return receiveConversationDtos;
            }
        }

        /// <summary>
        ///Receive Conversation statistic  Method.
        /// </summary>
        public async Task<ConversationStatisticsResponse> GetStatistics(IEnumerable<string> managerAliasList)
        {
            IQueryable<VwHrdatum> query;
            ConversationStatisticsResponse conversationStatisticsResponse = new ConversationStatisticsResponse();

            if (managerAliasList == null || !managerAliasList.Any())
            {
                return conversationStatisticsResponse;
            }
            else
            {
                query = _context.VwHrdata.AsQueryable().Where(x => x.FyManagerAlias != null && managerAliasList.Contains(x.FyManagerAlias) && x.FymanagerChange == Constants.Y);

                var allCounts = await query
                    .GroupBy(x => 1)
                    .Select(g => new
                    {
                        RequiredCompleted = g.Count(x => (x.Conversation == Constants.Required) && (x.R2ConversationStatus == Constants.Completed)),
                        RequiredPending = g.Count(x => (x.Conversation == Constants.Required) && (new[] { Constants.Pending, Constants.Attempted }.Contains(x.R2ConversationStatus))),
                        RequiredConversations = g.Count(x => x.Conversation == Constants.Required)
                    })
                    .FirstOrDefaultAsync()
                    .ConfigureAwait(false);

                conversationStatisticsResponse.RequiredCompleted = allCounts?.RequiredCompleted ?? 0;
                conversationStatisticsResponse.RequiredPending = allCounts?.RequiredPending ?? 0;
                conversationStatisticsResponse.RequiredConversations = allCounts?.RequiredConversations ?? 0;
            }

            return conversationStatisticsResponse;
        }

        /// <summary>
        /// Marks completion send stay conversation.
        /// </summary>
        /// <param name="conversationCompletionRequest">Conversation completion request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <returns></returns>
        public async Task<bool> CompleteConversation(List<ConversationCompletionRequest> conversationCompletionRequest, string loggedInUserAlias)
        {
            if (conversationCompletionRequest == null)
            {
                return false;
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    List<string> ic = new List<string>();
                    foreach (var conversation in conversationCompletionRequest)
                    {

                        ic.Add(conversation.EmployeeAlias);
                    }

                    var ics = ic.ToArray();

                    var icParameters = ics.Select((ic, index) => new SqlParameter($"@Ic{index}", ic)).ToArray();

                    var query = new StringBuilder()
                        .AppendLine("UPDATE HR.Tbl_Hrdata_ToolInput")
                        .AppendLine("SET R2_ConversationStatus = @R2ConversationStatus,")
                        .AppendLine("R2_updatedby = @R2Updatedby,")
                        .AppendLine("R2_update = @R2Update,")
                        .AppendLine("R2_CoversationLevel = @R2CoversationLevel,")
                        .AppendLine("ReceiveScriptFollowed = @ReceiveScriptFollowed")
                        .AppendLine("WHERE Ic IN (" + string.Join(", ", icParameters.Select(p => p.ParameterName)) + ")");

                    var parameters = new List<SqlParameter>
                    {
                        new SqlParameter("@R2ConversationStatus", "Completed"),
                        new SqlParameter("@R2Updatedby", loggedInUserAlias),
                        new SqlParameter("@R2Update", DateTime.UtcNow),
                        new SqlParameter("@ReceiveScriptFollowed", true),
                        new SqlParameter("@R2CoversationLevel", "Individual"),
                    }
                    .Concat(icParameters)
                    .ToArray();

                    // Execute raw SQL query to update the record
                    var rowsAffected = await _context.Database.ExecuteSqlRawAsync(query.ToString(), parameters);

                    _context.SaveChanges();

                    transaction.Commit();

                }
                catch (Exception ex)
                {
                    // Handle exceptions and rollback transaction if needed
                    transaction.Rollback();
                    throw ex;
                }
            }

            return true;
        }

        /// <summary>
        /// Get future year manager alias.
        /// </summary>
        public async Task<string?> GetFYManagerAlias(string icAlias)
        {
            VwHrdatum? query;

            if (icAlias == null)
            {
                return null;
            }
            else
            {
                query = await _context.VwHrdata.AsQueryable().Where(x => x.Ic == icAlias).FirstOrDefaultAsync().ConfigureAwait(false);
            }

            return query?.FyManagerAlias ?? null;
        }
    }
}
