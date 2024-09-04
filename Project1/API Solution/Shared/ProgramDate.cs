// <copyright file="ProgramDate.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.ComponentModel.DataAnnotations;
    using System.Globalization;

    /// <summary>
    /// The program date format.
    /// </summary>
    /// <param name="Month">The Month number.</param>
    /// <param name="Year">The Year.</param>
#pragma warning disable SA1313 // Parameter names should begin with lower-case letter
    public record ProgramDate([Range(1, 12)] int Month, [Range(2000, 2050)] int Year)
#pragma warning restore SA1313 // Parameter names should begin with lower-case letter
    {
        /// <inheritdoc/>
        public override string ToString() => $"{CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(this.Month)}/{this.Year}";

        /// <summary>
        /// Converts the record to its equivalent datetime format.
        /// </summary>
        /// <param name="start"><c>true</c> if start of month to be considered. Use <c>false</c> to return end of month.</param>
        /// <returns>Start or End of month based on the <paramref name="start"/>.</returns>
        public DateTime ToDateTime(bool start) => new(this.Year, this.Month, start ? 1 : DateTime.DaysInMonth(this.Year, this.Month));
    }
}
