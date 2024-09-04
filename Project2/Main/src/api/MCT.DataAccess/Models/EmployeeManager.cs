// <copyright file="EmployeeManager.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;

    /// <summary>
    /// Manager model
    /// </summary>
    [DataContract]
    public class EmployeeManager
    {
        /// <summary>
        /// property to get and set manager alias
        /// </summary>
        [DataMember(Name = "employeeAlias")]
        public string EmployeeAlias { get; set; } = string.Empty;

        /// <summary>
        /// property to get and set current year manager alias
        /// </summary>
        [DataMember(Name = "cyManagerAlias")]
        public string? CYManagerAlias { get; set; } = string.Empty;

        /// <summary>
        /// property to get and set future year manager alias
        /// </summary>
        [DataMember(Name = "fyManagerAlias")]
        public string? FYManagerAlias { get; set; } = string.Empty;
    }
}
