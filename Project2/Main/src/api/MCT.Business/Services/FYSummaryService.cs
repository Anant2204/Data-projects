// <copyright file="FYSummaryService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Services
{
    using System.Diagnostics;
    using System.Diagnostics.Tracing;

    using MCT.Business.Interfaces;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;

    using Microsoft.Services.Tools.Infrastructure.Logging;

    /// <summary>
    ///   FY Summary service
    /// </summary>
    public class FYSummaryService : IFYSummaryService
    {
        /// <summary>The unit of work</summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Auth service.
        /// </summary>
        private readonly IAuthService authService;

        /// <summary>Business logic for ConversationSummary .</summary>
        /// <param name="unitOfWork">The unit of work.</param>
        /// <param name="authService">Auth service.</param>
        public FYSummaryService(IUnitOfWork unitOfWork, IAuthService authService)
        {
            _unitOfWork = unitOfWork;

            this.authService = authService;
        }

        /// <inheritdoc/>
        public async Task<FYSummaryResponse?> GetCurrentYearEmployeesAsync(FYSummaryRequest fySummaryRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                 { "User", loggedInUserAlias },
            };
            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "79c1f30f-c4ac-4f18-8fa0-a70687a12fb3", $"Starting - {this.GetType()}.GetCurrentYearEmployees");
                List<string> managerAliasList = fySummaryRequest.ManagerAliases;

                var repositoryObj = _unitOfWork?.GetRepository<IFYSummaryRepository>();

                var aliasList = await this.authService.GetManagerListForAuthorizedUser(managerAliasList, loggedInUserAlias, roleList, fySummaryRequest.CompleteReportingHierarchy);

                FYSummaryResponse fySummaryResponse = new FYSummaryResponse();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("FY Summary repository is not available.");
                }

                if (aliasList == null || aliasList.Count() == 0)
                {
                    return null;
                }

                List<FYSummaryDto> fySummaryDtos = new List<FYSummaryDto>();

                fySummaryDtos = await repositoryObj.GetCurrentYearEmployeesAsync(aliasList).ConfigureAwait(false);

                fySummaryDtos = fySummaryDtos.OrderBy(x => x.FullName).ToList();
                fySummaryResponse.Team = fySummaryDtos;

                return fySummaryResponse;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("79c1f30f-c4ac-4f18-8fa0-a70687a12fb3", ex.Message, ex);
                throw;
            }
            finally
            {

                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("79c1f30f-c4ac-4f18-8fa0-a70687a12fb3", "GetCurrentYearEmployees", eventProperties, metrics);
            }

        }

        /// <inheritdoc/>
        public async Task<FYSummaryResponse?> GetFutureYearEmployeesAsync(FYSummaryRequest fySummaryRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                 { "User", loggedInUserAlias },
            };
            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "02d5d7d7-9f71-4232-aa1f-c41e9ba7e081", $"Starting - {this.GetType()}.GetFutureYearEmployees");
                List<string> managerAliasList = fySummaryRequest.ManagerAliases;

                var repositoryObj = _unitOfWork?.GetRepository<IFYSummaryRepository>();

                var aliasList = await this.authService.GetManagerListForAuthorizedUser(managerAliasList, loggedInUserAlias, roleList, fySummaryRequest.CompleteReportingHierarchy);

                FYSummaryResponse fySummaryResponse = new FYSummaryResponse();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("FY Summary repository is not available.");
                }

                if (aliasList == null || aliasList.Count() == 0)
                {
                    return null;
                }

                List<FYSummaryDto> fySummaryDtos = new List<FYSummaryDto>();

                fySummaryDtos = await repositoryObj.GetFutureYearEmployeesAsync(aliasList).ConfigureAwait(false);

                fySummaryDtos = fySummaryDtos.OrderBy(x => x.FullName).ToList();
                fySummaryResponse.Team = fySummaryDtos;

                return fySummaryResponse;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("02d5d7d7-9f71-4232-aa1f-c41e9ba7e081", ex.Message, ex);
                throw;
            }
            finally
            {

                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("02d5d7d7-9f71-4232-aa1f-c41e9ba7e081", "GetFutureYearEmployees", eventProperties, metrics);
            }
        }


        /// <inheritdoc/>
        public async Task<FYSummaryStatisticsResponse?> GetStatisticsAsync(FYSummaryRequest fySummaryRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "36d77aca-545c-4c86-994d-6b136ea509fc", $"Starting - {this.GetType()}.GetStatistics");
                List<string> managerAliasList = fySummaryRequest.ManagerAliases;

                var aliasList = await this.authService.GetManagerListForAuthorizedUser(managerAliasList, loggedInUserAlias, roleList, fySummaryRequest.CompleteReportingHierarchy);

                var repositoryObj = _unitOfWork?.GetRepository<IFYSummaryRepository>();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("FY Summary repository is not available.");
                }

                if (aliasList == null || aliasList.Count() == 0)
                {
                    return null;
                }

                FYSummaryStatisticsResponse summaryStatistics = new FYSummaryStatisticsResponse();

                summaryStatistics = await repositoryObj.GetStatisticsAsync(aliasList).ConfigureAwait(false);

                return summaryStatistics;
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

                Instrument.Logger.LogEvent("36d77aca-545c-4c86-994d-6b136ea509fc", "GetFYSummaryStatistics", eventProperties, metrics);
            }
        }
    }
}
