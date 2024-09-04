// <copyright file="ManagerListResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

using MCT.DataAccess.Models;

namespace MCT.DataAccess.EfModels.EfCustomModels
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The manager list response type.
    /// </summary>
    [DataContract]
    public class GetManagerListResult
    {
        /// <summary>
        /// property to get and set manager alias
        /// </summary>
        [DataMember(Name = "managerAlias")]
        public string ManagerAlias { get; set; } = string.Empty;

        /// <summary>
        /// property to get and set manager name
        /// </summary>
        [DataMember(Name = "fullName")]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "isDefaultSelection")]
        public bool? IsDefaultSelection { get; set; }
    }
}

