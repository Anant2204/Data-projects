using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Copilot.Backend.Core.DTO
{
    public class CopilotResultModel
    {
        public string Question { get; set; }
        public bool NoResult { get; set; }
        public object NoResultReason { get; set; }
        public string Result { get; set; }
        public Relevantsource[] RelevantSources { get; set; }
    }

    public class Relevantsource
    {
        public string Link { get; set; }
        public string Index { get; set; }
        public string DocumentId { get; set; }
        public string FileId { get; set; }
        public string SourceContentType { get; set; }
        public string SourceName { get; set; }
        public object SourceUrl { get; set; }
        public Partition[] Partitions { get; set; }
    }

    public class Partition
    {
        public string Text { get; set; }
        public float Relevance { get; set; }
        public int PartitionNumber { get; set; }
        public int SectionNumber { get; set; }
        public DateTime LastUpdate { get; set; }
        public Tags Tags { get; set; }
   
    }

    public class Tags
    {
        public string[] __document_id { get; set; }
        public string[] __file_type { get; set; }
        public string[] __file_id { get; set; }
        public string[] __file_part { get; set; }
        public string[] __part_n { get; set; }
        public string[] __sect_n { get; set; }
        public string[] externalURl { get; set; }
        public string[] source { get; set; }
        public List<string> acronyms { get; set; }
        public List<string> sdmtags { get; set; }
        public List<string> features { get; set; }

        public List<string> SourceSystem { get; set; }
        public List<string> question { get; set; }
    }
}
