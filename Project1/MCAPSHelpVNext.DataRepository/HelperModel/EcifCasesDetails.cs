// <copyright file="EcifCasesDetails.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Newtonsoft.Json;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class SqlResponseEcifCasesDetails
    {
        [JsonProperty("sqlresponse")]
        public IEnumerable<EcifCasesDetails> EcifCasesDetails { get; set; }
    }


    public class EcifCasesDetails
    {
        [JsonProperty("Case_x0020_Request_x0020_Id")]
        public string CaseRequestId { get; set; }

        [JsonProperty("Status")]
        public string Status { get; set; }

        [JsonProperty("Status_x0020_Detail")]
        public string StatusDetail { get; set; }

        [JsonProperty("Requester")]
        public string Requester { get; set; }

        [JsonProperty("Delivery_x0020_Start_x0020_Date")]
        public string DeliveryStartDate { get; set; }

        [JsonProperty("Delivery_x0020_End_x0020_Date")]
        public string DeliveryEndDate { get; set; }
    }

    public class EcifCasesDetailsResponse
    {
        [JsonProperty("Case Status")]
        public string Status { get; set; }

        [JsonProperty("Status Detail")]
        public string StatusDetail { get; set; }

        [JsonProperty("Requester")]
        public string Requester { get; set; }

        [JsonProperty("Delivery Start Date")]
        public string DeliveryStartDate { get; set; }

        [JsonProperty("Delivery End Date")]
        public string DeliveryEndDate { get; set; }
    }
}
