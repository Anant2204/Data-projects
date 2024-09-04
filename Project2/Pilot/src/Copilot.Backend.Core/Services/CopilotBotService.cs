//-----------------------------------------------------------------------
// <copyright file="CopilotBotService.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Core.Services
{
    using Azure.Data.AppConfiguration;
    using Azure.Identity;
    using Copilot.Backend.Core.Constants;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Logger.Core;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json.Schema;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;
    using static Copilot.Backend.Core.DTO.Enum;


    /// <summary>
    /// Copilot Bot Service
    /// </summary>
    /// <seealso cref="Copilot.Backend.Core.Interfaces.ICopilotBotService" />
    public class CopilotBotService : ICopilotBotService
    {
        /// <summary>
        /// the reply global.
        /// </summary>
        private const string ReplyGlobal = "reply";

        /// <summary>
        /// The application configuration
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// The IInrent Finder service
        /// </summary>
        private readonly IIntentFinderService intentFinderService;

        /// <summary>
        /// The ICloud GPT service
        /// </summary>
        private readonly ICloudGptService cloudGptService;

        /// The ICloud GPT Azure search service
        /// </summary>
        private readonly ICloudGptAISearchService cloudGptAISearchService;

        /// <summary>
        /// AI response Generator
        /// </summary>
        private readonly IAIResponseGeneratorService aIResponseGeneratorService;

        /// <summary>
        /// Http Client Factory
        /// </summary>
        private readonly IHttpClientFactory httpClientFactory;

        /// <summary>
        /// Application Logging service
        /// </summary>
        private readonly IApplicationLogging applicationLogging;

        /// <summary>
        /// Initializes a new instance of the <see cref="CopilotBotService"/> class.
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="intentFinderService"></param>
        /// <param name="cloudGptService"></param>
        /// <param name="aIResponseGeneratorService"></param>
        /// <param name="genericAgentService"></param>
        public CopilotBotService(IApplicationLogging applicationLogging, IConfiguration configuration,
           IIntentFinderService intentFinderService, ICloudGptService cloudGptService, IAIResponseGeneratorService aIResponseGeneratorService, IHttpClientFactory httpClientFactory, ICloudGptAISearchService cloudGptAISearchService)
        {
            this.applicationLogging = applicationLogging;
            this.configuration = configuration;
            this.intentFinderService = intentFinderService;
            this.cloudGptService = cloudGptService;
            this.aIResponseGeneratorService = aIResponseGeneratorService;
            this.httpClientFactory = httpClientFactory;
            this.cloudGptAISearchService = cloudGptAISearchService;
        }

        /// <summary>
        /// The qustion ask to DB copilot bot
        /// </summary>
        /// <param name="parameters">The all parameter bot</param>
        /// <returns>Return the output as per question</returns>
        public async Task<ResponseDto> PostQuestionToDbCopilot(BotQuestionParams parameters)
        {
            ResponseDto responseDto = new ResponseDto() { ConversationId = parameters.ConversationId, Question = parameters.Question, ResponseType = ResponseType.error.ToString(), Data = { }, Source = string.Empty };
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "PostQuestionToDbCopilot"));

            if (parameters.Question == null && parameters.ParentId == null)
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, default, "CopilotBotService", "PostQuestionToDbCopilot"));
                //return default;
                //check this
                responseDto.Data = new { ErrorCode = ErrorCodes.Question_ParentId_Null, ErrorMessage = VirtuosoCopilotConstants.GeneralExceptionMessage };
                return responseDto;
            }

            //var intentAndResponse = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters, configuration["IntentAndResponseDetectionPrompt"]).ConfigureAwait(false);

            var intentAndResponse = JsonConvert.SerializeObject(
                new IntentResponse()
                {
                    intent = "cloudgpt",
                    responseFormat = "text",
                });

            IntentResponse intentResponse = JsonConvert.DeserializeObject<IntentResponse>(intentAndResponse);

            string intent = intentResponse?.intent ?? string.Empty;
            string responseFormat = intentResponse?.responseFormat ?? string.Empty;
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "PostQuestionToDbCopilot", $"Intent: {intent} ResponseFormat: {responseFormat}"));
            // var intent = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters).ConfigureAwait(false);
            if (string.IsNullOrEmpty(intent))
            {
                intent = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters).ConfigureAwait(false);
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "PostQuestionToDbCopilot", $"Intent: {intent}"));
            }
            string intentString = string.Empty;
            //ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "PostQuestionToDbCopilot", $"Intent: {intent}"));
            if (!string.IsNullOrEmpty(intent))
            {
                intentString = intent.Replace("Answer: ", "");
            }
            responseDto.Source = intentString;
            if (Convert.ToString(intent).Contains("greeting"))
            {
                var greetings = new
                {
                    reply = configuration["ResponseGreetingMessage"],
                    parentId = parameters.ParentId,
                    greeting = true,
                    intent = intentString
                };

                responseDto.ResponseType = ResponseType.text.ToString();
                responseDto.Data = JsonConvert.SerializeObject(greetings);
                return responseDto;
                //return JsonConvert.SerializeObject(greetings);
            }

            bool.TryParse(configuration?["IsCloudGPTEnabled"]?.ToString(), out bool isCloudGPTEnabled);
            bool.TryParse(configuration?["IsDbSelfHostEndpointEnabled"]?.ToString(), out bool IsDbSelfHostEndpointEnabled);
            if (!isCloudGPTEnabled && !IsDbSelfHostEndpointEnabled)
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, $"CloudGPTEndpoint enabled = {isCloudGPTEnabled}, DBSelfHostEndpoint enabled={IsDbSelfHostEndpointEnabled}", "CopilotBotService", "PostQuestionToDbCopilot"));
            }

            bool.TryParse(configuration?["aiSearchEnabled"]?.ToString(), out bool aiSearchEnabled);

            if (Convert.ToString(intent).Contains("cloudgpt") && isCloudGPTEnabled && !aiSearchEnabled)
            {
                var cloudGptResponse = await this.cloudGptService.GetResponseFromCloudGPT(parameters.Question, parameters).ConfigureAwait(false);

                if (cloudGptResponse == null)
                {
                    responseDto.Data = new { ErrorCode = ErrorCodes.Parameters_Question_Null, ErrorMessage = VirtuosoCopilotConstants.GeneralExceptionMessage };
                    return responseDto;
                }

                var cgptresponse = JsonConvert.DeserializeObject<JToken>(cloudGptResponse) ?? string.Empty;//remove if not needed

                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, cloudGptResponse, "CopilotBotService", "PostQuestionToDbCopilot"));
                JObject responseObject = JObject.Parse(cloudGptResponse);
                responseObject["intent"] = intentString;
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, responseObject.ToString(), "CopilotBotService", "PostQuestionToDbCopilot"));
                responseDto.ResponseType = ResponseType.text.ToString();
                string? intentResponseFormat = responseFormat;
                if (string.IsNullOrEmpty(responseFormat))
                {
                    intentResponseFormat = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters, configuration["ResponseFormatRelatedPrompt"]).ConfigureAwait(false);
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "PostQuestionToDbCopilot", $"ResponseFormat: {intentResponseFormat}"));
                }

                //var intentResponseFormat = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters, configuration["ResponseFormatRelatedPrompt"]).ConfigureAwait(false);
                if (Convert.ToString(intentResponseFormat).ToLower().Contains("markdown"))
                {
                    if (responseObject["reply"] != null && CheckMarkdown(responseObject))
                    {
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(responseObject), "CopilotBotService", "PostQuestionToDbCopilot"));

                        responseDto.ResponseType = ResponseType.markdown.ToString();
                        responseDto.Data = JsonConvert.SerializeObject(responseObject);
                        return responseDto;
                    }
                }
                if (Convert.ToString(intentResponseFormat).ToLower().Contains("graph"))
                {
                    responseObject["intent"] = intentString;
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(responseObject), "CopilotBotService", "PostQuestionToDbCopilot"));
                    responseDto.ResponseType = ResponseType.graph.ToString();

                    var test = responseObject["messages"];
                    if (test != null)
                    {
                        var responseArray = JsonConvert.DeserializeObject<JToken>(test.ToString());
                        if (responseArray != null && responseArray.HasValues)
                        {
                            var type = responseArray[0]["type"];
                            if (type != null && type.ToString() == "text")
                            {
                                responseDto.ResponseType = ResponseType.text.ToString();
                            }
                        }
                    }
                    responseDto.Data = JsonConvert.SerializeObject(responseObject);
                    return responseDto;
                }
                if (Convert.ToString(intentResponseFormat).ToLower().Contains("htmltable"))
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(responseObject), "CopilotBotService", "PostQuestionToDbCopilot"));
                    if (responseObject["reply"] != null)
                    {
                        responseDto.ResponseType = ResponseType.htmltable.ToString();
                        bool containsMarkdownTable = CheckMarkdown(responseObject);
                        if (containsMarkdownTable)
                        {
                            responseDto.ResponseType = ResponseType.markdown.ToString();
                        }
                        else
                        {
                            var test = responseObject["messages"];
                            if (test != null)
                            {
                                var responseArray = JsonConvert.DeserializeObject<JToken>(test.ToString());
                                if (responseArray != null && responseArray.HasValues)
                                {
                                    var type = responseArray[0]["type"];
                                    if (type != null && type.ToString() == "text")
                                    {
                                        responseDto.ResponseType = ResponseType.text.ToString();
                                    }
                                }
                            }
                        }
                        responseDto.Data = JsonConvert.SerializeObject(responseObject);
                        return responseDto;
                    }
                }
                if (Convert.ToString(intentResponseFormat).ToLower().Contains("image"))
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(responseObject), "CopilotBotService", "PostQuestionToDbCopilot"));
                    //responseDto.ResponseType = ResponseType.image.ToString();
                    var test = responseObject["messages"];
                    if (test != null)
                    {
                        var responseArray = JsonConvert.DeserializeObject<JToken>(test.ToString());
                        if (responseArray != null && responseArray.HasValues)
                        {
                            var type = responseArray[0]["type"];
                            if (type != null && type.ToString() == "text")
                            {
                                responseDto.ResponseType = ResponseType.text.ToString();
                            }
                        }
                    }
                    responseDto.Data = JsonConvert.SerializeObject(responseObject);
                    return responseDto;
                }

                responseDto.Data = JsonConvert.SerializeObject(responseObject);
                return responseDto;
            }

            else if (Convert.ToString(intent).Contains("cloudgpt") && isCloudGPTEnabled && aiSearchEnabled)
            {
                intentString = "aisearch";
                responseDto.Source = intentString;
                var cloudGptResponse = await this.cloudGptAISearchService.GetResponseFromCloudGPT(parameters.Question, parameters).ConfigureAwait(false);
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, cloudGptResponse, "CopilotBotService", "PostQuestionToDbCopilot"));

                JObject responseObject = JObject.Parse(cloudGptResponse);
                responseObject["intent"] = intentString;
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, responseObject.ToString(), "CopilotBotService", "PostQuestionToDbCopilot"));

                responseDto.ResponseType = ResponseType.text.ToString();

                //response checking here
                string? intentResponseFormat = responseFormat;
                if (string.IsNullOrEmpty(responseFormat))
                {
                    intentResponseFormat = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters, configuration["ResponseFormatRelatedPrompt"]).ConfigureAwait(false);
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "PostQuestionToDbCopilot", $"ResponseFormat: {intentResponseFormat}"));
                }

                if (Convert.ToString(intentResponseFormat).ToLower().Contains("markdown"))
                {
                    if (responseObject["reply"] != null && (CheckTextOrPlainMarkdownInRelevantSources(responseObject) || CheckMarkdownInRelevantSources(responseObject) || CheckMarkdown(responseObject)))
                    {
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(responseObject), "CopilotBotService", "PostQuestionToDbCopilot"));

                        responseDto.ResponseType = ResponseType.markdown.ToString();
                        responseDto.Data = JsonConvert.SerializeObject(responseObject);
                        return responseDto;
                    }
                }
                if (Convert.ToString(intentResponseFormat).ToLower().Contains("graph"))
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(responseObject), "CopilotBotService", "PostQuestionToDbCopilot"));
                    responseDto.ResponseType = ResponseType.graph.ToString();
                    bool containsTextOrPlainMarkdown = CheckTextOrPlainMarkdownInRelevantSources(responseObject);
                    bool containsMarkdown = CheckMarkdownInRelevantSources(responseObject);
                    if (containsTextOrPlainMarkdown || containsMarkdown)
                    {
                        responseDto.ResponseType = ResponseType.markdown.ToString();
                    }
                    else
                    {
                        bool containsText = CheckTextInRelevantSources(responseObject);
                        if (containsText)
                        {
                            responseDto.ResponseType = ResponseType.text.ToString();
                        }
                    }
                    responseDto.Data = JsonConvert.SerializeObject(responseObject);
                    return responseDto;
                }
                if (Convert.ToString(intentResponseFormat).ToLower().Contains("htmltable"))
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(responseObject), "CopilotBotService", "PostQuestionToDbCopilot"));

                    if (responseObject["reply"] != null)
                    {
                        responseDto.ResponseType = ResponseType.htmltable.ToString();
                        bool containsTextOrPlainMarkdown = CheckTextOrPlainMarkdownInRelevantSources(responseObject);
                        bool containsMarkdown = CheckMarkdownInRelevantSources(responseObject);
                        if (containsTextOrPlainMarkdown || containsMarkdown)
                        {
                            responseDto.ResponseType = ResponseType.markdown.ToString();
                        }
                        else
                        {
                            bool containsText = CheckTextInRelevantSources(responseObject);
                            if (containsText)
                            {
                                responseDto.ResponseType = ResponseType.text.ToString();
                            }
                        }
                        responseDto.Data = JsonConvert.SerializeObject(responseObject);
                        return responseDto;
                    }
                }
                if (Convert.ToString(intentResponseFormat).ToLower().Contains("image"))
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(responseObject), "CopilotBotService", "PostQuestionToDbCopilot"));
                    //responseDto.ResponseType = ResponseType.image.ToString();
                    bool containsTextOrPlainMarkdown = CheckTextOrPlainMarkdownInRelevantSources(responseObject);
                    bool containsMarkdown = CheckMarkdownInRelevantSources(responseObject);
                    if (containsTextOrPlainMarkdown || containsMarkdown)
                    {
                        responseDto.ResponseType = ResponseType.markdown.ToString();
                    }
                    else
                    {
                        bool containsText = CheckTextInRelevantSources(responseObject);
                        if (containsText)
                        {
                            responseDto.ResponseType = ResponseType.text.ToString();
                        }
                    }
                    responseDto.Data = JsonConvert.SerializeObject(responseObject);
                    return responseDto;

                }
                responseDto.Data = JsonConvert.SerializeObject(responseObject);
                return responseDto;
            }

            else if (Convert.ToString(intent).Contains("dbcopilot") && IsDbSelfHostEndpointEnabled)
            {
                //If user question is a valid sql query then do not process it 
                //We will ask GPT to tell me if the user has given a valid sql query, return with yes or no

                bool.TryParse(configuration?["CheckPromptForSQLQuery"]?.ToString(), out bool CheckPromptForSQLQuery);
                if (CheckPromptForSQLQuery)
                {
                    var intentSQL = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters, configuration["SQLQueryRelatedPrompt"]).ConfigureAwait(false);
                    //make a call to open ai pass the question and get response if yes or no and accordingly proceed
                    if (Convert.ToString(intentSQL).ToLower().Contains("yes"))
                    {
                        var resultObject = new
                        {
                            reply = configuration["ValidSqlQueryMessage"],
                            parentId = parameters.ParentId,
                            greeting = false,
                            intent = intentString
                        };
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "PostQuestionToDbCopilot"));

                        //check this - error or above object needs to be returned
                        responseDto.Data = new { ErrorCode = ErrorCodes.Valid_Sql_Query, ErrorMessage = configuration["ValidSqlQueryMessage"] };
                        return responseDto;

                        //return JsonConvert.SerializeObject(resultObject);
                    }
                }
                var response = await this.SendQuestionToCopilotBot(parameters.Question, parameters, intentString, responseFormat).ConfigureAwait(false);
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(response), "CopilotBotService", "PostQuestionToDbCopilot"));
                return response;

                //JObject responseObject = JObject.Parse(response);
                //responseObject["note"] = VirtuosoCopilotConstants.ConfidentialMessage;
                //responseObject["intent"] = intentString;
                //ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, responseObject.ToString(), "CopilotBotService", "PostQuestionToDbCopilot"));
                //return responseObject.ToString();
            }

            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, "Intent Detection failed", "CopilotBotService", "PostQuestionToDbCopilot"));

            var intentDetectionFailed = new
            {
                reply = configuration["NoAvailableDataMessage"],
                parentId = parameters.ParentId,
                greeting = false
            };

            responseDto.ResponseType = ResponseType.text.ToString();
            responseDto.Data = intentDetectionFailed;
            return responseDto;
            //return JsonConvert.SerializeObject(intentDetectionFailed);
        }

        private static bool CheckMarkdown(JObject responseObject)
        {
            var test = responseObject["reply"];
            string testString = test?.ToString() ?? string.Empty;
            string pattern = @"^\|.*\|.*\|.*\|?$"; //looks for lines starting and ending with '|'
            bool containsMarkdownTable = Regex.IsMatch(testString, pattern, RegexOptions.Multiline);
            return containsMarkdownTable;
        }

        private static bool CheckTextOrPlainMarkdownInRelevantSources(JObject responseObject)
        {
            bool containsTextOrPlainMarkdownTable = false;
            var test = responseObject["relevantsources"];
            if (test != null)
            {
                var responseArray = JsonConvert.DeserializeObject<JToken>(test.ToString());
                if (responseArray != null && responseArray.HasValues)
                {
                    var type = responseArray[0]["SourceContentType"];
                    if (type != null && type.ToString() == "text/plain-markdown")
                    {
                        containsTextOrPlainMarkdownTable = true;
                    }
                }
            }
            return containsTextOrPlainMarkdownTable;
        }

        private static bool CheckTextInRelevantSources(JObject responseObject)
        {
            bool containsText = false;
            var test = responseObject["relevantsources"];
            if (test != null)
            {
                var responseArray = JsonConvert.DeserializeObject<JToken>(test.ToString());
                if (responseArray != null && responseArray.HasValues)
                {
                    var type = responseArray[0]["SourceContentType"];
                    if (type != null && type.ToString() == "text/plain")
                    {
                        containsText = true;
                    }
                }
            }
            return containsText;
        }

        private static bool CheckMarkdownInRelevantSources(JObject responseObject)
        {
            bool containsMarkdown = false;
            var test = responseObject["relevantsources"];
            if (test != null)
            {
                var responseArray = JsonConvert.DeserializeObject<JToken>(test.ToString());
                if (responseArray != null && responseArray.HasValues)
                {
                    var type = responseArray[0]["SourceContentType"];
                    if (type != null && type.ToString() == "text/markdown")
                    {
                        containsMarkdown = true;
                    }
                }
            }
            return containsMarkdown;
        }

        ///// <summary>
        ///// Auto suggested questions based on input provided by user
        ///// </summary>
        ///// <param name="parameters">The all parameter bot</param>
        ///// <returns>Return the output as per question</returns>
        //public async Task<List<string>> GetAutoSuggestionsFromDbCopilot(BotQuestionParams parameters)
        //{
        //    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));

        //    if (parameters.Question == null && parameters.ParentId == null)
        //    {
        //        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, default, "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));
        //        return default;
        //    }

        //    bool.TryParse(configuration?["IsDbSelfHostAutoSuggestionEndpointEnabled"]?.ToString(), out bool IsDbSelfHostAutoSuggestionEndpointEnabled);
        //    if (!IsDbSelfHostAutoSuggestionEndpointEnabled)
        //    {
        //        ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, $" DbSelfHostAutoSuggestionEndpoint enabled={IsDbSelfHostAutoSuggestionEndpointEnabled}", "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));
        //    }

        //    if (IsDbSelfHostAutoSuggestionEndpointEnabled)
        //    {
        //        var response = await this.GetAutoSuggestionsFromCopilotBot(parameters.Question, parameters).ConfigureAwait(false);
        //        string logresult;
        //        if (response != null && response.Count > 0)
        //        {
        //            logresult = string.Join(",", response);
        //        }
        //        else
        //        {
        //            logresult = "No Result Found";
        //        }
        //        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, logresult, "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));
        //        return response;
        //    }

        //    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, "Auto Suggestion failed", "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));
        //    return null;
        //}

        /// <summary>
        /// Auto suggested questions based on input provided by user
        /// </summary>
        /// <param name="parameters">The all parameter bot</param>
        /// <returns>Return the output as per question</returns>
        public async Task<List<string>> GetAutoSuggestionsFromDbCopilot(AutoSuggestionParams parameters)
        {
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggestStart(parameters, "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));
            bool.TryParse(configuration?["IsDbSelfHostAutoSuggestionEndpointEnabled"]?.ToString(), out bool IsDbSelfHostAutoSuggestionEndpointEnabled);
            if (!IsDbSelfHostAutoSuggestionEndpointEnabled)
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggest(parameters, $" DbSelfHostAutoSuggestionEndpoint enabled={IsDbSelfHostAutoSuggestionEndpointEnabled}", "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));
            }
            if (IsDbSelfHostAutoSuggestionEndpointEnabled)
            {
                var response = await this.GetAutoSuggestionsFromCopilotBot(parameters).ConfigureAwait(false);
                string logresult;
                if (response != null && response.Count > 0)
                {
                    logresult = string.Join(",", response);
                }
                else
                {
                    logresult = "No Result Found";
                }
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggestEnd(parameters, logresult, "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));
                return response;
            }
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggestEnd(parameters, "Auto Suggestion failed", "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));
            return null;
        }

        /// <summary>
        /// Get all configurations from Azure App Configuration for copilot ui
        /// </summary>
        /// <returns></returns>
        public async Task<Dictionary<string, string>> GetAllAzureAppConfigurationsForCopilotUI()
        {
            var appConfigEndpoint = configuration[VirtuosoCopilotConstants.AppConfigurationEndpoint];
            Dictionary<string, string> settings = new Dictionary<string, string>();
            var tokenCredential = new DefaultAzureCredential(new DefaultAzureCredentialOptions
            {
                ManagedIdentityClientId = configuration[VirtuosoCopilotConstants.UserAssignedClientId]
            });
            var endpoint = new Uri(appConfigEndpoint);
            var client = new ConfigurationClient(endpoint, tokenCredential);
            var selector = new SettingSelector { LabelFilter = VirtuosoCopilotConstants.CopiloUiLabel };
            await foreach (ConfigurationSetting setting in client.GetConfigurationSettingsAsync(selector))
            {
                settings[setting.Key] = setting.Value;
            }
            return settings;

        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Extracts the Object graph response 
        /// </summary>
        /// <param name="responseArray">The response array</param>
        /// <param name="savedResult">The saved result</param>
        /// <param name="rephrasedQuestion">The rephrased question</param>
        /// <param name="debugMode">Debug mode flag</param>
        /// <param name="query">The query data</param>
        /// <param name="parameters">All parameters of bot</param>
        /// <returns>The extracted response</returns>
        private string ExtractGraphData(dynamic[] responseArray, IDictionary<string, object> savedResult, string rephrasedQuestion, bool debugMode, string query, BotQuestionParams parameters)
        {
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "ExtractGraphData"));
            foreach (var item in responseArray)
            {
                if (item.code_info != null && item.code_info.code_execute_result != null && item.code_info.code_execute_result.exception_message == null && item.code_info.code_type == "python")
                {
                    var resultObject = new
                    {
                        reply = item.code_info.code_execute_result.data,
                        rephrasedQuestion,
                        query = debugMode ? savedResult[query] : string.Empty,
                        graphData = item.content,
                        IsValidAnswer = false,
                        api = "copilot",
                        note = VirtuosoCopilotConstants.ConfidentialMessage,
                        intent = "dbcopilot"
                    };
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "ExtractGraphData"));
                    return JsonConvert.SerializeObject(resultObject);
                }
            }
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, "null", "CopilotBotService", "ExtractGraphData"));
            return "null";
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Extract the response 
        /// </summary>
        /// <param name="responseArray">Response array</param>
        /// <param name="responseItemIndex">Response item</param>
        /// <param name="rephrasedQuestion">Rephrased question</param>
        /// <param name="debugMode">Debug mode</param>
        /// <param name="reply">The reply</param>
        /// <param name="parameters">The All parameters for bot. </param>
        /// <returns>Extract Response</returns>
        private async Task<string> ExtractResponse(dynamic[] responseArray, int responseItemIndex, string rephrasedQuestion, bool debugMode, string reply, BotQuestionParams parameters)
        {
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "ExtractResponse"));
            const string Query = "query";
            const string DataCount = "dataCount";
            const string IsValidAnswer = "isValidAnswer";
            const string ContentData = "contentData";
            IDictionary<string, object> response = new Dictionary<string, object>();
            response[reply] = null;
            response[Query] = null;
            response[DataCount] = 0;
            response[IsValidAnswer] = false;
            response[ContentData] = null;

            var resultData = ExtractGraphData(responseArray, response, rephrasedQuestion, debugMode, Query, parameters);
            if (resultData != "null")
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, resultData, "CopilotBotService", "ExtractResponse"));
                return resultData;
            }

            var result = ExtractObjectData(responseArray, response, rephrasedQuestion, debugMode, reply, Query, parameters);
            if (result != "null")
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, result, "CopilotBotService", "ExtractResponse"));
                return result;
            }

            var coreData = await ExtractCoreData(response, reply, Query, rephrasedQuestion, debugMode, parameters).ConfigureAwait(false);
            if (coreData != "null")
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, coreData, "CopilotBotService", "ExtractResponse"));
                return coreData;
            }

            if (responseArray[responseItemIndex].code_info == null)
            {
                var responseContent = responseArray[responseItemIndex].content.ToString().ToLower();

                if (responseArray.Length > 1)
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "ExtractResponse", $"Response from DB Copilot bot for question: {rephrasedQuestion}, query: {responseArray[responseItemIndex - 1].content}"));
                }

                if (responseContent.Contains("t-sql") || responseContent.Contains("tsql"))
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(VirtuosoCopilotConstants.CopilotDbBotFailureResponse), "CopilotBotService", "ExtractResponse"));
                    return JsonConvert.SerializeObject(VirtuosoCopilotConstants.CopilotDbBotFailureResponse);
                }

                if (debugMode)
                {
                    var queryIndex = responseItemIndex >= 1 ? responseItemIndex - 1 : responseItemIndex;
                    var resultObject = new
                    {
                        reply = responseArray[responseItemIndex].content,
                        rephrasedQuestion,
                        query = responseArray[queryIndex].content,
                        ContentData = string.Empty,
                        IsValidAnswer = false,
                        note = VirtuosoCopilotConstants.ConfidentialMessage,
                        intent = "dbcopilot"
                    };
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "ExtractResponse"));
                    return JsonConvert.SerializeObject(resultObject);
                }

                var resultObject_ = new
                {
                    reply = responseArray[responseItemIndex].content,
                    IsValidAnswer = false,
                    note = VirtuosoCopilotConstants.ConfidentialMessage,
                    intent = "dbcopilot"
                };
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject_), "CopilotBotService", "ExtractResponse"));
                return JsonConvert.SerializeObject(resultObject_);
            }

            var finalObject = new
            {
                reply = JsonConvert.SerializeObject(VirtuosoCopilotConstants.CopilotDbBotFailureResponse),
                rephrasedQuestion,
                query = responseArray[responseItemIndex].content,
                IsValidAnswer = false,
                note = VirtuosoCopilotConstants.ConfidentialMessage,
                intent = "dbcopilot"
            };
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(finalObject), "CopilotBotService", "ExtractResponse"));
            return JsonConvert.SerializeObject(finalObject);
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Extracts the core response 
        /// </summary>
        /// <param name="savedResult">The saved result</param>
        /// <param name="reply">The reply</param>
        /// <param name="query">The query data</param>
        /// <param name="rephrasedQuestion">The rephrased question</param>
        /// <param name="debugMode">The debugMode. </param>
        /// <param name="parameters">All parameters of bot. </param>
        /// <returns>The extracted response</returns>
        private async Task<string> ExtractCoreData(IDictionary<string, object> savedResult, string reply, string query, string rephrasedQuestion, bool debugMode, BotQuestionParams parameters)
        {
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "ExtractCoreData"));
            if ((savedResult[reply] != null && savedResult[query] != null) || (savedResult["contentData"] != null))
            {
                var resultObject = new
                {
                    reply = savedResult[reply],
                    query = debugMode ? savedResult[query] : string.Empty,
                    rephrasedQuestion,
                    IsValidAnswer = true,
                    note = VirtuosoCopilotConstants.ConfidentialMessage,
                    intent = "dbcopilot"
                };
                var cpt = JsonConvert.SerializeObject(resultObject);
                var cptresponse = JsonConvert.DeserializeObject<JToken>(cpt);
                var datacheck = cptresponse?[reply]?["data"];
                var datalength = (datacheck as JArray)?.Count ?? -1;
                if (datalength == 0)
                {
                    var resultObject_ = new
                    {
                        reply = configuration["NoAvailableDataMessage"],
                        query = debugMode ? savedResult[query] : string.Empty,
                        IsValidAnswer = false,
                        note = VirtuosoCopilotConstants.ConfidentialMessage,
                        intent = "dbcopilot"
                    };
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject_), "CopilotBotService", "ExtractCoreData"));
                    return JsonConvert.SerializeObject(resultObject_);
                }
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "ExtractCoreData"));
                return JsonConvert.SerializeObject(resultObject);
            }
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, "null", "CopilotBotService", "ExtractCoreData"));
            return "null";
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Extracts the Object response 
        /// </summary>
        /// <param name="responseArray">The response array.</param>
        /// <param name="savedResult">The saved result.</param>
        /// <param name="rephrasedQuestion">The rephrased question.</param>
        /// <param name="debugMode">Debug mode flag.</param>
        /// <param name="reply">The reply.</param>
        /// <param name="query">The query data.</param>
        /// <param name="parameters">All Parameters of bot.</param>
        /// <returns>The extracted response.</returns>
        private string ExtractObjectData(dynamic[] responseArray, IDictionary<string, object> savedResult, string rephrasedQuestion, bool debugMode, string reply, string query, BotQuestionParams parameters)
        {
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "ExtractObjectData"));
            var lengthData = 0;
            var exceptionflag = string.Empty;
            var errorQuery = string.Empty;
            int isFirstIteration = 0;
            foreach (var item in responseArray)
            {
                if (item.code_info != null && item.code_info.code_execute_result != null && item.code_info.code_execute_result.exception_message == null && item.code_info.code_type == "python")
                {
                    var resultObject = new
                    {
                        reply = item.code_info.code_execute_result.data,
                        rephrasedQuestion,
                        query = debugMode ? savedResult[query] : string.Empty,
                        graphData = item.content,
                        IsValidAnswer = false,
                        api = "copilot",
                        note = VirtuosoCopilotConstants.ConfidentialMessage,
                        intent = "dbcopilot"
                    };
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "ExtractObjectData"));
                    return JsonConvert.SerializeObject(resultObject);
                }
                if (item.code_info != null && item.code_info.code_execute_result != null && item.code_info.code_execute_result.exception_message == null)
                {
                    savedResult[reply] = item.code_info.code_execute_result.data;
                    savedResult[query] = item.content;
                    if (item.code_info.code_execute_result.data.columns.Count == 1 && item.code_info.code_execute_result.data.data.Count == 1)
                    {
                        lengthData = 1;
                        continue;
                    }

                    savedResult["contentData"] = item.code_info.code_execute_result.data;
                    savedResult["IsValidAnswer"] = true;
                    exceptionflag = "false";
                }

                var replyQuery = new[] { reply, query };
                var result = CheckAndPerformActions(item, savedResult, rephrasedQuestion, debugMode, replyQuery, lengthData, parameters);

                if (result != "null")
                {
                    return result;
                }

                isFirstIteration = isFirstIteration + 1;
                errorQuery = isFirstIteration == responseArray.Length - 1 ? item.content : errorQuery;
                exceptionflag = CheckForExceptionMessage(item, exceptionflag);
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, exceptionflag, "CopilotBotService", "ExtractObjectData"));
            }

            var resultObjectEx = CheckExceptionResult(exceptionflag, debugMode, errorQuery);
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, resultObjectEx, "CopilotBotService", "ExtractObjectData"));
            return resultObjectEx;
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Checks if the content contains plot and performs actions accordingly.
        /// </summary>
        /// <param name="item">The dynamic item to check</param>
        /// <param name="savedResult">The dictionary to store the results</param>
        /// <param name="rephrasedQuestion">The rephrased question</param>
        /// <param name="debugMode">Debug mode flag</param>
        /// <param name="replyQuery">The reply and query</param>
        /// <param name="lengthData">The length of data</param>
        /// <param name="parameters">All parameter of bot</param>
        /// <returns>The extracted response</returns>
        private string CheckAndPerformActions(dynamic item, IDictionary<string, object> savedResult, string rephrasedQuestion, bool debugMode, string[] replyQuery, int lengthData, BotQuestionParams parameters)
        {
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "CheckAndPerformActions"));
            var reply = replyQuery[0];
            var query = replyQuery[1];
            if (Convert.ToString(item.content).Contains("plt") || Convert.ToString(item.content).Contains("px"))
            {
                var result = ExtractResultObject(item, savedResult, rephrasedQuestion, debugMode, reply, query, parameters);
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, result, "CopilotBotService", "CheckAndPerformActions"));
                return result;
            }

            if (lengthData == 1)
            {
                var result = ExtractSingleResponse(item, savedResult, rephrasedQuestion, debugMode, query, parameters);
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, result, "CopilotBotService", "CheckAndPerformActions"));
                return result;
            }
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, "null", "CopilotBotService", "CheckAndPerformActions"));
            return "null";
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Checks if an exception message exists in the provided item's code info and assigns it to the exception flag.
        /// </summary>
        /// <param name="item">The dynamic item to check</param>
        /// <param name="exceptionflag">The exception flag to assign the message</param>
        /// <returns>The extracted response</returns>
        private static string CheckForExceptionMessage(dynamic item, string exceptionflag)
        {
            if (item.code_info != null && item.code_info.code_execute_result != null && item.code_info.code_execute_result.exception_message != null)
            {
                return item.code_info.code_execute_result.exception_message.ToString();
            }

            return exceptionflag;
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Checks if an exception is there or not
        /// </summary>
        /// <param name="exceptionflag">The exception flag to assign the message</param>
        /// <param name="debugMode">The Debug Mode</param>
        /// <param name="errorQuery">The Error Message</param>
        /// <returns>The extracted response</returns>
        private string CheckExceptionResult(string exceptionflag, bool debugMode, string errorQuery)
        {
            if (exceptionflag != "false" && exceptionflag != string.Empty)
            {
                ApplicationLogHelper.LogInformation($"DbCopilot API Exception: " + exceptionflag + DateTime.Now);
                var exceptionMessage = configuration["ExceptionMessage"];
                var resultObject = new
                {
                    contentData = exceptionMessage,
                    query = debugMode ? errorQuery : string.Empty,
                    IsValidAnswer = false,
                    note = VirtuosoCopilotConstants.ConfidentialMessage,
                    intent = "dbcopilot"
                };
                return JsonConvert.SerializeObject(resultObject);
            }

            return "null";
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Extracts the Result Object
        /// </summary>
        /// <param name="item">The response item</param>
        /// <param name="savedResult">The saved result</param>
        /// <param name="rephrasedQuestion">The rephrased question</param>
        /// <param name="debugMode">Debug mode flag</param>
        /// <param name="reply">The reply</param>
        /// <param name="query">The query data</param>
        /// <returns>The extracted response</returns>
        private dynamic ExtractResultObject(dynamic item, IDictionary<string, object> savedResult, string rephrasedQuestion, bool debugMode, string reply, string query, BotQuestionParams parameters)
        {
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "ExtractResultObject"));
            var checkLength = JsonConvert.SerializeObject(savedResult[reply]);
            var check = JsonConvert.DeserializeObject<JToken>(checkLength);
            var check2 = check is JObject obj ? obj["data"] : null;
            var datalength = (check2 as JArray)?.Count ?? -1;

            var resultObject = new
            {
                reply = datalength < 1 ? "No data available" : savedResult[reply],
                rephrasedQuestion,
                query = debugMode ? savedResult[query] : string.Empty,
                graphData = datalength < 1 ? string.Empty : item.content,
                IsValidAnswer = false,
                note = VirtuosoCopilotConstants.ConfidentialMessage,
                intent = "dbcopilot"
            };
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "ExtractResultObject"));
            return JsonConvert.SerializeObject(resultObject);
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Extracts the single response 
        /// </summary>
        /// <param name="item">The response item</param>
        /// <param name="savedResult">The saved result</param>
        /// <param name="rephrasedQuestion">The rephrased question</param>
        /// <param name="debugMode">Debug mode flag</param>
        /// <param name="query">The query data</param>
        /// <param name="parameters">bot all parameters</param>
        /// <returns>The extracted response</returns>
        private dynamic ExtractSingleResponse(dynamic item, IDictionary<string, object> savedResult, string rephrasedQuestion, bool debugMode, string query, BotQuestionParams parameters)
        {
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "ExtractSingleResponse"));
            if (debugMode)
            {
                var resultObject = new
                {
                    contentData = item.content,
                    query = savedResult[query],
                    rephrasedQuestion,
                    IsValidAnswer = false,
                    note = VirtuosoCopilotConstants.ConfidentialMessage,
                    intent = "dbcopilot"
                };
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "ExtractSingleResponse"));
                return JsonConvert.SerializeObject(resultObject);
            }
            else
            {
                var resultObject = new
                {
                    contentData = item.content,
                    IsValidAnswer = false,
                    note = VirtuosoCopilotConstants.ConfidentialMessage,
                    intent = "dbcopilot"
                };
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "ExtractSingleResponse"));
                return JsonConvert.SerializeObject(resultObject);
            }
        }

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// Sends question to copilot
        /// </summary>
        /// <param name="rephrasedQuestion">Rephrased question</param>
        /// <param name="parameters">All Parametes of bot. </param>
        /// <returns>Return Send Question To Copilot Bot </returns>
        private async Task<ResponseDto> SendQuestionToCopilotBot(string rephrasedQuestion, BotQuestionParams parameters, string intentString, string responseFormat)
        {
            ResponseDto responseDto = new ResponseDto() { ConversationId = parameters.ConversationId, Question = parameters.Question, ResponseType = ResponseType.text.ToString(), Data = { }, Source = intentString };
            try
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "SendQuestionToCopilotBot"));
                var requestUrl = configuration[VirtuosoCopilotConstants.CopilotDbEndpoint];
                var debugMode = configuration[VirtuosoCopilotConstants.IsCopilotDbDebugModeOn] != null
                                         && Convert.ToBoolean(configuration[VirtuosoCopilotConstants.IsCopilotDbDebugModeOn], CultureInfo.CurrentCulture);

                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "SendQuestionToCopilotBot",
                       $"CopilotDbEndpoint: {requestUrl}, DebugMode: {debugMode}"));
                using (var client = new HttpClient())
                {
                    var appKey = configuration[VirtuosoCopilotConstants.CopilotDbBotApikvr];
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", appKey);
                    var questionjson = new
                    {
                        question = rephrasedQuestion,
                        extra_kwargs = new
                        {
                            additional_information = "current user is " + parameters.UserAlias
                        }
                    };

                    var inputJson = JsonConvert.SerializeObject(questionjson);
                    var content = new StringContent(inputJson, Encoding.UTF8, "application/json");
                    content.Headers.Add("azureml-model-deployment", "e2e");
                    content.Headers.Add("session-id", parameters.SessionId);
                    HttpResponseMessage response = new HttpResponseMessage();
                    try
                    {
                        response = await client.PostAsync(new Uri(requestUrl), content).ConfigureAwait(false);
                    }
                    catch (Exception exc)
                    {
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "SendQuestionToCopilotBot", $"DBCopilot Exception CopilotBotService {exc.ToString()}"));
                        ApplicationLogHelper.LogError(exc, $"CopilotBotService DBCopilot Exception");
                        throw;
                    }

                    if (!response.IsSuccessStatusCode)
                    {
                        //check for timeout and return gracefully
                        if (response.StatusCode == HttpStatusCode.RequestTimeout)
                        {
                            ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "SendQuestionToCopilotBot", $"DBCopilot Timeout CopilotBotService"));
                            responseDto.ResponseType = ResponseType.error.ToString();
                            responseDto.Data = new { ErrorMessage = configuration["DBCopilotExtensiveQuery"] };
                            return responseDto;
                        }

                        var errorContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, errorContent, "CopilotBotService", "SendQuestionToCopilotBot"));
                        Exception exception = new Exception(errorContent);
                        throw exception;
                    }

                    var responseBody = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var responseArray = JsonConvert.DeserializeObject<dynamic[]>(responseBody);
                    var responseItemIndex = responseArray.Length - 1;
                    var copilotResponse = await ExtractResponse(responseArray, responseItemIndex, rephrasedQuestion, debugMode, ReplyGlobal, parameters).ConfigureAwait(false);

                    var cptresponse = JsonConvert.DeserializeObject<JToken>(copilotResponse);
                    //if (cptresponse != null && cptresponse?["graphData"] != null)//check
                    //{
                    //    responseDto.ResponseType = ResponseType.graph.ToString();
                    //}

                    //response checking here
                    string? intentResponseFormat = responseFormat;
                    if (string.IsNullOrEmpty(responseFormat))
                    {
                        intentResponseFormat = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters, configuration["ResponseFormatRelatedPrompt"]).ConfigureAwait(false);
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "SendQuestionToCopilotBot", $"ResponseFormat: {intentResponseFormat}"));
                    }


                    //var intentResponseFormat = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters, configuration["ResponseFormatRelatedPrompt"]).ConfigureAwait(false);

                    //var intentTable = await this.intentFinderService.IntentFinderResponse(parameters.Question, parameters, configuration["TabularFormatRelatedPrompt"]).ConfigureAwait(false);
                    //if (Convert.ToString(intentTable).ToLower().Contains("tabular"))
                    if (Convert.ToString(intentResponseFormat).ToLower().Contains("htmltable"))
                    {
                        JObject jsonObject = JObject.Parse(copilotResponse);
                        if (jsonObject["reply"] != null)
                        {
                            JObject replyObject = (JObject)jsonObject["reply"];

                            string? replyString = replyObject?.ToString();

                            if (!string.IsNullOrEmpty(replyString))
                            {
                                bool isValid = IsJsonValid(replyString);
                                if (isValid)
                                {
                                    var resultObject = new
                                    {
                                        reply = replyObject,
                                        parentId = parameters.ParentId,
                                        greeting = false,
                                        note = VirtuosoCopilotConstants.ConfidentialMessage,
                                        intent = "dbcopilot"
                                    };
                                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "PostQuestionToDbCopilot"));

                                    return new ResponseDto() { ConversationId = parameters.ConversationId, Question = parameters.Question, ResponseType = ResponseType.htmltable.ToString(), Data = JsonConvert.SerializeObject(resultObject), Source = intentString };
                                }
                            }

                            //var resultObject = new
                            //{
                            //    reply = replyObject,
                            //    parentId = parameters.ParentId,
                            //    greeting = false,
                            //    note = VirtuosoCopilotConstants.ConfidentialMessage,
                            //    intent = "dbcopilot"
                            //};
                            //ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "PostQuestionToDbCopilot"));

                            //return new ResponseDto() { ConversationId = parameters.ConversationId, Question = parameters.Question, ResponseType = ResponseType.htmltable.ToString(), Data = JsonConvert.SerializeObject(resultObject) ,Source=intentString};

                            //return JsonConvert.SerializeObject(resultObject);
                        }
                    }
                    if (Convert.ToString(intentResponseFormat).ToLower().Contains("image"))
                    {
                        //responseDto.ResponseType = ResponseType.image.ToString();
                        if (cptresponse != null && cptresponse?["graphData"] != null)
                        {
                            responseDto.ResponseType = ResponseType.graph.ToString();
                        }
                        //return JsonConvert.SerializeObject(resultObject);
                    }
                    if (Convert.ToString(intentResponseFormat).ToLower().Contains("markdown"))
                    {
                        JObject jsonObject = JObject.Parse(copilotResponse);
                        /*
                        if (jsonObject["reply"] != null && jsonObject["reply"].ToString().ToLower().Contains("markdown"))
                        {
                            //JObject replyObject = (JObject)jsonObject["reply"];
                            //JArray columnsArray = (JArray)replyObject["columns"];
                            var replyObject= jsonObject["reply"];
                            var resultObject = new
                            {
                                reply = replyObject,
                                parentId = parameters.ParentId,
                                greeting = false,
                                note = VirtuosoCopilotConstants.ConfidentialMessage,
                                intent = "dbcopilot"
                            };
                            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultObject), "CopilotBotService", "PostQuestionToDbCopilot"));

                            return new ResponseDto() { ConversationId = parameters.ConversationId, Question = parameters.Question, ResponseType = ResponseType.markdown.ToString(), Data = JsonConvert.SerializeObject(resultObject) ,Source=intentString};

                            //return JsonConvert.SerializeObject(resultObject);
                        }
                        */
                        if (jsonObject["reply"] != null && CheckMarkdown(jsonObject))
                        {
                            var replyObject = jsonObject["reply"];
                            var resultObject = new
                            {
                                reply = replyObject,
                                parentId = parameters.ParentId,
                                greeting = false,
                                note = VirtuosoCopilotConstants.ConfidentialMessage,
                                intent = "dbcopilot"
                            };
                            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(jsonObject), "CopilotBotService", "PostQuestionToDbCopilot"));

                            return new ResponseDto() { ConversationId = parameters.ConversationId, Question = parameters.Question, ResponseType = ResponseType.markdown.ToString(), Data = JsonConvert.SerializeObject(resultObject), Source = intentString };
                        }
                    }
                    if (Convert.ToString(intentResponseFormat).ToLower().Contains("graph"))
                    {
                        if (cptresponse != null && cptresponse?["graphData"] != null)
                        {
                            responseDto.ResponseType = ResponseType.graph.ToString();
                        }
                    }
                    bool aiflag = true;
                    var airesponseflag = configuration[VirtuosoCopilotConstants.AiFlag];
                    if (bool.TryParse(airesponseflag, out bool boolValue))
                    {
                        aiflag = boolValue;
                    }

                    if ((bool)cptresponse?["IsValidAnswer"] && aiflag)
                    {
                        var replyObject = cptresponse?[ReplyGlobal]?["data"] ?? string.Empty;
                        var airesponsevalue = await this.aIResponseGeneratorService.ProcessDataWithGptEngine(rephrasedQuestion, replyObject.ToString(), parameters).ConfigureAwait(false);
                        var resultData = new
                        {
                            aiResponseData = airesponsevalue,
                            note = VirtuosoCopilotConstants.ConfidentialMessage,
                            intent = "dbcopilot"
                        };
                        if (debugMode)
                        {
                            var resultData_ = new
                            {
                                aiResponseData = airesponsevalue,
                                query = cptresponse?["query"] ?? string.Empty,
                                note = VirtuosoCopilotConstants.ConfidentialMessage,
                                intent = "dbcopilot"
                            };
                            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultData_), "CopilotBotService", "SendQuestionToCopilotBot"));
                            responseDto.Data = JsonConvert.SerializeObject(resultData_);
                            return responseDto;
                            //return JsonConvert.SerializeObject(resultData_);
                        }
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(resultData), "CopilotBotService", "SendQuestionToCopilotBot"));
                        responseDto.Data = JsonConvert.SerializeObject(resultData);
                        return responseDto;
                        //return JsonConvert.SerializeObject(resultData);
                    }
                    responseDto.Data = JsonConvert.SerializeObject(copilotResponse);
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(copilotResponse), "CopilotBotService", "SendQuestionToCopilotBot"));
                    return responseDto;
                    //return copilotResponse;
                }
            }
            catch (Exception ex)
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "SendQuestionToCopilotBot", $"Exception CopilotBotService {ex.ToString()}"));
                ApplicationLogHelper.LogError(ex, "CopilotBotService SendQuestionToCopilotBot Exception");
                throw;
            }
        }

        public bool IsJsonValid(string jsonData)
        {
            // Path to your JSON schema file
            string schemaFilePath = @"Schema\table-schema-dbcopilot.json";
            // Read the contents of the JSON schema file
            string schemaJson = File.ReadAllText(schemaFilePath);

            // Parse the JSON schema into a JSchema object
            JSchema jsonSchema = JSchema.Parse(schemaJson);

            //    // Load the schema from the file
            //    JSchema schema = SchemaValidator.LoadSchemaFromFile(schemaFilePath);
            //    string schema = @"
            //{
            //    ""$schema"": ""http://json-schema.org/draft-07/schema#"",
            //    ""type"": ""object"",
            //    ""properties"": {
            //        ""columns"": {
            //            ""type"": ""array"",
            //            ""items"": {
            //                ""type"": ""string""
            //            }
            //        },
            //        ""column_types"": {
            //            ""type"": ""array"",
            //            ""items"": {
            //                ""type"": ""string"",
            //                ""enum"": [""int"", ""str""]
            //            }
            //        },
            //        ""data"": {
            //            ""type"": ""array"",
            //            ""items"": {
            //                ""type"": ""array"",
            //                ""items"": {
            //                    ""oneOf"": [
            //                        {""type"": ""integer""},
            //                        {""type"": ""string""}
            //                    ]
            //                }
            //            }
            //        },
            //        ""caption"": {
            //            ""type"": [""string"", ""null""]
            //        }
            //    },
            //    ""required"": [""columns"", ""column_types"", ""data""]
            //}";

            //    JSchema jsonSchema = JSchema.Parse(schema);
            JObject jsonObject = JObject.Parse(jsonData);

            return jsonObject.IsValid(jsonSchema);
        }

        //[ExcludeFromCodeCoverage]
        ///// <summary>
        ///// GetAutoSuggestionsFromCopilotBot
        ///// </summary>
        ///// <param name="rephrasedQuestion">Rephrased question</param>
        ///// <param name="parameters">All Parametes of bot. </param>
        ///// <returns>Return Send Auto suggestions Question To Copilot Bot </returns>
        //private async Task<List<string>> GetAutoSuggestionsFromCopilotBot(string rephrasedQuestion, BotQuestionParams parameters)
        //{
        //    try
        //    {
        //        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot"));
        //        var requestUrl = configuration[VirtuosoCopilotConstants.CopilotDbAutoSuggestionEndpoint];

        //        ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot",
        //               $"CopilotDbAutoSuggestionEndpoint: {requestUrl}"));
        //        using (var client = new HttpClient())
        //        {
        //            var appKey = configuration[VirtuosoCopilotConstants.CopilotDbAutoSuggestionBotApikvr];
        //            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", appKey);
        //            var questionjson = new
        //            {
        //                question = rephrasedQuestion
        //            };
        //            var inputJson = JsonConvert.SerializeObject(questionjson);
        //            var content = new StringContent(inputJson, Encoding.UTF8, "application/json");
        //            content.Headers.Add("azureml-model-deployment", "virtuoso-autosugg-buddy-dep");
        //            content.Headers.Add("session-id", parameters.SessionId);
        //            HttpResponseMessage response = new HttpResponseMessage();
        //            try
        //            {
        //                response = await client.PostAsync(new Uri(requestUrl), content).ConfigureAwait(false);
        //            }
        //            catch (Exception exc)
        //            {
        //                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot", $"DBCopilot Exception CopilotBotService {exc.ToString()}"));
        //                ApplicationLogHelper.LogError(exc, $"CopilotBotService DBCopilot Exception");
        //                throw;
        //            }

        //            if (!response.IsSuccessStatusCode)
        //            {
        //                var errorContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, errorContent, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot"));
        //                Exception exception = new Exception(errorContent);
        //                throw exception;
        //            }

        //            var responseBody = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

        //            ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, responseBody, "CopilotBotService", "GetAutoSuggestionsFromDbCopilot"));

        //            // Deserialize JSON string into JObject
        //            JObject jsonObject = JObject.Parse(responseBody);

        //            // Extract values of "matching_result" property

        //            return jsonObject["results"]
        //            .Select(result => result["matching_result"].ToString())
        //            .ToList();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot", $"Exception CopilotBotService {ex.ToString()}"));
        //        ApplicationLogHelper.LogError(ex, "CopilotBotService GetAutoSuggestionsFromCopilotBot Exception");
        //        throw;
        //    }
        //}

        [ExcludeFromCodeCoverage]
        /// <summary>
        /// GetAutoSuggestionsFromCopilotBot
        /// </summary>
        /// <param name="rephrasedQuestion">Rephrased question</param>
        /// <param name="parameters">All Parametes of bot. </param>
        /// <returns>Return Send Auto suggestions Question To Copilot Bot </returns>
        private async Task<List<string>> GetAutoSuggestionsFromCopilotBot(AutoSuggestionParams parameters)
        {
            try
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggestStart(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot"));
                //Read additional data from request
                //var additionalParams = httpContextAccessor.HttpContext.Request.Headers["AdditionalParams"].ToString();

                // Example string containing multiple values of Feature, Role, and Tags
                //string additionalParams = "Feature=feature1,feature2,feature3&Role=role1,role2&Tags=#tag1,#tag2,#tag3";
                string? additionalParams = parameters.AdditionalParams;
                List<string> featuresList = new List<string>();
                List<string> rolesList = new List<string>();
                List<string> tagsList = new List<string>();
                if (!string.IsNullOrEmpty(additionalParams))
                {
                    // Parse the additionalParams string
                    var (features, roles, tags) = ParseAdditionalParams(additionalParams);
                    featuresList = features;
                    rolesList = roles;
                    tagsList = tags;
                }

                StringBuilder filterStringBuilder = new StringBuilder();
                if (featuresList != null && featuresList.Count > 0)
                {
                    foreach (var feature in featuresList)
                    {
                        filterStringBuilder.Append($"feature/any(feature: feature eq '{feature}')");
                        filterStringBuilder.Append(" or ");
                    }
                }
                if (rolesList != null && rolesList.Count > 0)
                {
                    foreach (var role in rolesList)
                    {
                        filterStringBuilder.Append($"role/any(role: role eq '{role}')");
                        filterStringBuilder.Append(" or ");
                    }
                }
                if (tagsList != null && tagsList.Count > 0)
                {
                    foreach (var tag in tagsList)
                    {
                        filterStringBuilder.Append($"tags/any(tags: tags eq '{tag}')");
                        filterStringBuilder.Append(" or ");
                    }
                }

                string? filterString = filterStringBuilder.ToString();
                if (filterString != null && filterString.EndsWith(" or "))
                {
                    // Remove " or " from the end of the string
                    filterString = filterString.Substring(0, filterString.Length - 4);
                }
                string requestUrl = string.Empty;
                //bool.TryParse(configuration?["CopilotDbAutoSuggestion_FilterEnabled"]?.ToString(), out bool isCopilotDbAutoSuggestionFilterEnabled);
                //if (isCopilotDbAutoSuggestionFilterEnabled)
                //{
                requestUrl = configuration[VirtuosoCopilotConstants.CopilotDbAutoSuggestionEndpointWithFilter];
                //}
                //else
                //{
                //    requestUrl = configuration[VirtuosoCopilotConstants.CopilotDbAutoSuggestionEndpointWithoutFilter];
                //}

                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggest(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot", $"CopilotDbAutoSuggestionEndpoint: {requestUrl}"));
                using (var client = new HttpClient())
                {
                    var appKey = configuration[VirtuosoCopilotConstants.CopilotDbAutoSuggestionAISearchBotApikvr];
                    string inputJson = string.Empty;
                    //if (isCopilotDbAutoSuggestionFilterEnabled)
                    //{
                    var input = new
                    {
                        search = parameters.SearchString,
                        top = parameters.NumberOfRecords,
                        fuzzy = "true",
                        suggesterName = "sgwithtags",
                        filter = filterString

                    };
                    inputJson = JsonConvert.SerializeObject(input);
                    //}
                    //else
                    //{
                    //    var input = new
                    //    {
                    //        search = parameters.SearchString,
                    //        top = parameters.NumberOfRecords,
                    //        fuzzy = "true",
                    //        suggesterName = "autocompletesugg"
                    //    };
                    //    inputJson = JsonConvert.SerializeObject(input);
                    //}
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggest(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot", $"CopilotDbAutoSuggestion Input: {inputJson}"));
                    var content = new StringContent(inputJson, Encoding.UTF8, "application/json");
                    content.Headers.Add("api-key", appKey);
                    HttpResponseMessage response = new HttpResponseMessage();
                    try
                    {
                        response = await client.PostAsync(new Uri(requestUrl), content).ConfigureAwait(false);
                    }
                    catch (Exception exc)
                    {
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggest(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot", $"DBCopilot Exception CopilotBotService {exc.ToString()}"));
                        ApplicationLogHelper.LogError(exc, $"CopilotBotService DBCopilot Exception");
                        throw;
                    }

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggestEnd(parameters, errorContent, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot"));
                        Exception exception = new Exception(errorContent);
                        throw exception;
                    }

                    var responseBody = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggest(parameters, responseBody, "CopilotBotService", $"GetAutoSuggestionsFromDbCopilot response: {responseBody} "));

                    // Deserialize JSON string into JObject
                    JObject jsonObject = JObject.Parse(responseBody);

                    return jsonObject["value"]
                   .Select(result => result["@search.text"].ToString())
                   .ToList();

                }
            }
            catch (Exception ex)
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsAutoSuggest(parameters, "CopilotBotService", "GetAutoSuggestionsFromCopilotBot", $"Exception CopilotBotService {ex.ToString()}"));
                ApplicationLogHelper.LogError(ex, "CopilotBotService GetAutoSuggestionsFromCopilotBot Exception");
                throw;
            }
        }

        static (List<string>, List<string>, List<string>) ParseAdditionalParams(string additionalParams)
        {
            // Initialize lists to store parsed parameters
            List<string> features = new List<string>();
            List<string> roles = new List<string>();
            List<string> tags = new List<string>();

            // Split the additionalParams string based on '&' to separate individual parameters
            string[] paramPairs = additionalParams.Split('&');

            // Process each parameter pair
            foreach (string pair in paramPairs)
            {
                // Split each parameter pair based on '=' to separate parameter name and values
                string[] keyValue = pair.Split('=');
                string paramName = keyValue[0]; // Parameter name
                string paramValueStr = keyValue[1]; // Parameter values as a string

                // Split the parameter values based on ',' to separate individual values
                string[] paramValues = paramValueStr.Split(',');

                // Add parameter values to the corresponding list
                switch (paramName)
                {
                    case "Feature":
                        features.AddRange(paramValues);
                        break;
                    case "Role":
                        roles.AddRange(paramValues);
                        break;
                    case "Tags":
                        tags.AddRange(paramValues);
                        break;
                    default:
                        break;
                }
            }

            return (features, roles, tags);
        }
    }
}
