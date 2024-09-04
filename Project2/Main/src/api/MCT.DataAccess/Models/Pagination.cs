// <copyright file="Pagination.cs" company="Microsoft">
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
    /// The pagination details model.
    /// </summary>
    [DataContract]
    public class Pagination
    {
        /// <summary>
        /// Gets or sets the pageSize .
        /// </summary>
        [DataMember(Name = "pageSize")]
        public int PageSize { get; set; }

        /// <summary>
        /// Gets or sets page number.
        /// </summary>
        [DataMember(Name = "pageNumber")]
        public int PageNumber { get; set; }
    }
}
