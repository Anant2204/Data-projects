// <copyright file="TaxonomyDto.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
    using System.Runtime.Serialization;

    /// <summary>
    ///  TaxonomyDto
    /// </summary>
    [DataContract]
    public class TaxonomyDto
    {
     /// <summary>Gets or sets the org.</summary>
     /// <value>The org.</value>
     [DataMember(Name = "org")]
     public string? Org { get; set; }
     
     /// <summary>Gets or sets the profession.</summary>
     /// <value>The profession.</value>
     [DataMember(Name = "profession")]
     public string? Profession { get; set; }
     
     /// <summary>Gets or sets the descipline.</summary>
     /// <value>The descipline.</value>
     [DataMember(Name = "discipline")]
     public string? Discipline { get; set; }
     
     /// <summary>Gets or sets the role summary.</summary>
     /// <value>The role summary.</value>
     [DataMember(Name = "roleSummary")]
     public string? RoleSummary { get; set; }
     
     /// <summary>Gets or sets the q1.</summary>
     /// <value>The q1.</value>
     [DataMember(Name = "q1")]
     public string? Q1 { get; set; }
     
     /// <summary>Gets or sets the q2.</summary>
     /// <value>The q2.</value>
     [DataMember(Name = "q2")]
     public string? Q2 { get; set; }
     
     /// <summary>Gets or sets the incentive plan.</summary>
     /// <value>The incentive plan.</value>
     [DataMember(Name = "incentivePlan")]
     public string? IncentivePlan { get; set; }
     
     /// <summary>Gets or sets the career stage.</summary>
     /// <value>The career stage.</value>
     [DataMember(Name = "careerStage")]
     public string? CareerStage { get; set; }
     
     /// <summary>Gets or sets the business leader.</summary>
     /// <value>The business leader.</value>
     [DataMember(Name = "businessLeader")]
     public string? BusinessLeader { get; set; }

     /// <summary>Gets or sets the manager.</summary>
     /// <value>The manager.</value>
     [DataMember(Name = "manager")]
     public string? Manager { get; set; }

     /// <summary>Gets or sets the m2.</summary>
     /// <value>The m2.</value>
     [DataMember(Name = "m2")]
     public string? M2 { get; set; }

    }
}
