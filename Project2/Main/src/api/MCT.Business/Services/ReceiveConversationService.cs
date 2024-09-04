// <copyright file="ReceiveConversationService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Services
{
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using MCT.Business.Interfaces;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.Repository;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    /// <summary>
    ///   ReceiveConversationService
    /// </summary>
    public class ReceiveConversationService : IReceiveConversationService
    {
        /// <summary>The unit of work</summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Auth service.
        /// </summary>
        private readonly IAuthService authService;

        /// <summary>ReceiveConversationService constructor</summary>
        /// <param name="unitOfWork">The unit of work.</param>
        /// <param name="authService">Auth service.</param>
        public ReceiveConversationService(IUnitOfWork unitOfWork, IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            this.authService = authService;
        }

        /// <inheritdoc/>
        public async Task<ReceiveConversationResponse?> Get(ConversationListRequest conversationListRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                 { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "907EA077-ABC5-4611-AAAA-0DCBCE41D52E", $"Starting - {this.GetType()}.Get");
                List<string> managerAliasList = conversationListRequest.ManagerAliases;


                var repositoryObj = _unitOfWork.GetRepository<IReceiveConversationRepository>();

                ReceiveConversationResponse receiveConversationResponse = new ReceiveConversationResponse();
                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("SendStayRepository is not available.");
                }

                var aliasList =  await this.authService.GetManagerListForAuthorizedUser(conversationListRequest.ManagerAliases, loggedInUserAlias, roleList, conversationListRequest.CompleteReportingHierarchy);

                if (aliasList == null)
                {
                    return null;
                }

                List<ReceiveConversationDto> receiveConversations;
                receiveConversations = await repositoryObj.Get(aliasList).ConfigureAwait(false);
                receiveConversations = receiveConversations.OrderBy(x => x.FullName).ToList();
                receiveConversationResponse.Conversations = receiveConversations;

                return receiveConversationResponse;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("907EA077-ABC5-4611-AAAA-0DCBCE41D52E", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("907EA077-ABC5-4611-AAAA-0DCBCE41D52E", "Get", eventProperties, metrics);
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
                Instrument.Logger.LogMessage(EventLevel.Informational, "15ff5fcb-38e1-4678-b255-fdd6496bbb46", $"Starting - {this.GetType()}.GetReceiveConversationsStatistics");
                List<string> managerAliasList = conversationStatisticRequest.ManagerAliases;
                ConversationStatisticsResponse? conversationsStatistics;

                var aliasList = await this.authService.GetManagerListForAuthorizedUser(conversationStatisticRequest.ManagerAliases, loggedInUserAlias, roleList, conversationStatisticRequest.CompleteReportingHierarchy);

                var repositoryObj = _unitOfWork?.GetRepository<IReceiveConversationRepository>();

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
                Instrument.Logger.LogException("15ff5fcb-38e1-4678-b255-fdd6496bbb46", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("15ff5fcb-38e1-4678-b255-fdd6496bbb46", "Get", eventProperties, metrics);
            }
        }

        /// <inheritdoc/>
        public async Task<bool?> SetConversationComplete(List<ConversationCompletionRequest> conversationCompletionRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            bool hasAccess = true;
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "1d9e10df-f417-404e-8db0-a5c3fbf1f12e", $"Starting - {this.GetType()}.SetConversationComplete");


                if ((conversationCompletionRequest != null && conversationCompletionRequest.Count > 0) &&
                    conversationCompletionRequest.Any(s => string.IsNullOrEmpty(s.CYManagerAlias) ||
                   string.IsNullOrEmpty(s.FYManagerAlias)))
                {
                    return null;
                }

                var commonRepository = _unitOfWork?.GetRepository<ICommonRepository>();
                var receiveRepository = _unitOfWork?.GetRepository<IReceiveConversationRepository>();

                var employeeManagerList = await commonRepository.GetEmployeeManagerAliasList(conversationCompletionRequest.Select(s => s.EmployeeAlias).ToList());

                if (employeeManagerList == null || !conversationCompletionRequest.All(req => employeeManagerList.Any(emp => emp.EmployeeAlias == req.EmployeeAlias && emp.FYManagerAlias == req.FYManagerAlias)))
                {
                    hasAccess = false;

                    return null;
                }

                var employeeFYManagerAliasList = employeeManagerList.Select(emp => emp.FYManagerAlias).AsEnumerable();
                string selectedManagerList = String.Join(",", employeeFYManagerAliasList);
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
                
                bool updateResult = await receiveRepository.CompleteConversation(conversationCompletionRequest, loggedInUserAlias).ConfigureAwait(false);

                return updateResult;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("1d9e10df-f417-404e-8db0-a5c3fbf1f12e", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("1d9e10df-f417-404e-8db0-a5c3fbf1f12e", "POST", eventProperties, metrics);
            }
        }

    }
}
