// <copyright file="DisciplineContextResponse.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    ///  DisciplineContextResponse
    /// </summary>
    public class DisciplineContextResponse
    {

        /// <summary>
        ///   <para>
        /// Gets or sets the discipline context.
        /// </para>
        /// </summary>
        /// <value>The discipline context.</value>
        public DisciplineContext[]? DisciplineContext  { get; set; }

    }

    /// <summary>
    ///   DisciplineContext
    /// </summary>
    public class DisciplineContext
    {
        /// <summary>Gets or sets the identifier.</summary>
        /// <value>The identifier.</value>
        [DataMember(Name = "id")]
        public string? Id { get; set; }

        /// <summary>Gets or sets the descipline.</summary>
        /// <value>The descipline.</value>
        [DataMember(Name = "discipline")]
        public string? Discipline { get; set; }


        /// <summary>Gets or sets a value indicating whether this instance is final.</summary>
        /// <value>
        ///   <c>true</c> if this instance is final; otherwise, <c>false</c>.</value>
        [DataMember(Name = "isFinal")]
        public bool IsFinal { get; set; }

        /// <summary>Gets or sets the descipline context.</summary>
        /// <value>The descipline context.</value>
        [DataMember(Name = "desciplineContext")]
        public string? DesciplineContext { get; set; }



        /// <summary>Gets or sets the modified by.</summary>
        /// <value>The modified by.</value>
        [DataMember(Name = "modifiedBy")]
        public string? ModifiedBy { get; set; } = string.Empty;

        /// <summary>Gets or sets the created date.</summary>
        /// <value>The created date.</value>
        [DataMember(Name = "createdDate")]
        public string? CreatedDate { get; set; } = string.Empty;

        /// <summary>Gets or sets the modified date.</summary>
        /// <value>The modified date.</value>
        [DataMember(Name = "modifiedDate")]
        public DateTime? ModifiedDate { get; set; }

        /// <summary>Gets or sets the created by.</summary>
        /// <value>The created by.</value>
        [DataMember(Name = "createdBy")]
        public DateTime? CreatedBy { get; set; }
    }
}
