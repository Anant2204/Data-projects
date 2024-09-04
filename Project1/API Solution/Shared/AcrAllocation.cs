// <copyright file="AcrAllocation.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The ACR Allocation type.
    /// </summary>
    [DataContract]
    public partial class AcrAllocation
    {
        /// <summary>
        /// Gets the Total.
        /// </summary>
        [DataMember(Name = "total")]
        public double? Total
        {
            get
            {
                return Math.Round(this.Allocations.Sum(a => a.ACR), 2);
            }
        }

        /// <summary>
        /// Gets or Sets Allocations.
        /// </summary>
        [DataMember(Name = "allocations")]
        public List<Allocation> Allocations { get; set; } = new List<Allocation>();

        /// <summary>
        /// Identifies duplicate object by comparing properties.
        /// </summary>
        /// <param name="cloneAcrAllocation">Clone allocation object.</param>
        /// <returns>Returns true if the object is found to be duplicate.</returns>
        internal bool IsDuplicate(AcrAllocation cloneAcrAllocation)
        {
            if (cloneAcrAllocation == null)
            {
                return false;
            }

            for (int index = 0; index < this.Allocations.Count; index++)
            {
                if (!this.Allocations[index].IsDuplicate(cloneAcrAllocation.Allocations[index]))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
