// <copyright file="AssignmentScaleEnum.cs" company="Microsoft Corporation">
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
    /// Gets or Sets AssignmentScale.
    /// </summary>
    [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum AssignmentScaleEnum
    {
        /// <summary>
        /// Enum WeekEnum for Week
        /// </summary>
        [EnumMember(Value = "Week")]
        WeekEnum = 0,

        /// <summary>
        /// Enum MonthEnum for Month
        /// </summary>
        [EnumMember(Value = "Month")]
        MonthEnum = 1,

        /// <summary>
        /// Enum QuarterEnum for Quarter
        /// </summary>
        [EnumMember(Value = "Quarter")]
        QuarterEnum = 2,

        /// <summary>
        /// Enum YearEnum for Year
        /// </summary>
        [EnumMember(Value = "Year")]
        YearEnum = 3,
    }
}
