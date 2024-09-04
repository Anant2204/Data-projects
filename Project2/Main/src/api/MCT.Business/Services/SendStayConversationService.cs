// <copyright file="SendStayConversationService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.Business.Services
{
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using Azure.Core;

    using MCT.Business.Interfaces;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.Services.Tools.Infrastructure.Logging;
    using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

    /// <summary>
    ///   SendStayConversation service
    /// </summary>
    public class SendStayConversationService : ISendStayConversationService
    {
        /// <summary>The unit of work</summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Auth service.
        /// </summary>
        private readonly IAuthService authService;

        /// <summary>Business logic for SendStayConversation .</summary>
        /// <param name="unitOfWork">The unit of work.</param>z
        /// <param name="authService">Auth service.</param>
        public SendStayConversationService(IUnitOfWork unitOfWork, IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            this.authService = authService;
        }

        /// <inheritdoc/>
        public async Task<SendStayConversationResponse?> Get(ConversationListRequest conversationListRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                 { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "409EA077-ABC5-4611-BBBB-0DCBCE41D52E", $"Starting - {this.GetType()}.Get");
                List<string> managerAliasList = conversationListRequest.ManagerAliases;


                var repositoryObj = _unitOfWork?.GetRepository<ISendStayRepository>();

                SendStayConversationResponse sendStayConversationResponse = new SendStayConversationResponse();

                var aliasList = await this.authService.GetManagerListForAuthorizedUser(conversationListRequest.ManagerAliases, loggedInUserAlias, roleList, conversationListRequest.CompleteReportingHierarchy);

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("SendStayRepository is not available.");
                }

                if (aliasList == null)
                {
                    return null;
                }
                List<SendConversationDto> sendStayConversations;

                sendStayConversations = await repositoryObj.Get(aliasList).ConfigureAwait(false);

                sendStayConversations = sendStayConversations.OrderBy(x => x.FullName).ToList();

                sendStayConversationResponse.Conversations = sendStayConversations;

                return sendStayConversationResponse;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("409EA077-ABC5-4611-BBBB-0DCBCE41D52E", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("409EA077-ABC5-4611-BBBB-0DCBCE41D52E", "Get", eventProperties, metrics);
            }

        }

        /// <inheritdoc/>
        public async Task<ConversationStatisticsResponse?> GetStatistics(ConversationStatisticsRequest conversationStatisticRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "36d77aca-545c-4c86-994d-6b136ea509fc", $"Starting - {this.GetType()}.GetStatistics");
                List<string> managerAliasList = conversationStatisticRequest.ManagerAliases;
                ConversationStatisticsResponse conversationsStatistics;

                var aliasList = await this.authService.GetManagerListForAuthorizedUser(conversationStatisticRequest.ManagerAliases, loggedInUserAlias, roleList, conversationStatisticRequest.CompleteReportingHierarchy);

                var repositoryObj = _unitOfWork?.GetRepository<ISendStayRepository>();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("SendStayRepository is not available.");
                }

                if (aliasList == null)
                {
                    return null;
                }

                conversationsStatistics = await repositoryObj.GetStatistics(aliasList).ConfigureAwait(false);

                return conversationsStatistics;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("36d77aca-545c-4c86-994d-6b136ea509fc", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("36d77aca-545c-4c86-994d-6b136ea509fc", "Get", eventProperties, metrics);
            }
        }

        /// <inheritdoc/>
        public async Task<bool?> SetConversationComplete(List<ConversationCompletionRequest> conversationCompletionRequest, string loggedInUserAlias, List<string> roleList)
        {
            bool hasAccess = true;
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "2422aa0d-45b0-487c-b89f-630a322d003b", $"Starting - {this.GetType()}.SetConversationComplete");

                if ((conversationCompletionRequest != null && conversationCompletionRequest.Count > 0) &&
                    conversationCompletionRequest.Any(s => string.IsNullOrEmpty(s.CYManagerAlias) ||
                   string.IsNullOrEmpty(s.FYManagerAlias)))
                {
                    return null;
                }

                var commonRepository = _unitOfWork.GetRepository<ICommonRepository>();


                List<EmployeeManager>? employeeManagerList = null;
                if (conversationCompletionRequest != null)
                {
                    employeeManagerList = await commonRepository.GetEmployeeManagerAliasList(conversationCompletionRequest.Select(s => s.EmployeeAlias).ToList());
                }


                if (employeeManagerList == null || !conversationCompletionRequest.All(req => employeeManagerList.Any(emp => emp.EmployeeAlias == req.EmployeeAlias && emp.CYManagerAlias == req.CYManagerAlias)))
                {
                    hasAccess = false;

                    return null;
                }

                var employeeCYManagerAliasList = employeeManagerList.Select(emp => emp.CYManagerAlias).AsEnumerable();
                string selectedManagerList = String.Join(",", employeeCYManagerAliasList);
                string rolesList = String.Join(",", roleList);

                var checkAccess = await this.authService.checkUserAccessForSelectedManager(loggedInUserAlias, selectedManagerList, rolesList);

                if (checkAccess == null || checkAccess == false)
                {
                    hasAccess = false;

                    return null;
                }

                if (!hasAccess)
                {
                    return null;
                }

                var sendStayRepository = _unitOfWork.GetRepository<ISendStayRepository>();

                bool updateResult = await sendStayRepository.CompleteConversation(conversationCompletionRequest, loggedInUserAlias).ConfigureAwait(false);

                return updateResult;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("36d77aca-545c-4c86-994d-6b136ea509fc", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("36d77aca-545c-4c86-994d-6b136ea509fc", "POST", eventProperties, metrics);
            }
        }


    }
}
