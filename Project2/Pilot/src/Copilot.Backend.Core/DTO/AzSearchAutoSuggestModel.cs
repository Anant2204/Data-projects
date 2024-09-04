using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Copilot.Backend.Core.DTO
{
    public class AzSearchAutoSuggestModel
    {
        public string Query { get; set; }
        public bool NoResult { get; set; }
        public List<Result> Results { get; set; }
    }

    public class Result
    {
        public string Link { get; set; }
        public string Index { get; set; }
        public string DocumentId { get; set; }
        public string FileId { get; set; }
        public string SourceContentType { get; set; }
        public string SourceName { get; set; }
        public object SourceUrl { get; set; }
        public List<Partition> Partitions { get; set; }

        
    }



}
