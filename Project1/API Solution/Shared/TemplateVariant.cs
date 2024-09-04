// <copyright file="TemplateVariant.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;
    using Newtonsoft.Json;

    /// <summary>
    /// The template variant entity.
    /// </summary>
    public class TemplateVariant
    {
        /// <summary>
        /// Gets or Sets Template Id.
        /// </summary>
        [DataMember(Name = "scenarioTemplateId")]
        public string? ScenarioTemplateId { get; set; }

        /// <summary>
        /// Gets or Sets the variant type.
        /// </summary>
        [DataMember(Name = "variant")]
        public string? Variant { get; set; }

        /// <summary>
        /// Gets or Sets the variant description.
        /// </summary>
        [DataMember(Name = "description")]
        public string? Description { get; set; }

        /// <summary>
        /// Gets or Sets the estimated ACR.
        /// </summary>
        [JsonProperty("acr")]
        [DataMember(Name = "acr")]
        public double ACR { get; set; }
    }
}
