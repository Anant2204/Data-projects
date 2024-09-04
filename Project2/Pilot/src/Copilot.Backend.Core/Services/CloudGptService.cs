//-----------------------------------------------------------------------
// <copyright file="CloudGptService.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------



namespace Copilot.Backend.Core.Services
{
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json;
    using System.Text;
    using System.Threading.Tasks;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Shared.Helpers;
    using Copilot.Backend.Logger.Core;
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Constants;

    /// <summary>
    /// Intent Finder Service
    /// </summary>
    /// <seealso cref="Copilot.Backend.Core.Interfaces.ICloudGptService" />
    public class CloudGptService : ICloudGptService
    {
        /// <summary>
        /// The application configuration
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// The application Logging
        /// </summary>
        private readonly IApplicationLogging applicationLogging;

        /// <summary>
        /// Initializes a new instance of the <see cref="CloudGptService"/> class.
        /// </summary>
        /// <param name="logger"></param>
        public CloudGptService(IConfiguration configuration, IApplicationLogging applicationLogging)
        {
            this.configuration = configuration;
            this.applicationLogging = applicationLogging;
        }

        /// <summary>
        /// The function for response
        /// </summary>
        /// <param name="question">The question</param>
        /// <param name="parentId">The parent Id of previous conversation.</param>
        /// <returns>cloud response</returns>
        //public async Task<string> GetResponseFromCloudGPT(string question, BotQuestionParams parameters)
        //{
        //    try
        //    {
        //        ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CloudGptService", "RephaseCloudGptResponse"));
        //        if (parameters == null || question == null)
        //        {
        //            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, default, "CloudGptService", "RephaseCloudGptResponses"));
        //            return default;
        //        }

        //        var rephrasedQuestion = question;
        //        var parentID = parameters.ParentId;
        //        var resultJson = new
        //        {
        //            question = rephrasedQuestion,
        //            parentId = parentID
        //        };
        //        var inputQuery = JsonConvert.SerializeObject(resultJson);
        //        using (var client = new HttpClient())
        //        {
        //            string? requestUrl = configuration[VirtuosoCopilotConstants.CloudGptEndpoint];
        //            string? appKey = configuration[VirtuosoCopilotConstants.CopilotDbCloudGptkvr];

        //            ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CloudGptService", "RephaseCloudGptResponse",
        //            $"CloudGptEndpoint: {requestUrl}"));

        //            client.DefaultRequestHeaders.Add("api-key", appKey);
        //            var content = new StringContent(inputQuery, Encoding.UTF8, "application/json");
        //            HttpResponseMessage response = new HttpResponseMessage();
        //            try
        //            {
        //                response = await client.PostAsync(new Uri(requestUrl), content).ConfigureAwait(false);
        //            }
        //            catch (Exception exc)
        //            {
        //                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CloudGptService", "RephaseCloudGptResponse", $"CloudGPT Exception CloudGptService {exc.ToString()}"));
        //                ApplicationLogHelper.LogError(exc, $"CloudGptService CloudGPT Exception");
        //                throw;
        //            }


        //            if (!response.IsSuccessStatusCode)
        //            {
        //                var errorContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, errorContent, "CloudGptService", "RephaseCloudGptResponse"));
        //                Exception exception = new Exception(errorContent);
        //                throw exception;
        //            }

        //            var responseBody = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //            var responseArray = JsonConvert.DeserializeObject<JToken>(responseBody);
        //            var result = new
        //            {
        //                reply = responseArray["reply"]?.ToString(),
        //                id = responseArray["id"]?.ToString(),
        //                messages = responseArray["messages"]?.ToString(),
        //                conversationId = responseArray["conversationId"]?.ToString(),
        //                docs = responseArray["docs"]?.ToString(),
        //                parentId = responseArray["conversationId"]?.ToString()
        //            };
        //            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(result), "CloudGptService", "RephaseCloudGptResponse"));
        //            return JsonConvert.SerializeObject(result);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CloudGptService", "RephaseCloudGptResponse", $"Exception CloudGptService {ex.ToString()}"));
        //        ApplicationLogHelper.LogError(ex, "CloudGptService Exception");
        //        throw;
        //    }
        //}

        public async Task<string> GetResponseFromCloudGPT(string question, BotQuestionParams parameters)
        {
            const int maxRetryAttempts = 3;
            const int delayBetweenRetriesInSeconds = 30;

            try
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsStart(parameters, "CloudGptService", "RephaseCloudGptResponse"));
                if (parameters == null || question == null)
                {
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, default, "CloudGptService", "RephaseCloudGptResponses"));
                    return default;
                }

                var rephrasedQuestion = question;
                var parentID = parameters.ParentId;
                var resultJson = new
                {
                    question = rephrasedQuestion,
                    parentId = parentID
                };
                var inputQuery = JsonConvert.SerializeObject(resultJson);
                using (var client = new HttpClient())
                {
                    string? requestUrl = configuration[VirtuosoCopilotConstants.CloudGptEndpoint];
                    string? appKey = configuration[VirtuosoCopilotConstants.CopilotDbCloudGptkvr];

                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CloudGptService", "RephaseCloudGptResponse",
                    $"CloudGptEndpoint: {requestUrl}"));

                    client.DefaultRequestHeaders.Add("api-key", appKey);
                    var content = new StringContent(inputQuery, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = new HttpResponseMessage();

                    for (int retry = 0; retry < maxRetryAttempts; retry++)
                    {
                        try
                        {
                            response = await client.PostAsync(new Uri(requestUrl), content).ConfigureAwait(false);

                            if (response.IsSuccessStatusCode)
                            {
                                break;
                            }
                            else if ((int)response.StatusCode == 429 && retry < maxRetryAttempts - 1)
                            {
                                // Wait to retry
                                await Task.Delay(TimeSpan.FromSeconds(delayBetweenRetriesInSeconds));
                                continue;
                            }
                            else
                            {
                                var errorContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                                ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, errorContent, "CloudGptService", "RephaseCloudGptResponse"));
                                Exception exception = new Exception(errorContent);
                                throw exception;
                            }
                        }
                        catch (Exception exc)
                        {
                            ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CloudGptService", "RephaseCloudGptResponse", $"CloudGPT Exception CloudGptService {exc.ToString()}"));
                            ApplicationLogHelper.LogError(exc, $"CloudGptService CloudGPT Exception");
                            throw;
                        }
                    }

                    var responseBody = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var responseArray = JsonConvert.DeserializeObject<JToken>(responseBody);
                    var result = new
                    {
                        reply = responseArray["reply"]?.ToString(),
                        id = responseArray["id"]?.ToString(),
                        messages = responseArray["messages"]?.ToString(),
                        conversationId = responseArray["conversationId"]?.ToString(),
                        docs = responseArray["docs"]?.ToString(),
                        parentId = responseArray["conversationId"]?.ToString()
                    };
                    ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, JsonConvert.SerializeObject(result), "CloudGptService", "RephaseCloudGptResponse"));
                    return JsonConvert.SerializeObject(result);
                }
            }
            catch (Exception ex)
            {
                ApplicationLogHelper.LogInformation(applicationLogging.LogDetails(parameters, "CloudGptService", "RephaseCloudGptResponse", $"Exception CloudGptService {ex.ToString()}"));
                ApplicationLogHelper.LogError(ex, "CloudGptService Exception");
                throw;
            }
        }
    }
}
