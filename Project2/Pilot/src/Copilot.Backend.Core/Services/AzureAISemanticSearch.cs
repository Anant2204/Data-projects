using Copilot.Backend.Core.DTO;
using Copilot.Backend.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.KernelMemory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.KernelMemory.Citation;
using static Microsoft.KernelMemory.DataFormats.WebPages.WebScraper;

namespace Copilot.Backend.Core.Services
{
    public class AzureAISemanticSearch : IAzureAISemantiSearch
    {
        /// <summary>
        /// The application configuration
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// The kernel memory 
        /// </summary>
        private readonly IKernelMemory memory;

        /// <summary>
        /// The application Logging
        /// </summary>
        private readonly IApplicationLogging applicationLogging;

        public AzureAISemanticSearch(IConfiguration configuration, IEnumerable<IKernelMemory> kernelMemories, IApplicationLogging applicationLogging)
        {
            // Assuming the first registered service is the default one
            this.memory = kernelMemories.First();

            this.configuration = configuration;
            this.applicationLogging = applicationLogging;
        }


        /// <summary>
        /// The function for response
        /// </summary>
        /// <param name="question">The question</param>
        /// <param name="parentId">The parent Id of previous conversation.</param>
        /// <returns>cloud response</returns>
        public List<SuggestedQuestion> GetSimilarQuestions(AutoSuggestionParams parameters)
        {
            var prompt = "Get most semantically related questions to the following user query. " +
                "\n UserQuery: " + parameters.SearchString;

            var filters = new List<MemoryFilter>();
            if (!string.IsNullOrEmpty(parameters.AdditionalParams))
            {
                var (features, roles, tags, sourceSystem) = Helpers.Helpers.ParseAdditionalParams(parameters.AdditionalParams);
                features.ForEach(x => filters.Add(new MemoryFilter().ByTag("feature", x)));
                roles.ForEach(x => filters.Add(new MemoryFilter().ByTag("roles", x)));
                tags.ForEach(x => filters.Add(new MemoryFilter().ByTag("tags", x)));
                sourceSystem.ForEach(x => filters.Add(new MemoryFilter().ByTag("sourceSystem", x)));
            }

            //var (features, roles, tags, sourceSystem) = Helpers.Helpers.ParseAdditionalParams(parameters.AdditionalParams);
            //var filters = new List<MemoryFilter>();

            //features.ForEach( x => filters.Add(new MemoryFilter().ByTag( "feature", x)));
            //roles.ForEach(x => filters.Add(new MemoryFilter().ByTag( "roles", x )));
            //tags.ForEach(x => filters.Add(new MemoryFilter().ByTag( "tags", x )));
            //sourceSystem.ForEach(x => filters.Add(new MemoryFilter().ByTag("sourceSystem", x )));
            

            int limit = 5;
            if (!string.IsNullOrEmpty(parameters.NumberOfRecords))
            { 
                int.TryParse(parameters.NumberOfRecords, out int result);
                if(result > 0)
                {
                    limit = result;
                }
            }
            var min = Convert.ToDouble(configuration["minRelevance"]);
            var answer = memory.SearchAsync(parameters.SearchString, minRelevance: min, limit: limit, filters: filters).Result;
            var json = JsonConvert.SerializeObject(answer);
            var jsonResult = JsonConvert.DeserializeObject<AzSearchAutoSuggestModel>(json);

            List<SuggestedQuestion> suggestedQuestions = new List<SuggestedQuestion>();
           
            foreach (var item in jsonResult.Results)
            {

                suggestedQuestions.Add(new SuggestedQuestion()
                {
                    //suggestion = item.Partitions[0].Text,
                    relevence = item.Partitions[0].Relevance,
                    features = item.Partitions[0].Tags.features,
                    roles = item.Partitions[0].Tags.acronyms,
                    tags = item.Partitions[0].Tags.sdmtags,
                    SourceSystem = item.Partitions[0].Tags.SourceSystem,
                    suggestion = item.Partitions[0].Tags.question?.FirstOrDefault().ToString()
                });
            }


            return suggestedQuestions;
        }

        public List<SuggestedQuestion> GetSimilarQuestionsFromKnowledge(AutoSuggestionParams parameters)
        {
            var prompt = "Get similar questions matching user question. Also provide all the tags and its values at the last as a simple json list \n UserQuestion" + parameters.SearchString;

            var min = Convert.ToDouble(configuration["minRelevance"]);
            var answer = memory.SearchAsync(parameters.SearchString, minRelevance: min, limit: 5).Result;
            var json = JsonConvert.SerializeObject(answer);
            var jsonResult = JsonConvert.DeserializeObject<AzSearchAutoSuggestModel>(json);

            List<SuggestedQuestion> suggestedQuestions = new List<SuggestedQuestion>();

            foreach (var item in jsonResult.Results)
            {
                suggestedQuestions.Add(new SuggestedQuestion()
                {
                    suggestion = item.Partitions[0].Text,
                    features = item.Partitions[0].Tags.features,
                    roles = item.Partitions[0].Tags.acronyms,
                    tags = item.Partitions[0].Tags.sdmtags
                });
            }
            return suggestedQuestions;
        }
    }
}

