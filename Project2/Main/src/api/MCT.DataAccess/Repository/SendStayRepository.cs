// <copyright file="SendStayRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Repository
{
    using System.Text;
    using MCT.DataAccess.Context;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Send and stay  Get Method.
    /// </summary>
    public class SendStayRepository : Repository<VwHrdatum>, ISendStayRepository
    {
        /// <summary>The context</summary>
        protected readonly ConversationContext _context;
        /// <summary>Initializes a new instance of the <see cref="SendStayRepository" /> class.</summary>
        /// <param name="context">The context.</param>
        public SendStayRepository(ConversationContext context) : base(context)
        {
            _context = context;
        }

        /// <summary>
        /// Send and stay statistic Get Method.
        /// </summary>
        public async Task<List<SendConversationDto>> Get(IEnumerable<string> managerAliasList)
        {
            List<SendConversationDto> sendStayConversationDtos = new List<SendConversationDto>();

            if (managerAliasList == null || !managerAliasList.Any())
            {
                return sendStayConversationDtos;
            }
            else
            {
                string employeeManagerAliases = String.Join(",", managerAliasList);
                var conversations = await _context.GetConversationList(employeeManagerAliases, ApplicationConstants.SendStay).ConfigureAwait(false);

                if (conversations == null || !conversations.Any())
                {
                    return sendStayConversationDtos;
                }

                sendStayConversationDtos = conversations
                .Select(conversation => new SendConversationDto
                {
                    FullName = conversation.IC_FullName,
                    Alias = conversation.IcAlias,
                    Conversation = conversation.Conversation,
                    CyManagerAlias = conversation.Cy_ManagerAlias,
                    CyManagerFullName = conversation.Cy_ManagerFullName,
                    FyManagerChange = conversation.FyManagerChange,
                    ConversationStatus = conversation.R1_ConversationStatus,
                    EdmValidation = conversation.R1_EdmValidation,
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
                    HasActiveFutureManagerRequest = conversation.HasActiveFutureManagerRequest,
                    HasActiveTaxonomyCorrectionRequest = conversation.HasActiveTaxonomyManagerRequest,
                    TaxonomyCorrectionRequestSubmittedBy = conversation.TaxonomyCorrectionRequestSubmittedBy,
                    FutureManagerRequestSubmittedBy = conversation.FutureManagerRequestSubmittedBy,
                    FyManagerFullName = conversation.Fy_ManagerFullName,
                    FyCareerStage = conversation.Fy_CareerStage,
                    IsEmployeeRecordApproved = conversation.IsEmployeeRecordApproved
                })
                .ToList();

                return sendStayConversationDtos;
            }
        }

        /// <summary>
        /// Get current year manager alias.
        /// </summary>
        public async Task<string?> GetCYManagerAlias(string icAlias)
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

            return query?.CyManagerAlias ?? null;
        }

        /// <summary>
        /// Send and stay statistic GetStatistics Method.
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
                query = _context.VwHrdata.AsQueryable().Where(x => x.CyManagerAlias != null && managerAliasList.Contains(x.CyManagerAlias));

                var allCounts = await query
                    .GroupBy(x => 1)
                    .Select(g => new
                    {
                        RequiredCompleted = g.Count(x => x.Conversation == "Required" && x.R1ConversationStatus == "Completed"),
                        TotalCompleted = g.Count(x => x.R1ConversationStatus == "Completed"),
                        RequiredPending = g.Count(x => x.Conversation == "Required" && new[] { "Pending", "Attempted" }.Contains(x.R1ConversationStatus)),
                        TotalEmployees = g.Count()
                    })
                    .FirstOrDefaultAsync()
                    .ConfigureAwait(false);

                conversationStatisticsResponse.RequiredCompleted = allCounts?.RequiredCompleted ?? 0;
                conversationStatisticsResponse.TotalCompleted = allCounts?.TotalCompleted ?? 0;
                conversationStatisticsResponse.RequiredPending = allCounts?.RequiredPending ?? 0;
                conversationStatisticsResponse.TotalEmployees = allCounts?.TotalEmployees ?? 0;

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
                        .AppendLine("SET R1_ConversationStatus = @R1ConversationStatus,")
                        .AppendLine("R1_updatedby = @R1Updatedby,")
                        .AppendLine("R1_update = @R1Update,")
                        .AppendLine("R1_CoversationLevel = @R1CoversationLevel,")
                        .AppendLine("SendStayScriptFollowed = @SendStayScriptFollowed")
                        .AppendLine("WHERE Ic IN (" + string.Join(", ", icParameters.Select(p => p.ParameterName)) + ")");

                    var parameters = new List<SqlParameter>
                    {
                        new SqlParameter("@R1ConversationStatus", "Completed"),
                        new SqlParameter("@R1Updatedby", loggedInUserAlias),
                        new SqlParameter("@R1Update", DateTime.UtcNow),
                        new SqlParameter("@SendStayScriptFollowed", true),
                        new SqlParameter("@R1CoversationLevel", "Individual"),
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
    }
}
