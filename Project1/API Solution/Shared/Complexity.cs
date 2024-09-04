// <copyright file="Complexity.cs" company="Microsoft Corporation">
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
    /// The Complexity.
    /// </summary>
    [DataContract]
    public class Complexity
    {
        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        [DataMember(Name = "type")]
        public ComplexityTypesEnum? Type { get; set; }

        /// <summary>
        /// Gets or sets the no Of Units.
        /// </summary>
        [DataMember(Name = "noOfUnits")]
        public int? NoOfUnits { get; set; }

        /// <summary>
        /// Gets or sets the Monthly Acr Per Unit.
        /// </summary>
        [DataMember(Name = "monthlyAcrPerUnit")]
        public double? MonthlyAcrPerUnit { get; set; }

        /// <summary>
        /// Gets or sets the Split percentage.
        /// </summary>
        [JsonProperty("split%")]
        [DataMember(Name = "split")]
        public double? Split { get; set; }

        /// <summary>
        /// Gets or sets the Default No Of Unit.
        /// </summary>
        [DataMember(Name = "defaultNoOfUnit")]
        public int? DefaultNoOfUnit { get; set; }

        /// <summary>
        /// Gets or sets the Default Monthly Acr Per Unit.
        /// </summary>
        [DataMember(Name = "defaultMonthlyAcrPerUnit")]
        public double? DefaultMonthlyAcrPerUnit { get; set; }
    }
}
