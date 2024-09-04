// <copyright file="GetSectionDetailsResult.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using MCT.DataAccess.Models;

namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    /// <summary>
    /// The GetSectionDetailsResult response type.
    /// </summary>
    [DataContract]
    public class GetSectionDetailsResult
    {
        /// <summary>Gets or sets the SectionName .</summary>
        [DataMember(Name = "sectionName")]

        public string? SectionName { get; set; }

        /// <summary>Gets or sets the SectionValue.</summary>
        [DataMember(Name = "SectionValue")]

        public string? SectionValue { get; set; }

        /// <summary>Gets or sets the DisplayName.</summary>
        [DataMember(Name = "displayName")]

        public string DisplayName { get; set; } = null!;
    }
}

