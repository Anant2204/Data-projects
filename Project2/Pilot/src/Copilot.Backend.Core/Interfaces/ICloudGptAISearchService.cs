using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Copilot.Backend.Core.Interfaces
{
    using Copilot.Backend.Core.DTO;

    public interface ICloudGptAISearchService
    {
        /// <summary>
        /// The function for response
        /// </summary>
        /// <param name="question">The question</param>
        /// <param name="parentId">The parent Id of previous conversation. </param>
        /// <returns>cloud response</returns>
        Task<string> GetResponseFromCloudGPT(string question, BotQuestionParams parameters);
    }
}
