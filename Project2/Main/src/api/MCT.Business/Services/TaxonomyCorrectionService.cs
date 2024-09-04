// <copyright file="TaxonomyCorrectionService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Services
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Threading.Tasks;
    using MCT.Business.Interfaces;
    using MCT.DataAccess;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Newtonsoft.Json.Linq;


    /// <summary>
    /// TaxonomyCorrectionService
    /// </summary>
    public class TaxonomyCorrectionService : ITaxonomyCorrectionService
    {
        /// <summary>
        /// The taxonomy correction repository
        /// </summary>
        private readonly ITaxonomyCorrectionRepository taxonomyCorrectionRepository;

        /// <summary>
        /// The common repository
        /// </summary>
        private readonly ICommonRepository commonRepository;

        /// <summary>The unit of work</summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Auth service.
        /// </summary>
        private readonly IAuthService authService;


        /// <summary>Initializes a new instance of the <see cref="TaxonomyCorrectionService" /> class.</summary>
        /// <param name="taxonomyCorrectionRepository">The access repository.</param>
        /// <param name="commonRepository">Common Repository</param>
        /// <param name="unitOfWork"></param>
        /// <param name="authService"></param>
        public TaxonomyCorrectionService(ITaxonomyCorrectionRepository taxonomyCorrectionRepository, ICommonRepository commonRepository, IUnitOfWork unitOfWork, IAuthService authService)
        {
            this.taxonomyCorrectionRepository = taxonomyCorrectionRepository;
            this.commonRepository = commonRepository;
            _unitOfWork = unitOfWork;
            this.authService = authService;
        }

        /// <summary>
        /// Get Taxonomy details 
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="taxonomyRoleSummaryChangeRequest"></param>
        /// <returns></returns>
        public async Task<TaxonomyDetailsInHierarchyResponse?> GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(string loggedInUserAlias, TaxonomyRoleSummaryChangeRequest taxonomyRoleSummaryChangeRequest)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
                {
                    { "User", loggedInUserAlias },
                };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "666553AA-87A6-4729-B6A5-3CF8B227AECF", $"Starting - {this.GetType()}.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync");
                var response = await this.taxonomyCorrectionRepository.GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync(taxonomyRoleSummaryChangeRequest).ConfigureAwait(false);
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
                Instrument.Logger.LogEvent("6666553AA-87A6-4729-B6A5-3CF8B227AECF", "GetTaxonomyDetailsBasedOnOrgAndCareerStageAsync", eventProperties, metrics);
            }
        }

        /// <summary>
        /// Submits taxonomy correction request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="loggedInUserFullName"></param>
        /// <param name="roleList"></param>
        /// <returns></returns>
        /// <exception cref="System.InvalidOperationException">
        /// CommonRepository is not available.
        /// </exception>
        public async Task<TaxonomyCorrectionResponse?> SubmitTaxonomyCorrectionRequestAsync(TaxonomyChangeRequest request, string loggedInUserAlias, string loggedInUserFullName, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };
            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "6d4537b2-748b-4aa4-97a7-34b430fbc664", $"Starting - {this.GetType()}.SubmitTaxonomyCorrection");

                string managerAlias = string.Empty;

                var commonRepository = _unitOfWork?.GetRepository<ICommonRepository>() ?? null;

                if (commonRepository == null)
                {
                    throw new InvalidOperationException("CommonRepository is not available.");
                }

                var employeeMangerAliasList = await commonRepository.GetEmployeeManagerAliasList(new List<string> { request.IcAlias }).ConfigureAwait(false);
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

                List<string> authorizedRoles = new List<string> { ApplicationConstants.ManagerRole, ApplicationConstants.DelegateRole };
                roleList.RemoveAll(x => !authorizedRoles.Contains(x));

                string rolesList = String.Join(",", roleList);
                var checkAccess = await this.authService.checkUserAccessForSelectedManager(loggedInUserAlias, managerAlias, rolesList);
                if (checkAccess == null || checkAccess == false)
                {
                    return null;
                }

                var icDetails = await this.commonRepository.GetEmployeeDetailsForTaxonomyCorrectionAsync(request.IcAlias).ConfigureAwait(false);

                if (icDetails == null)
                {
                    throw new BadHttpRequestException(MessageConstants.TaxonomyCorrectionFailureMessage, 422);
                }

                var updateResult = await this.taxonomyCorrectionRepository.SubmitTaxonomyCorrectionRequestAsync(request, icDetails, loggedInUserAlias, loggedInUserFullName).ConfigureAwait(false);

                if (updateResult)
                {
                    return new TaxonomyCorrectionResponse
                    {
                        Response = MessageConstants.CorrectionRequestSuccessMessage,
                        ResponseStatus = true
                    };
                }

                throw new BadHttpRequestException(MessageConstants.TaxonomyCorrectionFailureMessage, 422);
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("6d4537b2-748b-4aa4-97a7-34b430fbc664", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("6d4537b2-748b-4aa4-97a7-34b430fbc664", "SubmitTaxonomyCorrection", eventProperties, metrics);
            }
        }

        /// <summary>
        /// get list of taxonomy change requests
        /// </summary>
        /// <param name="loggedInUserAlias">Logged in UserName</param>
        /// <param name="roleList">User Roles</param>
        /// <returns>List of TaxonomyCorrection Requests</returns>
        public async Task<List<GetTaxonomyCorrectionRequestsResult>> GetTaxonomyChangeRequestAsync(string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
                {
                    { "User", loggedInUserAlias },
                };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "1dc483e0-8513-4b54-ac91-63ac0515c823", $"Starting - {this.GetType()}.GetTaxonomyChangeRequestAsync");
                string roleString = string.Join(",", roleList);
                var taxonomyChangeRequests = await this.taxonomyCorrectionRepository.GetTaxonomyChangeRequestAsync(loggedInUserAlias, roleString).ConfigureAwait(false);
                stopWatch.Stop();
                return taxonomyChangeRequests;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("1dc483e0-8513-4b54-ac91-63ac0515c823", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("1dc483e0-8513-4b54-ac91-63ac0515c823", "GetTaxonomyChangeRequestAsync", eventProperties, metrics);
            }
        }
    }
}
