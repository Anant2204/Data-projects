// <copyright file="PublishData.cs" company="Microsoft Corporation">
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
    public partial class PublishData
    {
        /// <summary>
        /// Gets or Sets user who published the estimate version.
        /// </summary>
        [DataMember(Name = "publishedBy")]
        public string? PublishedBy { get; set; }

        /// <summary>
        /// Gets or Sets the date of publish of the estimate.
        /// </summary>
        [DataMember(Name = "publishedDate")]
        public DateTime? PublishedDate { get; set; }

        /// <summary>
        /// Gets or Sets the version of the document that was published.
        /// </summary>
        [DataMember(Name = "version")]
        public int? Version { get; set; }

        /// <summary>
        /// Gets or Sets the version of the document that was published.
        /// </summary>
        [DataMember(Name = "versionId")]
        public string? VersionId { get; set; }

        /// <summary>
        /// Gets or sets the downstream application identifier.
        /// </summary>
        [DataMember(Name = "appIdentifier")]
        public AppIdentifierEnum AppIdentifier { get; set; }
    }
}
