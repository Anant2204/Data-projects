// <copyright file="TaxonomyScriptContentService.cs" company="Microsoft">
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
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Data.SqlClient;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Constants = MCT.DataAccess.ApplicationConstants;

    /// <summary>
    /// TaxonomyScriptContentService
    /// </summary>
    public class TaxonomyScriptContentService : ITaxonomyScriptContentService
    {
        /// <summary>
        /// The taxonomy correction repository
        /// </summary>
        private readonly ITaxonomyScriptContentRepository _taxonomyScriptContentRepository;

        /// <summary>The unit of work</summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Auth service.
        /// </summary>
        private readonly IAuthService authService;


        /// <summary>Initializes a new instance of the <see cref="TaxonomyScriptContentService" /> class.</summary>
        /// <param name="taxonomyScriptContentRepository">The taxonomyScriptContentRepository.</param>
        /// <param name="unitOfWork"></param>
        /// <param name="authService"></param>
        public TaxonomyScriptContentService(ITaxonomyScriptContentRepository taxonomyScriptContentRepository, IUnitOfWork unitOfWork, IAuthService authService)
        {
            this._taxonomyScriptContentRepository = taxonomyScriptContentRepository;
            _unitOfWork = unitOfWork;
            this.authService = authService;
        }

        /// <summary>
        /// Get Taxonomy Script Content details 
        /// </summary>
        /// <param name="loggedInUserAlias">LoggedIn User Alias</param>
        /// <param name="roleList">RoleList.</param>
        /// <returns>TaxonomyScriptContentResponse</returns>
        public async Task<TaxonomyScriptContentResponse?> Get(string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "283b4490-9965-4a94-86c7-2c5d373abaaf", $"Starting - {this.GetType()}.Get");

                TaxonomyScriptContentResponse? taxonomyScriptContent = new TaxonomyScriptContentResponse();

                var repositoryObj = _unitOfWork?.GetRepository<ITaxonomyScriptContentRepository>();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("TaxonomyScriptContentRepository is not available.");
                }

                if (roleList == null)
                {
                    return null;
                }

                if (roleList.Contains(ApplicationConstants.AdminRole) || roleList.Contains(ApplicationConstants.ScriptContributor) || roleList.Contains(ApplicationConstants.SuperUsers))
                {
                    taxonomyScriptContent = await repositoryObj.Get().ConfigureAwait(false);
                }
                else
                {
                    return null;
                }

                return taxonomyScriptContent;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("283b4490-9965-4a94-86c7-2c5d373abaaf", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("283b4490-9965-4a94-86c7-2c5d373abaaf", "Get", eventProperties, metrics);
            }
        }

        /// <summary>Gets the FYManagers for script exclusion</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <param name="roles">Roles.</param>
        /// <param name="searchString">The search string.</param>
        /// <returns>
        ///  List of DirectManagers
        /// </returns>
        public async Task<List<FutureManager>?> GetFYManagersForScriptExclusionAsync(string loggedInUserAlias, List<string> roles, string searchString)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                if (!roles.Contains(Constants.AdminRole) && !roles.Contains(Constants.ScriptContributorRole))
                {
                    return null;
                }
                Instrument.Logger.LogMessage(EventLevel.Informational, "701b9325-fb72-4750-bead-7e3dc54261cb", $"Starting - {this.GetType()}.GetFYManagersForScriptExclusion");
                var exclusionManagers = await this._taxonomyScriptContentRepository.GetFYManagersForScriptExclusionAsync(searchString).ConfigureAwait(false);

                return exclusionManagers;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("701b9325-fb72-4750-bead-7e3dc54261cb", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("701b9325-fb72-4750-bead-7e3dc54261cb", "GetFYManagersForScriptExclusion", eventProperties, metrics);
            }
        }

        /// <summary>
        /// GetStatistics Details 
        /// </summary>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roles"></param>
        /// <returns>Get Statistics for readyForReview and approved status</returns>
        public async Task<TaxonomyScriptContentStatisticResponse> GetStatisticsAsync(string loggedInUserAlias, List<string> roles)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                if (!roles.Contains(Constants.AdminRole) && !roles.Contains(Constants.ScriptContributorRole))
                {
                    return null;
                }
                Instrument.Logger.LogMessage(EventLevel.Informational, "0d1fd3ee-c9a6-48d2-b9fd-13e2cc466e03", $"Starting - {this.GetType()}.GetStatisticsAsync");
                var statistics = await this._taxonomyScriptContentRepository.GetStatisticsAsync().ConfigureAwait(false);

                return statistics;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("0d1fd3ee-c9a6-48d2-b9fd-13e2cc466e03", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("0d1fd3ee-c9a6-48d2-b9fd-13e2cc466e03", "GetStatisticsAsync", eventProperties, metrics);
            }

        }


        /// <summary>
        /// Get Audit Details of TaxonomyScriptContent
        /// </summary>
        /// <param name="scriptId"></param>
        /// <param name="roleList"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <returns>ModifiedBy and ModifiedDate Details</returns>
        public async Task<List<TaxonomyScriptContentAuditHistoryResponse>?> GetAuditDetailsAsync(int scriptId, List<string> roleList, string loggedInUserAlias)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                if (!roleList.Contains(Constants.AdminRole) && !roleList.Contains(Constants.ScriptContributorRole))
                {
                    return null;
                }
                Instrument.Logger.LogMessage(EventLevel.Informational, "4cbf7795-2a7c-4fb8-8132-c35643650e07", $"Starting - {this.GetType()}.GetAuditDetailsAsync");
                var auditDetails = await this._taxonomyScriptContentRepository.GetAuditDetailsAsync(scriptId).ConfigureAwait(false);

                return auditDetails;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("4cbf7795-2a7c-4fb8-8132-c35643650e07", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("4cbf7795-2a7c-4fb8-8132-c35643650e07", "GetAuditDetailsAsync", eventProperties, metrics);
            }
        }

        /// <summary>
        /// Update Status of TaxonomyScriptContent
        /// </summary>
        /// <param name="scriptId"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <param name="roleList"></param>
        /// <returns>True if the update is successful, otherwise false</returns>
        public async Task<bool?> UpdateTaxonomyScriptContentStatusAsync(int scriptId, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                if (!roleList.Contains(Constants.AdminRole))
                {
                    return null;
                }
                Instrument.Logger.LogMessage(EventLevel.Informational, "345bc960-746c-4c65-b459-12764f7252bb", $"Starting - {this.GetType()}.UpdateTaxonomyScriptContentStatusAsync");
                var result = await this._taxonomyScriptContentRepository.UpdateTaxonomyScriptContentStatusAsync(scriptId, loggedInUserAlias).ConfigureAwait(false);

                return result;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("345bc960-746c-4c65-b459-12764f7252bb", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("345bc960-746c-4c65-b459-12764f7252bb", "UpdateTaxonomyScriptContentStatusAsync", eventProperties, metrics);
            }
        }

        /// <summary>Create Or Edit Script.</summary>
        /// <param name="taxonomyScriptContentUpsertRequest">TaxonomyScriptContentUpsertRequest.</param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <param name="roleList"> roleList.</param>
        /// <returns>
        ///   true or false base on api success
        /// </returns>
        public async Task<bool?> CreateOrUpdateTaxonomyScriptContentAsync(TaxonomyScriptContentUpsertRequest taxonomyScriptContentUpsertRequest, string? loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "283b4490-9965-4a94-86c7-2c5d373abaaf", $"Starting - {this.GetType()}.CreateOrUpdateTaxonomyScriptContent");

                var repositoryObj = _unitOfWork?.GetRepository<ITaxonomyScriptContentRepository>();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("TaxonomyScriptContentRepository is not available.");
                }

                if (roleList == null)
                {
                    return null;
                }

                if (roleList.Contains(ApplicationConstants.AdminRole) || roleList.Contains(ApplicationConstants.ScriptContributor))
                {
                    return await repositoryObj.CreateOrUpdateTaxonomyScriptContentAsync(taxonomyScriptContentUpsertRequest, loggedInUserAlias).ConfigureAwait(false);
                }
                else
                {
                    return null;
                }

            }

            catch (SqlException ex)
            {
                if (ex != null && ex.Number == ApplicationConstants.UniqueConstraintErrorCode)
                {
                    throw new BadHttpRequestException(MessageConstants.TaxonomyChangeContextAlreadyExistsMessage, 422);
                }
                throw;
            }
            catch (Exception exception)
            {
                eventProperties.Add("Exception", exception.Message);
                Instrument.Logger.LogException("283b4490-9965-4a94-86c7-2c5d373abaaf", exception.Message, exception);
                throw exception;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("283b4490-9965-4a94-86c7-2c5d373abaaf", "CreateOrUpdateTaxonomyScriptContent", eventProperties, metrics);
            }
        }


        /// <summary>Create Or Edit List of Script.</summary>
        /// <param name="taxonomyScriptContentUpsertRequest">TaxonomyScriptContentUpsertRequest.</param>
        /// <param name="roleList"></param>
        /// <param name="loggedInUserAlias"> Logged in user alias.</param>
        /// <returns>
        ///   true or false base on api success
        /// </returns>
        public async Task<bool?> ImportTaxonomyScriptContentAsync(List<TaxonomyScriptContentUpsertRequest> taxonomyScriptContentUpsertRequest, List<string> roleList, string? loggedInUserAlias)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "85826e90-c3bf-413f-81ce-ca5e7dc1a1bb", $"Starting - {this.GetType()}.ImportTaxonomyScriptContentAsync");

                var repositoryObj = _unitOfWork?.GetRepository<ITaxonomyScriptContentRepository>();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("TaxonomyScriptContentRepository is not available.");
                }

                if (roleList == null)
                {
                    return null;
                }

                if (roleList.Contains(ApplicationConstants.SuperUsers))
                {
                    return await repositoryObj.ImportTaxonomyScriptContentAsync(taxonomyScriptContentUpsertRequest, loggedInUserAlias).ConfigureAwait(false);

                }
                else
                {
                    return null;
                }
            }

            catch (SqlException ex)
            {
                if (ex != null && ex.Number == ApplicationConstants.UniqueConstraintErrorCode)
                {
                    throw new BadHttpRequestException(MessageConstants.TaxonomyChangeContextAlreadyExistsMessage, 422);
                }
                throw;
            }
            catch (Exception exception)
            {
                eventProperties.Add("Exception", exception.Message);
                Instrument.Logger.LogException("85826e90-c3bf-413f-81ce-ca5e7dc1a1bb", exception.Message, exception);
                throw exception;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("85826e90-c3bf-413f-81ce-ca5e7dc1a1bb", "ImportTaxonomyScriptContentAsync", eventProperties, metrics);
            }
        }
    }
}
