namespace Copilot.Backend.Core.Services
{
    using Copilot.Backend.Core.DTO;
    using Copilot.Backend.Core.Interfaces;
    using Copilot.Backend.Logger.Core;
    using Microsoft.Extensions.Configuration;
    using Microsoft.KernelMemory;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class CloudGptAISearchService : ICloudGptAISearchService
    {
        /// <summary>
        /// The application configuration
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// The kernel memory 
        /// </summary>
        private readonly IKernelMemory memory;

        // <summary>
        /// The application Logging
        /// </summary>
        private readonly IApplicationLogging applicationLogging;

        /// <summary>
        /// Initializes a new instance of the <see cref="CloudGptAISearchService"/> class.
        /// </summary>
        /// <param name="logger"></param>
        public CloudGptAISearchService(IConfiguration configuration, IEnumerable<IKernelMemory> kernelMemories, IApplicationLogging applicationLogging)
        {
            this.configuration = configuration;
            this.memory = kernelMemories.Last();
            this.applicationLogging = applicationLogging;
        }

        /// <summary>
        /// The function for response
        /// </summary>
        /// <param name="question">The question</param>
        /// <param name="parentId">The parent Id of previous conversation.</param>
        /// <returns>cloud response</returns>
        public async Task<string> GetResponseFromCloudGPT(string question, BotQuestionParams parameters)
        {
            var prompt = "I’m a chat bot that can answer questions based on a document. You can ask me anything related to the document, and I’ll try to find the answer for you while limiting my responses to the provided documents.\r\n-You have to answer from the given text only, do not use your pretrained knowledge.\r\n- Do not return training document link or source link in response.\r\n- You will reformat all URLs in your response before replying, for example convert this url https://aka.ms/virtuoso to [Virtuoso](https://aka.ms/virtuoso)\r\n-If you cannot give a confident answer based on the provided documents for specific question, please choose only one of the following responses to reply:\r\n1. \"It looks like we’re not on the right track to find the correct answer, or maybe there isn’t one. To help you better, could you please give more details or ask your question differently? If you want to start over, please click on the Start Over button. Your help is important, and I’m ready to assist you. Thank you.\"\r\n2. \"I’m sorry, I don’t understand your question. Can you please provide more context or details? It will help me to give you a better answer. If you want to start over, please click on the Start Over button. Thank you for your patience and understanding.\"\r\n\r\n\r\n  - It generates <|EOS|> when reply finishes.\r\n Please read the following document and the conversations then reply to the user as if you are the assistant.Please generate <|EOS|> when answer finishes. Answer:" + question;

            var min = Convert.ToDouble(configuration["minRelevance"]);
            var answer = memory.AskAsync(prompt, minRelevance: min).Result;
            var json = JsonConvert.SerializeObject(answer);
            var jsonResult = JsonConvert.DeserializeObject<CopilotResultModel>(json);

            var responseArray = new
            {
                reply = jsonResult.Result,
                relevantsources = jsonResult.RelevantSources?.ToArray()
                //conversationId =  parameters.ConversationId,
                //question =  question,
                //responseType =  "text",
                //Source =  "Azure Search ",
                //data  = new
                //{
                //    reply = jsonResult.Result,
                //    relevantsources = jsonResult.RelevantSources?.ToArray()
                //}
            };

            var aiSearchResponse = JsonConvert.SerializeObject(responseArray);
            ApplicationLogHelper.LogInformation(applicationLogging.LogDetailsEnd(parameters, aiSearchResponse, "CloudGptAISearchService", "GetResponseFromCloudGPT"));

            return aiSearchResponse; 
        }
    }
}