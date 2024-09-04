// <copyright file="Manager.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    /// Manager model
    /// </summary>
    [DataContract]
    public class Manager
    {
        /// <summary>
        /// property to get and set manager alias
        /// </summary>
        [DataMember(Name = "alias")]
        public string Alias { get; set; } = string.Empty;

        /// <summary>
        /// property to get and set manager name
        /// </summary>
        [DataMember(Name = "fullName")]
        public string FullName { get; set; } = string.Empty;
    }
}
