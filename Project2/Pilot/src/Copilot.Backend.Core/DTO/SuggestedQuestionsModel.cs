using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Copilot.Backend.Core.DTO
{
    public class SuggestedQuestion
    {
        public string suggestion { get; set; }

        public double relevence { get; set; }
        public List<string> roles { get; set; }
        public List<string> tags { get; set; }
        public List<string> features { get; set; }

        public List<string> SourceSystem { get; set; }
        public List<string> question { get; set; }
    }
    
}
