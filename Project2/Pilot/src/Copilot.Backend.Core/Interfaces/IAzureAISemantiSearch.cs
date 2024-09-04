using Copilot.Backend.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Copilot.Backend.Core.Interfaces
{
    public interface IAzureAISemantiSearch
    {
        List<SuggestedQuestion> GetSimilarQuestions(AutoSuggestionParams parameters);
    }
}
