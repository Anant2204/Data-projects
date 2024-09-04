// <copyright file="IspRolesummary.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class IspRolesummary
    {
        public Guid? Createdby { get; set; }
        public string? Createdbyname { get; set; }
        public string? Createdbyyominame { get; set; }
        public DateTime? Createdon { get; set; }
        public Guid? Createdonbehalfby { get; set; }
        public string? Createdonbehalfbyname { get; set; }
        public string? Createdonbehalfbyyominame { get; set; }
        public int? Importsequencenumber { get; set; }
        public Guid? IspDiscipline { get; set; }
        public string? IspDisciplinename { get; set; }
        public string? IspName { get; set; }
        public string? IspProfession { get; set; }
        public string? IspProfessioncode { get; set; }
        public bool? IspRoleanalysisindicator { get; set; }
        public Guid? IspRolesummaryid { get; set; }
        public Guid? Modifiedby { get; set; }
        public string? Modifiedbyname { get; set; }
        public string? Modifiedbyyominame { get; set; }
        public DateTime? Modifiedon { get; set; }
        public Guid? Modifiedonbehalfby { get; set; }
        public string? Modifiedonbehalfbyname { get; set; }
        public string? Modifiedonbehalfbyyominame { get; set; }
        public Guid? Organizationid { get; set; }
        public string? Organizationidname { get; set; }
        public DateTime? Overriddencreatedon { get; set; }
        public int? Statecode { get; set; }
        public int? Statuscode { get; set; }
        public int? Timezoneruleversionnumber { get; set; }
        public int? Utcconversiontimezonecode { get; set; }
        public long? Versionnumber { get; set; }
    }
}
