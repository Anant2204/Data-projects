// <copyright file="CommonService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Services
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Azure;
    using Azure.AI.OpenAI;
    using MCT.Business.Interfaces;
    using MCT.DataAccess.Interfaces;
    using MCT.DataAccess.Models;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Constants = MCT.DataAccess.ApplicationConstants;

    /// <summary>
    /// Common service.
    /// </summary>
    public class CommonService : ICommonService
    {
        private readonly ICommonRepository accessRepository;
        private readonly IConfiguration _configuration;

        /// <summary>Initializes a new instance of the <see cref="CommonService" /> class.</summary>
        /// <param name="accessRepository">The access repository.</param>
        /// <param name="configuration">configuration details</param>
        public CommonService(ICommonRepository accessRepository, IConfiguration configuration)
        {
            this.accessRepository = accessRepository;
            this._configuration = configuration;
        }

        /// <summary>Gets the logged in user privilege.</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <returns>
        ///   UserPermissions
        /// </returns>
        public async Task<UserPermissions> GetLoggedInUserPrivilege(string loggedInUserAlias)
        {
            List<UserAccessDetails> userAccessDetailsList = await this.accessRepository.GetUserPermissionsAsync(loggedInUserAlias).ConfigureAwait(false);
            var featureLevelPermissions = userAccessDetailsList.GroupBy(x => x.FeatureName)
                                                              .Select(g => new FeatureLevelPermissions
                                                              {
                                                                  FeatureName = g.Key,
                                                                  Permission = g.SelectMany(x => x.Permissions.Split(',')).Distinct().ToList()

                                                              }).ToList();
         
            UserPermissions userPermissions = new UserPermissions();
            userPermissions.Roles = userAccessDetailsList.Select(x => x.RoleName).Distinct().ToList();
            userPermissions.Permissions = featureLevelPermissions;

            userPermissions.DefaultFeatures = userAccessDetailsList.Select(x => new RoleDefaultFeatures
            {
                Role = x.RoleName,
                defaultFeature = x.DefaultFeature,
            }).DistinctBy(s=>s.Role).ToList();

            return userPermissions;
        }

        /// <summary>Gets the logged in user privilege with tool start and end window</summary>
        /// <param name="loggedInUserAlias">The logged in user alias.</param>
        /// <returns>
        ///   UserPermissionsAndToolWindow
        /// </returns>
        public async Task<UserPermissionsAndToolWindow> GetLoggedInUserPrivilegeWithRunTimeWindowAsync(string loggedInUserAlias)
        {
            Instrument.Logger.LogMessage(EventLevel.Informational, "032e1a49-3918-4092-87f8-fd105eca2777", $"Fetching logged in user permissions - {this.GetType()}.AuthMiddleware");
            var userPermissionsWithRoles = await this.GetLoggedInUserPrivilege(loggedInUserAlias).ConfigureAwait(false);
            Instrument.Logger.LogMessage(EventLevel.Informational, "d0067aa6-43b0-4af7-8820-838b052eecd4", $"Fetching tool runtime window - {this.GetType()}.AuthMiddleware");
            var toolRunTimeWindows = await this.accessRepository.GetToolRuntimeWindowAsync();
            UserPermissionsAndToolWindow userPermissionsAndToolWindow = new UserPermissionsAndToolWindow();
            userPermissionsAndToolWindow.Roles = userPermissionsWithRoles.Roles;
            userPermissionsAndToolWindow.Permissions = userPermissionsWithRoles.Permissions;
            userPermissionsAndToolWindow.StartDate = toolRunTimeWindows?.StartDate;
            userPermissionsAndToolWindow.EndDate = toolRunTimeWindows?.EndDate;

            Instrument.Logger.LogMessage(EventLevel.Informational, "4858e29f-a9a5-446a-a194-47d4aeee16eb", $"Completed fetching logged in user permissions - {this.GetType()}.AuthMiddleware");

            return userPermissionsAndToolWindow;
        }

        /// <summary>
        /// Asynchronously retrieves the taxonomy details in a hierarchical format based on the provided organization, request type, and role list of logged in user.
        /// </summary>
        /// <param name="org">The organization for which to retrieve the taxonomy details.</param>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">The list of roles for logged in user.</param>
        /// <returns>A Task that represents the asynchronous operation. The task result contains the taxonomy details in a hierarchical format.</returns>
        public async Task<TaxonomyDetailsWithIncentivePlanHierarchy?> GetTaxonomyDetailsInHierarchyAsync(string org, string requestType, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
                {
                    { "User", loggedInUserAlias },
                };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "f137b774-3776-4574-a16f-36e575f5fb28", $"Starting - {this.GetType()}.GetTaxonomyDetailsInHierarchyAsync");

                if (!roleList.Contains(Constants.AdminRole) && !roleList.Contains(Constants.ScriptContributorRole))
                {
                    return null;
                }

                var response = await this.accessRepository.GetTaxonomyDetailsInHierarchy(org, requestType).ConfigureAwait(false);
                stopWatch.Stop();
                return response;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("f137b774-3776-4574-a16f-36e575f5fb28", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("f137b774-3776-4574-a16f-36e575f5fb28", "GetTaxonomyDetailsInHierarchyAsync", eventProperties, metrics);
            }
        }

        /// <summary>
        /// Gets Organization Details
        /// </summary>
        /// <param name="requestType">CY or FY for which to retrieve the taxonomy details.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">The list of roles for logged in user.</param>
        /// <returns>Returns list of organization names</returns>
        public async Task<List<string?>> GetOrgDetailsAsync(string requestType, string loggedInUserAlias, List<string> roleList)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
                {
                    { "User", loggedInUserAlias },
                };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "da62086b-3279-46a4-a136-d7294fe83cf4", $"Starting - {this.GetType()}.GetOrgDetailsAsync");

                if (!roleList.Contains(Constants.AdminRole) && !roleList.Contains(Constants.ScriptContributorRole))
                {
                    return null;
                }

                var response = await this.accessRepository.GetOrgDetailsAsync(requestType).ConfigureAwait(false);
                stopWatch.Stop();
                return response;
            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("da62086b-3279-46a4-a136-d7294fe83cf4", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("da62086b-3279-46a4-a136-d7294fe83cf4", "GetOrgDetailsAsync", eventProperties, metrics);
            }
        }

        /// <summary>
        /// Summarize the content 
        /// </summary>
        /// <param name="content"></param>
        /// <param name="loggedInUserAlias"></param>
        /// <returns>summary</returns>
        public async Task<string> SummarizeContent(string content, string? loggedInUserAlias)
        {
            var stopWatch = Stopwatch.StartNew();
            var eventProperties = new Dictionary<string, string>
                {
                    { "User", loggedInUserAlias },
                };

            try
            {
                Instrument.Logger.LogMessage(EventLevel.Informational, "da62086b-3279-46a4-a136-d7294fe83cg5", $"Starting - {this.GetType()}.SummarizeContent");

                OpenAIClient client = new(new Uri(_configuration["OpenAI:Url"]), new AzureKeyCredential(_configuration["OpenAI:Key"]));
                Response<ChatCompletions> response = await client.GetChatCompletionsAsync(
                    new ChatCompletionsOptions()
                    {
                        Messages =
                           {
                             new ChatRequestSystemMessage(_configuration["OpenAI:Instructions"]),
                             new ChatRequestUserMessage(content),
                           },

                        Temperature = 0.7f,
                        MaxTokens = Convert.ToInt16(_configuration["OpenAI:MaxTokens"]),
                        NucleusSamplingFactor = 0.0f,
                        FrequencyPenalty = 0.0f,
                        PresencePenalty = 0.0f,
                        DeploymentName = _configuration["OpenAI:DeploymentName"],
                    }).ConfigureAwait(false);

                ChatCompletions completions = response.Value;
                return completions.Choices[0].Message.Content;

            }
            catch (Exception ex)
            {
                eventProperties.Add("Exception", ex.Message);
                Instrument.Logger.LogException("da62086b-3279-46a4-a136-d7294fe83cg5", ex.Message, ex);
                throw;
            }
            finally
            {
                var metrics = new Dictionary<string, double>
                {
                    { "ExecutionTime", stopWatch.ElapsedMilliseconds },
                };
                Instrument.Logger.LogEvent("da62086b-3279-46a4-a136-d7294fe83cg5", "SummarizeContent", eventProperties, metrics);
            }
        }
    }
}
