// <copyright file="ReferenceItem.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The Reference Item type.
    /// </summary>
    [DataContract]
    public partial class ReferenceItem
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
        /// Finds duplicate object by comparing properties.
        /// </summary>
        /// <param name="cloneReferenceItem">The duplicate object.</param>
        /// <returns>Returns true of duplicate is found.</returns>
        internal bool IsDuplicate(ReferenceItem cloneReferenceItem)
        {
            if (cloneReferenceItem == null)
            {
                return false;
            }

            if (this.Name != cloneReferenceItem.Name)
            {
                return false;
            }

            if (this.Id != cloneReferenceItem.Id)
            {
                return false;
            }

            return true;
        }
    }
}
