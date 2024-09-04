// <copyright file="EcifPoDetails.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Newtonsoft.Json;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class SqlResponseEcifPoDetails
    {
        [JsonProperty("sqlresponse")]
        public IEnumerable<EcifPoDetails> EcifPoDetails { get; set; }
    }

    public class EcifPoDetails
    {
        [JsonProperty("PONumber")]
        public string PONumber { get; set; }

        [JsonProperty("StatusCode")]
        public string StatusCode { get; set; }

        [JsonProperty("POSubmittedDate")]
        public string POSubmittedDate { get; set; }

        [JsonProperty("POApprovedDate")]
        public string POApprovedDate { get; set; }
    }

    public class EcifPoDetailsResponse
    {
        [JsonProperty("PO Number")]
        public string PONumber { get; set; }

        [JsonProperty("Status Code")]
        public string StatusCode { get; set; }

        [JsonProperty("PO Submitted Date")]
        public string POSubmittedDate { get; set; }

        [JsonProperty("PO Approved Date")]
        public string POApprovedDate { get; set; }
    }
}