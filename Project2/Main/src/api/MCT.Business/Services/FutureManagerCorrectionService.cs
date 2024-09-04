// <copyright file="FutureManagerCorrectionService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Services
{
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using Azure.Core;

    using MCT.Business.Interfaces;
    using MCT.Business.SharedServices;
    using MCT.DataAccess;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;

    using Microsoft.AspNetCore.Http;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.Services.Tools.Infrastructure.Logging;
    using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

    /// <summary>
    ///  FutureManagerCorrection Service
    /// </summary>
    /// <seealso cref="MCT.Business.Interfaces.IFutureManagerCorrectionService" />
    public class FutureManagerCorrectionService : IFutureManagerCorrectionService
    {
        /// <summary>
        /// The future manager correction repository
        /// </summary>
        private readonly IFutureManagerCorrectionRepository futureManagerCorrectionRepository;

        /// <summary>The unit of work</summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Auth service.
        /// </summary>
        private readonly IAuthService authService;


        /// <summary>Initializes a new instance of the <see cref="FutureManagerCorrectionService" /> class.</summary>
        /// <param name="futureManagerCorrectionRepository">The access repository.</param>
        /// <param name="unitOfWork"></param>
        /// <param name="authService"></param>
        public FutureManagerCorrectionService(IFutureManagerCorrectionRepository futureManagerCorrectionRepository, IUnitOfWork unitOfWork, IAuthService authService)
        {
            this.futureManagerCorrectionRepository = futureManagerCorrectionRepository;
            _unitOfWork = unitOfWork;
            this.authService = authService;
        }

        /// <summary>Gets the logged in user privilege.</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="searchString">The search string.</param>
        /// <returns>
        ///   UserPermissions
        /// </returns>
        public async Task<List<FutureManager>> GetFutureManager(string loggedInUserAlias, string searchString)
        {

            return await this.futureManagerCorrectionRepository.GetFutureManager(loggedInUserAlias, searchString).ConfigureAwait(false);
        }



        /// <summary>
        /// Updates the future manager.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="roleList"></param>
        /// <returns></returns>
        /// <exception cref="System.InvalidOperationException">
        /// SendStayRepository is not available.
        /// or
        /// ReceiveConversationRepository is not available.
        /// </exception>
        public async Task<FutureManagerChangeResponse?> UpdateFutureManager(FutureManagerChangeRequest request, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };
            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "409EA077-ABC5-4611-BBBB-2E93E90F7642", $"Starting - {this.GetType()}.UpdateFutureManager");

                string managerAlias = string.Empty;

                var commonRepository = _unitOfWork?.GetRepository<ICommonRepository>() ?? null;

                if (commonRepository == null)
                {
                    throw new InvalidOperationException("CommonRepository is not available.");
                }
                var empAliasList = new List<string>() { request.empAlias };
                var employeeMangerAliasList = await commonRepository.GetEmployeeManagerAliasList(empAliasList).ConfigureAwait(false);
                var employeeManager = employeeMangerAliasList != null ? employeeMangerAliasList.FirstOrDefault() : null;

                if (employeeManager == null)
                {
                    return null;
                }

                if (request.RequestFrom.ToLower() == ApplicationConstants.SendStay)
                {
                    if (!string.IsNullOrWhiteSpace(employeeManager.CYManagerAlias))
                    {
                        managerAlias = employeeManager.CYManagerAlias;
                    }
                }
                else
                {
                    if (!string.IsNullOrWhiteSpace(employeeManager.FYManagerAlias))
                    {
                        managerAlias = employeeManager.FYManagerAlias;
                    }
                }

                if (managerAlias == string.Empty)
                {
                    return null;
                }

                var isSelectedManagerIsValid = await this.futureManagerCorrectionRepository.IsSelectedManagerIsValid(request.UpdatedManager);

                if (!isSelectedManagerIsValid)
                {
                    throw new BadHttpRequestException(MessageConstants.InvalidManagerErrorMessage, 422);
                }

                var isException = await this.futureManagerCorrectionRepository.IsTaggedAsExceptionAsync(request.UpdatedManager);

                if (isException)
                {
                    throw new BadHttpRequestException(MessageConstants.FYManagerUpdateExceptionFailureMessage, 422);
                }

                List<string> authorizedRoles = new List<string> { ApplicationConstants.ManagerRole, ApplicationConstants.DelegateRole };
                roleList.RemoveAll(x => !authorizedRoles.Contains(x));

                string rolesList = String.Join(",", roleList);

                var checkAccess = await this.authService.checkUserAccessForSelectedManager(loggedInUserAlias, managerAlias, rolesList);
                if (checkAccess == null || checkAccess == false)
                {
                    return null;
                }

                var futureManagerCorrectionStatus = await this.futureManagerCorrectionRepository.GetFutureManagerCorrectionStatus(request.empAlias).ConfigureAwait(false);

                if (futureManagerCorrectionStatus != null)
                {
                    throw new BadHttpRequestException(MessageConstants.FYManagerUpdateActiveRequestErrorMessage, 422);
                }

                var isEmployeeRecordApproved = await this.futureManagerCorrectionRepository.IsEmployeeRecordApproved(request.empAlias).ConfigureAwait(false);

                if (!isEmployeeRecordApproved)
                {
                    throw new BadHttpRequestException(MessageConstants.EmployeeReviewStatusErrorMessage, 422);
                }

                var isCircleReference = await this.futureManagerCorrectionRepository.CheckCircularReferenceAsync(request.empAlias, request.UpdatedManager);

                if (isCircleReference == true)
                {
                    throw new BadHttpRequestException(MessageConstants.FYManagerCircularReferenceErrorMessage, 422);
                }

                var updateResult = await this.futureManagerCorrectionRepository.UpdateFutureManager(request, employeeManager, loggedInUserAlias).ConfigureAwait(false);

                if (updateResult)
                {
                    return new FutureManagerChangeResponse
                    {
                        Response = MessageConstants.CorrectionRequestSuccessMessage,
                        ResponseStatus = true
                    };
                }

                throw new BadHttpRequestException(MessageConstants.FYManagerNotUpdateMessage, 422);
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("409EA077-ABC5-4611-BBBB-2E93E90F7642", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("409EA077-ABC5-4611-BBBB-2E93E90F7642", "UpdateFutureManager", eventProperties, metrics);
            }
        }

        /// <summary>
        /// Get future manager correction status.
        /// </summary>
        /// <param name="loggedInUserAlias">logged in user alias.</param>
        /// <param name="roleList">logged in user roles.</param>
        /// <returns>List of GetFutureManagerCorrectionResult.</returns>
        public async Task<List<GetFutureManagerRequestsResult>> GetFutureManagerCorrectionRequest(string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
                {
                    { "User", loggedInUserAlias },
                };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "666553AA-87A6-4729-B6A5-3CF8B227AECF", $"Starting - {this.GetType()}.GetFutureManagerCorrectionRequest");
                string roleString = string.Join(",", roleList.Select(i => i));
                var response = await this.futureManagerCorrectionRepository.GetFutureManagerCorrectionRequest(loggedInUserAlias, roleString).ConfigureAwait(false);
                stopWatch.Stop();
                return response;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("666553AA-87A6-4729-B6A5-3CF8B227AECF", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("6666553AA-87A6-4729-B6A5-3CF8B227AECF", "GetManagerList", eventProperties, metrics);
            }
        }


        /// <summary>
        /// Update future manager correction status.
        /// </summary>
        ///  <param name="loggedInUserAlias">logged in user alias.</param>
        /// <param name="updateStatusOfManagerCorrectionRequest">updateStatusOfManagerCorrectionRequest.</param>
        /// <param name="roleList">logged in user roles.</param>
        /// <returns>List of bool.</returns>
        public async Task<bool?> UpdateFYManagerCorrectionStatusAsync(UpdateFYManagerCorrectionStatusRequest updateStatusOfManagerCorrectionRequest, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            bool hasAccess = true;
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "611272b2-0f31-409b-b03c-660090bab39a", $"Starting - {this.GetType()}.UpdateStatusOfManagerCorrection");

                var commonRepository = _unitOfWork?.GetRepository<ICommonRepository>() ?? null;

                if(commonRepository == null ) {
                    return false;
                }

                hasAccess = await commonRepository.FYManagerCorrectionApprovalAccessAsync(updateStatusOfManagerCorrectionRequest.IcAlias,loggedInUserAlias, roleList);
                 
                if(!hasAccess)
                {
                    return null;
                }          

                bool? updateResult = await futureManagerCorrectionRepository.UpdateFYManagerCorrectionStatusAsync(updateStatusOfManagerCorrectionRequest, loggedInUserAlias,roleList).ConfigureAwait(false);

                return updateResult;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("611272b2-0f31-409b-b03c-660090bab39a", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("611272b2-0f31-409b-b03c-660090bab39a", "POST", eventProperties, metrics);
            }
        }

    }
}
