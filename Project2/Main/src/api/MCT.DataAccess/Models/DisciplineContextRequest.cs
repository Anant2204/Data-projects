// <copyright file="DisciplineContextRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    ///  DisciplineContextRequest
    /// </summary>
    public class DisciplineContextRequest
    {

        /// <summary>
        ///   <para>
        /// Gets or sets the discipline context.
        /// </para>
        /// </summary>
        /// <value>The discipline context.</value>
        public Disciplines[]? Disciplines { get; set; }

        ///// <summary>Gets or sets the content.</summary>
        ///// <value>The content.</value>
      //  public content[]? Content { get; set; }

    }

    /// <summary>
    ///   DisciplineContext
    /// </summary>
    public class Disciplines
    {
  
        /// <summary>Gets or sets the descipline.</summary>
        /// <value>The descipline.</value>
        [DataMember(Name = "discipline")]
        public string? Discipline { get; set; }


        /// <summary>Gets or sets a value indicating whether this instance is final.</summary>
        /// <value>
        ///   <c>true</c> if this instance is final; otherwise, <c>false</c>.</value>
        [DataMember(Name = "isFinal")]
        public bool IsFinal { get; set; }

    }

    /// <summary>
    ///   Content
    /// </summary>
    public class contentmm
    {
        /// <summary>Gets or sets the descipline context.</summary>
        /// <value>The descipline context.</value>
        [DataMember(Name = "desciplineContext")]
        public string? DesciplineContext { get; set; }
    }

  
}
