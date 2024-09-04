// <copyright file="ConversationScriptTaxonomyService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Services
{
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using MCT.Business.Interfaces;
    using MCT.DataAccess.EfModels;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using MCT.DataAccess.UnitOfWork;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    /// <summary>
    ///   ConversationScriptTaxonomyService
    /// </summary>
    public class ConversationScriptTaxonomyService : IConversationScriptTaxonomyService
    {
        /// <summary>The unit of work</summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Auth service.
        /// </summary>
        private readonly IAuthService authService;

        /// <summary>ConversationScriptTaxonomyService constructor</summary>
        /// <param name="unitOfWork">The unit of work.</param>
        /// <param name="authService">authService.</param>
        public ConversationScriptTaxonomyService(IUnitOfWork unitOfWork, IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            this.authService = authService;
        }

        /// <inheritdoc/>
        public async Task<EmpConversationScriptResponse?> GetEmpConversationScript(string empAlias, string loggedInUserAlias, List<string> roleList,string requestFrom)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "15ff5fcb-38e1-9999-0000-fdd6496bbb46", $"Starting - {this.GetType()}.GetReceiveConversationsStatistics");

                EmpConversationScriptResponse? conversationScriptTaxonomy = new EmpConversationScriptResponse();

                var repositoryObj = _unitOfWork?.GetRepository<IConversationScriptTaxonomyRepository>();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("ConversationScriptTaxonomy is not available.");
                }

                var empHrData = await repositoryObj.GetEmpHrData(empAlias);

                if(empHrData != null)
                {

                    string? managerList =null;

                    if (requestFrom == "Send")
                    {
                        managerList = empHrData.CyManagerAlias;
                    }                      
                    else if (requestFrom == "Receive")
                    {
                        managerList = empHrData.FyManagerAlias;
                    }                      
                   
                    string rolesList = String.Join(",", roleList);

                    var checkAccess = await this.authService.checkUserAccessForSelectedManager(loggedInUserAlias, managerList, rolesList);

                    if (checkAccess == null || checkAccess == false)
                    {
                        return null;
                    }


                    conversationScriptTaxonomy = await repositoryObj.GetEmpConversationScript(empHrData, requestFrom).ConfigureAwait(false);

                }


                return conversationScriptTaxonomy;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("15ff5fcb-38e1-9999-0000-fdd6496bbb46", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("15ff5fcb-38e1-9999-0000-fdd6496bbb46", "Get", eventProperties, metrics);
            }
        }

        /// <inheritdoc/>
        public async Task<bool> UpdateConversationScript(ConversationScriptUpdateScenarioRequest conversationScriptUpdateScenarioRequest, string loggedInUserAlias)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
            {
                { "User", loggedInUserAlias },
            };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "418195ba-a3cc-4c21-84fb-6ad31fc855d4", $"Starting - {this.GetType()}.UpdateConversationScript");

                var repositoryObj = _unitOfWork?.GetRepository<IConversationScriptTaxonomyRepository>();

                if (repositoryObj == null)
                {
                    throw new InvalidOperationException("ConversationScriptTaxonomy is not available.");
                }

                bool response = await repositoryObj.UpdateConversationScript(conversationScriptUpdateScenarioRequest, loggedInUserAlias).ConfigureAwait(false);

                return response;
            }

            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("418195ba-a3cc-4c21-84fb-6ad31fc855d4", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                    {
                        { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                    };

                Instrument.Logger.LogEvent("418195ba-a3cc-4c21-84fb-6ad31fc855d4", "Get", eventProperties, metrics);
            }
        }        

    }
}
