// <copyright file="TaxonomyCorrectionResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// FutureManager Change Response Model
    /// </summary>
    public class TaxonomyCorrectionResponse
    {
        /// <summary>
        /// Gets or sets the response.
        /// </summary>
        /// <value>
        /// The response.
        /// </value>
        [DataMember(Name = "Response")]
        public string? Response { get; set; }
        /// <summary>
        /// Gets or sets the response status.
        /// </summary>
        /// <value>
        /// The response status.
        /// </value>
        [DataMember(Name = "ResponseStatus")]
        public bool? ResponseStatus { get; set; }
    }
}
