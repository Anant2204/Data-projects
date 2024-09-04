// <copyright file="ConversationScriptUpdateScenarioRequest.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;


    /// <summary>
    ///  ConversationScriptUpdateScenarioRequest
    /// </summary>
    [DataContract]
    public class ConversationScriptUpdateScenarioRequest
    {
        /// <summary>
        ///   <para>
        /// Gets or sets the tcc.
        /// </para>
        /// </summary>
        /// <value>The tcc .</value>
        [DataMember(Name = "id")]
        public int[]? Id { get; set; }

        /// <summary>Gets or sets the content.</summary>
        /// <value>The content.</value>
        [DataMember(Name = "content")]
        public content? Content { get; set; }


    }

    ///// <summary>
    /////   scriptScenarios
    ///// </summary>
    //public class Tcc
    //{
    //    /// <summary>Gets or sets the fy org.</summary>
    //    [DataMember(Name = "fyOrg")]
    //    public string? FyOrg { get; set; }

    //    /// <summary>Gets or sets the fy role summary.</summary>
    //    [DataMember(Name = "fyRoleSummary")]
    //    public string? FyRoleSummary { get; set; }

    //    /// <summary>Gets or sets the fy q1.</summary>
    //    [DataMember(Name = "fyQ1")]
    //    public string? FyQ1 { get; set; }

    //    /// <summary>Gets or sets the fy q2.</summary>
    //    [DataMember(Name = "fyQ2")]
    //    public string? FyQ2 { get; set; }

    //    /// <summary>Gets or sets the cy org.</summary>
    //    [DataMember(Name = "cyOrg")]
    //    public string? CyOrg { get; set; }

    //    /// <summary>Gets or sets the cy role summary.</summary>
    //    [DataMember(Name = "cyRoleSummary")]
    //    public string? CyRoleSummary { get; set; }

    //    /// <summary>Gets or sets the cy q1.</summary>
    //    [DataMember(Name = "cyQ1")]
    //    public string? CyQ1 { get; set; }

    //    /// <summary>Gets or sets the cy q2.</summary>
    //    [DataMember(Name = "cyQ2")]
    //    public string? CyQ2 { get; set; }

    //    /// <summary>Gets or sets a value indicating whether this instance is final.</summary>
    //    /// <value>
    //    ///   <c>true</c> if this instance is final; otherwise, <c>false</c>.</value>
    //    [DataMember(Name = "isFinal")]
    //    public bool IsFinal { get; set; }

    //    /// <summary>Gets or sets a value indicating whether this instance is incentive plan changed.</summary>
    //    /// <value>
    //    ///   <c>true</c> if this instance is incentive plan changed; otherwise, <c>false</c>.</value>
    //    [DataMember(Name = "isIncentivePlanChanged")]
    //    public bool IsIncentivePlanChanged { get; set; }

    //}

    /// <summary>
    ///   Content
    /// </summary>
    public class content
    {
        /// <summary>Gets or sets the title.</summary>
        [DataMember(Name = "title")]
        public string? Title { get; set; }

        /// <summary>Gets or sets the specificContextOptional.</summary>
        /// <value>The specificContextOptional .</value>
        [DataMember(Name = "specificContextOptional")]
        public string? SpecificContextOptional { get; set; }

        /// <summary>Gets or sets the DisciplineContextOptional.</summary>
        /// <value>The DisciplineContextOptional .</value>
        [DataMember(Name = "disciplineContextOptional")]
        public string? DisciplineContextOptional { get; set; }

        /// <summary>Gets or sets the exclusions.</summary>
        /// <value>The exclusions.</value>
        [DataMember(Name = "exclusions")]
        public string?[]? Exclusions { get; set; }
    }

}
