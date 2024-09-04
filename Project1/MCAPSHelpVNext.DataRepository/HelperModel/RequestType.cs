using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class RequestType
    {
        public int Id { get; }
        public string RequestTypeName { get; }

        public RequestType(int id, string requestTypeName)
        {
            Id = id;
            RequestTypeName = requestTypeName;
        }
    }
}
