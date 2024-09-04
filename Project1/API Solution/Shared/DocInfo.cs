// <copyright file="DocInfo.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The Document Information audit type.
    /// </summary>
    [DataContract]
    public partial class DocInfo : ICloneable
    {
        /// <summary>
        /// Gets or Sets CreatedBy.
        /// </summary>
        [DataMember(Name = "createdBy")]
        public string? CreatedBy { get; set; }

        /// <summary>
        /// Gets or Sets CreatedDate.
        /// </summary>
        [DataMember(Name = "createdDate")]
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Gets or Sets ModifiedBy.
        /// </summary>
        [DataMember(Name = "modifiedBy")]
        public string? ModifiedBy { get; set; }

        /// <summary>
        /// Gets or Sets ModifiedDate.
        /// </summary>
        [DataMember(Name = "modifiedDate")]
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Gets or Sets Ver.
        /// </summary>
        [DataMember(Name = "version")]
        public int? Version { get; set; }

        /// <summary>
        /// Gets or Sets IsActive.
        /// </summary>
        [DataMember(Name = "isActive")]
        public bool? IsActive { get; set; }

        /// <summary>
        /// Gets or sets the entity type.
        /// </summary>
        /// <value>The <see cref="EntityTypeEnum"/>.</value>
        [DataMember(Name = "entityType")]
        public EntityTypeEnum EntityType { get; set; }

        /// <summary>
        /// Gets or sets the etag of the underlting entity.
        /// </summary>
        [DataMember(Name = "etag")]
        public string? Etag { get; set; }

        /// <inheritdoc/>
        public object Clone()
        {
            return new DocInfo
            {
                CreatedBy = this.CreatedBy,
                CreatedDate = this.CreatedDate,
                EntityType = this.EntityType,
                IsActive = this.IsActive,
                ModifiedBy = this.ModifiedBy,
                ModifiedDate = this.ModifiedDate,
                Version = this.Version,
            };
        }
    }
}
