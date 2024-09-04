// <copyright file="ResourcePricing.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The resource pricing type.
    /// </summary>
    [DataContract]
    public partial class ResourcePricing
    {
        /// <summary>
        /// Gets or Sets Source.
        /// </summary>
        [DataMember(Name = "source")]
        public PricingTypeEnum? Source { get; set; }

        /// <summary>
        /// Gets or Sets TierMinUnits.
        /// </summary>
        [DataMember(Name = "tierMinUnits")]
        public long? TierMinUnits { get; set; }

        /// <summary>
        /// Gets or Sets UnitMeasure.
        /// </summary>
        [DataMember(Name = "unitMeasure")]
        public string? UnitMeasure { get; set; }

        /// <summary>
        /// Gets or Sets UnitPrice.
        /// </summary>
        [DataMember(Name = "unitPrice")]
        public double UnitPrice { get; set; } = 0;

        /// <summary>
        /// Finds duplicate object by comparing properties.
        /// </summary>
        /// <param name="cloneResourcePricing">The duplicate object.</param>
        /// <returns>Returns true of duplicate is found.</returns>
        internal bool IsDuplicate(ResourcePricing cloneResourcePricing)
        {
            if (cloneResourcePricing == null)
            {
                return false;
            }

            if (this.Source != cloneResourcePricing.Source)
            {
                return false;
            }

            if (this.TierMinUnits != cloneResourcePricing.TierMinUnits)
            {
                return false;
            }

            if (this.UnitMeasure != cloneResourcePricing.UnitMeasure)
            {
                return false;
            }

            if (Math.Abs(this.UnitPrice - cloneResourcePricing.UnitPrice) > Constants.Margin)
            {
                return false;
            }

            return true;
        }
    }
}
