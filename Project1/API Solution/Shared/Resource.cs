// <copyright file="Resource.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The Resource type.
    /// </summary>
    [DataContract]
    public partial class Resource
    {
        /// <summary>
        /// Gets or Sets Id.
        /// </summary>
        [DataMember(Name = "id")]
        public string? Id { get; set; }

        /// <summary>
        /// Gets or Sets Name.
        /// </summary>
        [DataMember(Name = "name")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or Sets Location.
        /// </summary>
        [DataMember(Name = "location")]
        public string? Location { get; set; }

        /// <summary>
        /// Gets or Sets Notes.
        /// </summary>
        [DataMember(Name = "notes")]
        public string? Notes { get; set; }

        /// <summary>
        /// Gets or Sets ResourceGroup.
        /// </summary>
        [DataMember(Name = "resourceGroup")]
        public string? ResourceGroup { get; set; }

        /// <summary>
        /// Gets or Sets ServiceFamily.
        /// </summary>
        [DataMember(Name = "serviceFamily")]
        public string? ServiceFamily { get; set; }

        /// <summary>
        /// Gets or Sets Service.
        /// </summary>
        [DataMember(Name = "service")]
        public ReferenceItem? Service { get; set; }

        /// <summary>
        /// Gets or Sets Product.
        /// </summary>
        [DataMember(Name = "product")]
        public ReferenceItem? Product { get; set; }

        /// <summary>
        /// Gets or Sets Sku.
        /// </summary>
        [DataMember(Name = "sku")]
        public ReferenceItem? Sku { get; set; }

        /// <summary>
        /// Gets or Sets Meter.
        /// </summary>
        [DataMember(Name = "meter")]
        public ReferenceItem? Meter { get; set; }

        /// <summary>
        /// Gets or sets the billing offer.
        /// </summary>
        [DataMember(Name = "billingOffer")]
        public string? BillingOffer { get; set; }

        /// <summary>
        /// Gets or Sets Pricing.
        /// </summary>
        [DataMember(Name = "pricing")]
        public ResourcePricing? Pricing { get; set; }

        /// <summary>
        /// Gets or Sets AcrAllocation.
        /// </summary>
        [DataMember(Name = "acrAllocation")]
        public AcrAllocation AcrAllocation { get; set; } = new AcrAllocation();

        /// <summary>
        /// Finds duplicate object by comparing properties.
        /// </summary>
        /// <param name="cloneResource">The duplicate object.</param>
        /// <returns>Returns true of duplicate is found.</returns>
        internal bool IsDuplicate(Resource cloneResource)
        {
            if (cloneResource == null)
            {
                return false;
            }

#pragma warning disable CS8602, CS8604 // cloneResource null check already done above.
            if (this.ServiceFamily != cloneResource.ServiceFamily)
            {
                return false;
            }

            if (!this.Service.IsDuplicate(cloneResource.Service))
            {
                return false;
            }

            if (!this.Product.IsDuplicate(cloneResource.Product))
            {
                return false;
            }

            if (!this.Sku.IsDuplicate(cloneResource.Sku))
            {
                return false;
            }

            if (!this.Meter.IsDuplicate(cloneResource.Meter))
            {
                return false;
            }

            if (!this.Pricing.IsDuplicate(cloneResource.Pricing))
            {
                return false;
            }

            return true;
#pragma warning restore CS8602, CS8604 // Possible null reference argument.
        }
    }
}
