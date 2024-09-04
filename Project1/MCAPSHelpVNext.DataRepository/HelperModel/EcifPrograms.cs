// <copyright file="EcifPrograms.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Newtonsoft.Json;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class SqlResponse
    {
        [JsonProperty("sqlresponse")]
        public IEnumerable<EcifPrograms> Programs { get; set; }
    }

    public class EcifPrograms
    {
        [JsonProperty("Program_x0020_Name")]
        public string ProgramName { get; set; }

        [JsonProperty("ProgramIDtext")]
        public int ProgramId { get; set; }

        [JsonProperty("Area_x0020_Name")]
        public string AreaName { get; set; }

        [JsonProperty("Owner")]
        public string Owner { get; set; }

        [JsonProperty("Program_x0020_Type")]
        public string ProgramType { get; set; }
    }

    public class EcifProgramsResponse
    {
        [JsonProperty("Program Name")]
        public string ProgramName { get; set; }

        [JsonProperty("Type")]
        public string ProgramType { get; set; }

        [JsonProperty("Owner")]
        public string Owner { get; set; }

        [JsonProperty("Area")]
        public string AreaName { get; set; }
    }

    public class OwnerInfo
    {
        public string Name { get; set; }
        public byte[] Photo { get; set; }
    }
}
