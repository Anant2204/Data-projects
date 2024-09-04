// <copyright file="Allocation.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;
    using System.Text.Json.Serialization;

    /// <summary>
    /// The Allocation type.
    /// </summary>
    [DataContract]
    public partial class Allocation
    {
        /// <summary>
        /// Gets or Sets Period.
        /// </summary>
        [DataMember(Name = "period")]
        public int Period { get; set; }

        /// <summary>
        /// Gets or Sets Units.
        /// </summary>
        [DataMember(Name = "units")]
        public long Units { get; set; }

        /// <summary>
        /// Gets or Sets ACR.
        /// </summary>
        [DataMember(Name = "acr")]
        [JsonPropertyName("acr")]
        public double ACR { get; set; } = 0;

        /// <summary>
        /// Finds duplicate object by comparing properties.
        /// </summary>
        /// <param name="cloneAllocation">The duplicate object.</param>
        /// <returns>Returns true of duplicate is found.</returns>
        internal bool IsDuplicate(Allocation cloneAllocation)
        {
            if (cloneAllocation == null)
            {
                return false;
            }

            if (this.Period != cloneAllocation.Period)
            {
                return false;
            }

            if (this.Units != cloneAllocation.Units)
            {
                return false;
            }

            if (Math.Abs(this.ACR - cloneAllocation.ACR) > Constants.Margin)
            {
                return false;
            }

            return true;
        }
    }
}
