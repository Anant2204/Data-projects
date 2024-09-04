// <copyright file="IUnitOfWork.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MCT.DataAccess.EfModels;

namespace MCT.DataAccess.Context
{
    public partial class ConversationContext : DbContext
    {
        public ConversationContext()
        {
        }

        public ConversationContext(DbContextOptions<ConversationContext> options)
            : base(options)
        {
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public virtual DbSet<DimManagerhierarchy> DimManagerhierarchies { get; set; } = null!;
        public virtual DbSet<IspRolesummary> IspRolesummaries { get; set; } = null!;
        public virtual DbSet<LovDatum> LovData { get; set; } = null!;
        public virtual DbSet<ScriptExclusion> ScriptExclusions { get; set; } = null!;
        public virtual DbSet<ScriptOpeningContent> ScriptOpeningContents { get; set; } = null!;
        public virtual DbSet<ScriptSegmentContent> ScriptSegmentContents { get; set; } = null!;
        public virtual DbSet<ScriptStaticContent> ScriptStaticContents { get; set; } = null!;
        public virtual DbSet<ScriptTaxonomyContent> ScriptTaxonomyContents { get; set; } = null!;
        public virtual DbSet<ScriptsOtherContext> ScriptsOtherContexts { get; set; } = null!;
        public virtual DbSet<ScriptsTemplate> ScriptsTemplates { get; set; } = null!;
        public virtual DbSet<TblHrdataFymanagerCorrection> TblHrdataFymanagerCorrections { get; set; } = null!;
        public virtual DbSet<TblHrdataToolInput> TblHrdataToolInputs { get; set; } = null!;
        public virtual DbSet<TblHrdatum> TblHrdata { get; set; } = null!;
        public virtual DbSet<TblOrgLeader> TblOrgLeaders { get; set; } = null!;
        public virtual DbSet<TblHrdataTaxonomyCorrection> TblHrdataTaxonomyCorrections { get; set; } = null!;
        public virtual DbSet<TblSellerDetail> TblSellerDetails { get; set; } = null!;
        public virtual DbSet<VwHrdatum> VwHrdata { get; set; } = null!;
        public virtual DbSet<VwManagerList> VwManagerLists { get; set; } = null!;
        public virtual DbSet<VwManagerSecurity> VwManagerSecurities { get; set; } = null!;
        public virtual DbSet<MctEdmMapping> MctEdmMappings { get; set; } = null!;
        public virtual DbSet<ScriptTaxonomyContentHistory> ScriptTaxonomyContentHistories { get; set; } = null!;
        public virtual DbSet<MctEdmMappingCy> MctEdmMappingCies { get; set; } = null!;
        public virtual DbSet<RoleDefaultFeatureMapping> RoleDefaultFeatureMappings { get; set; } = null!;
        public virtual DbSet<ToolRuntimeWindow> ToolRuntimeWindows { get; set; } = null!;

#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        /// <summary>
        /// Model creating for all ef models
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DimManagerhierarchy>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Dim_Managerhierarchy", "HR");

                entity.HasIndex(e => e.ManagerLevel, "IDX_ManagerLevel")
                    .IsClustered();

                entity.HasIndex(e => new { e.ManagerAlias, e.Mtype }, "NONInX_Dim_Mgr_Alias_MType_DirectMgrFullName_DManager");

                entity.Property(e => e.DirectManagerAlias).HasMaxLength(255);

                entity.Property(e => e.DirectManagerFullName).HasMaxLength(255);

                entity.Property(e => e.Ic)
                    .HasMaxLength(255)
                    .HasColumnName("IC");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ManagerAlias).HasMaxLength(255);

                entity.Property(e => e.Mtype)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("MType");
            });

            modelBuilder.Entity<IspRolesummary>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Isp_rolesummary");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createdbyname).HasColumnName("createdbyname");

                entity.Property(e => e.Createdbyyominame).HasColumnName("createdbyyominame");

                entity.Property(e => e.Createdon).HasColumnName("createdon");

                entity.Property(e => e.Createdonbehalfby).HasColumnName("createdonbehalfby");

                entity.Property(e => e.Createdonbehalfbyname).HasColumnName("createdonbehalfbyname");

                entity.Property(e => e.Createdonbehalfbyyominame).HasColumnName("createdonbehalfbyyominame");

                entity.Property(e => e.Importsequencenumber).HasColumnName("importsequencenumber");

                entity.Property(e => e.IspDiscipline).HasColumnName("isp_discipline");

                entity.Property(e => e.IspDisciplinename).HasColumnName("isp_disciplinename");

                entity.Property(e => e.IspName).HasColumnName("isp_name");

                entity.Property(e => e.IspProfession).HasColumnName("isp_profession");

                entity.Property(e => e.IspProfessioncode).HasColumnName("isp_professioncode");

                entity.Property(e => e.IspRoleanalysisindicator).HasColumnName("isp_roleanalysisindicator");

                entity.Property(e => e.IspRolesummaryid).HasColumnName("isp_rolesummaryid");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifiedbyname).HasColumnName("modifiedbyname");

                entity.Property(e => e.Modifiedbyyominame).HasColumnName("modifiedbyyominame");

                entity.Property(e => e.Modifiedon).HasColumnName("modifiedon");

                entity.Property(e => e.Modifiedonbehalfby).HasColumnName("modifiedonbehalfby");

                entity.Property(e => e.Modifiedonbehalfbyname).HasColumnName("modifiedonbehalfbyname");

                entity.Property(e => e.Modifiedonbehalfbyyominame).HasColumnName("modifiedonbehalfbyyominame");

                entity.Property(e => e.Organizationid).HasColumnName("organizationid");

                entity.Property(e => e.Organizationidname).HasColumnName("organizationidname");

                entity.Property(e => e.Overriddencreatedon).HasColumnName("overriddencreatedon");

                entity.Property(e => e.Statecode).HasColumnName("statecode");

                entity.Property(e => e.Statuscode).HasColumnName("statuscode");

                entity.Property(e => e.Timezoneruleversionnumber).HasColumnName("timezoneruleversionnumber");

                entity.Property(e => e.Utcconversiontimezonecode).HasColumnName("utcconversiontimezonecode");

                entity.Property(e => e.Versionnumber).HasColumnName("versionnumber");
            });

            modelBuilder.Entity<LovDatum>(entity =>
            {
                entity.ToTable("LOV_Data");

                entity.Property(e => e.Category).HasMaxLength(50);

                entity.Property(e => e.Code).HasMaxLength(50);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.DisplayName).HasMaxLength(255);

                entity.Property(e => e.ModifiedBy).HasMaxLength(50);
            });

            modelBuilder.Entity<ScriptExclusion>(entity =>
            {
                entity.ToTable("ScriptExclusion", "dbo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Alias)
                    .HasMaxLength(40)
                    .HasColumnName("alias");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.IsActive).HasColumnName("isActive").HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.ScriptId).HasColumnName("scriptId");

                entity.HasOne(d => d.Script)
                    .WithMany(p => p.ScriptExclusions)
                    .HasForeignKey(d => d.ScriptId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ScriptExc__scrip__70FDBF69");
            });

            modelBuilder.Entity<ScriptOpeningContent>(entity =>
            {
                entity.ToTable("ScriptOpeningContent");

                entity.HasIndex(e => e.FyOrgLeaderAlias, "idx_ScriptOpeningContent_FyOrgLeaderAlias");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Content).HasColumnName("content");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.FyOrgLeaderAlias)
                    .HasMaxLength(40)
                    .HasColumnName("fyOrgLeaderAlias");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");
            });

            modelBuilder.Entity<ScriptSegmentContent>(entity =>
            {
                entity.ToTable("ScriptSegmentContent");

                entity.HasIndex(e => e.FyOrg, "idx_Tbl_SegmentSpecificContent_fyOrg");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Content)
                    .HasMaxLength(2000)
                    .HasColumnName("content");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.FyOrg)
                    .HasMaxLength(50)
                    .HasColumnName("fyOrg");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");
            });

            modelBuilder.Entity<ScriptStaticContent>(entity =>
            {
                entity.ToTable("ScriptStaticContent");

                entity.HasIndex(e => new { e.SectionName, e.ConversationType }, "idx_ScriptStaticContent_SectionName_ConversationType");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Content).HasColumnName("content");

                entity.Property(e => e.ConversationType)
                    .HasMaxLength(10)
                    .HasColumnName("conversationType")
                    .HasDefaultValueSql("('send')");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.SectionName)
                    .HasMaxLength(100)
                    .HasColumnName("sectionName");
            });

            modelBuilder.Entity<ScriptTaxonomyContent>(entity =>
            {
                entity.ToTable("ScriptTaxonomyContent", "HR");

                entity.ToTable(tb => tb.IsTemporal(ttb =>
                {
                    ttb.UseHistoryTable("ScriptTaxonomyContentHistory", "HR");
                    ttb
                        .HasPeriodStart("validFrom")
                        .HasColumnName("validFrom");
                    ttb
                        .HasPeriodEnd("validTo")
                        .HasColumnName("validTo");
                }
));

                entity.HasIndex(e => new { e.CyOrg, e.CyRoleSummary, e.CyQ1, e.CyQ2, e.FyOrg, e.FyRoleSummary, e.FyQ1, e.FyQ2 }, "UC_TaxonomyContent")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Content).HasColumnName("content");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.CyOrg)
                    .HasMaxLength(40)
                    .HasColumnName("cyOrg");

                entity.Property(e => e.CyQ1)
                    .HasMaxLength(50)
                    .HasColumnName("cyQ1");

                entity.Property(e => e.CyQ2)
                    .HasMaxLength(50)
                    .HasColumnName("cyQ2");

                entity.Property(e => e.CyRoleSummary)
                    .HasMaxLength(50)
                    .HasColumnName("cyRoleSummary");

                entity.Property(e => e.FyOrg)
                    .HasMaxLength(40)
                    .HasColumnName("fyOrg");

                entity.Property(e => e.FyQ1)
                    .HasMaxLength(50)
                    .HasColumnName("fyQ1");

                entity.Property(e => e.FyQ2)
                    .HasMaxLength(50)
                    .HasColumnName("fyQ2");

                entity.Property(e => e.FyRoleSummary)
                    .HasMaxLength(50)
                    .HasColumnName("fyRoleSummary");

                entity.Property(e => e.IsActive).HasColumnName("isActive").HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy")
                    .HasDefaultValueSql("('system')");


                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .HasColumnName("status");

                entity.Property(e => e.Title)
                    .HasMaxLength(500)
                    .HasColumnName("title");
            });

            modelBuilder.Entity<ScriptsOtherContext>(entity =>
            {
                entity.ToTable("Scripts_OtherContext", "HR");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ContentType).HasMaxLength(255);

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CreatedOn).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Key).HasMaxLength(255);

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ModifiedOn).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Section)
                    .HasMaxLength(50)
                    .HasDefaultValueSql("(N'None')");

                entity.Property(e => e.Type).HasMaxLength(255);
            });

            modelBuilder.Entity<ScriptsTemplate>(entity =>
            {
                entity.ToTable("Scripts_Template", "HR");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedBy).HasMaxLength(255);

                entity.Property(e => e.CyAbt)
                    .HasMaxLength(50)
                    .HasColumnName("CY_ABT");

                entity.Property(e => e.CyCareerStage)
                    .HasMaxLength(500)
                    .HasColumnName("CY_CareerStage");

                entity.Property(e => e.CyDescipline)
                    .HasMaxLength(500)
                    .HasColumnName("CY_Descipline");

                entity.Property(e => e.CyIncentivePlan)
                    .HasMaxLength(500)
                    .HasColumnName("CY_IncentivePlan");

                entity.Property(e => e.CyOrg).HasColumnName("CY_Org");

                entity.Property(e => e.CyProfession)
                    .HasMaxLength(500)
                    .HasColumnName("CY_Profession");

                entity.Property(e => e.CyQ1)
                    .HasMaxLength(50)
                    .HasColumnName("CY_Q1");

                entity.Property(e => e.CyQ2)
                    .HasMaxLength(50)
                    .HasColumnName("CY_Q2");

                entity.Property(e => e.CyRoleSummary)
                    .HasMaxLength(50)
                    .HasColumnName("CY_RoleSummary");

                entity.Property(e => e.DisciplineContextOptional).HasMaxLength(1000);

                entity.Property(e => e.Exclusion).HasMaxLength(1000);

                entity.Property(e => e.FyAbt)
                    .HasMaxLength(50)
                    .HasColumnName("FY_ABT");

                entity.Property(e => e.FyCareerStage)
                    .HasMaxLength(500)
                    .HasColumnName("FY_CareerStage");

                entity.Property(e => e.FyDescipline)
                    .HasMaxLength(500)
                    .HasColumnName("FY_Descipline");

                entity.Property(e => e.FyIncentivePlan)
                    .HasMaxLength(500)
                    .HasColumnName("FY_IncentivePlan");

                entity.Property(e => e.FyOrg).HasColumnName("FY_Org");

                entity.Property(e => e.FyProfession)
                    .HasMaxLength(500)
                    .HasColumnName("FY_Profession");

                entity.Property(e => e.FyQ1)
                    .HasMaxLength(50)
                    .HasColumnName("FY_Q1");

                entity.Property(e => e.FyQ2)
                    .HasMaxLength(50)
                    .HasColumnName("FY_Q2");

                entity.Property(e => e.FyRoleSummary)
                    .HasMaxLength(50)
                    .HasColumnName("FY_RoleSummary");

                entity.Property(e => e.IsFinal).HasDefaultValueSql("((0))");

                entity.Property(e => e.ModifiedBy).HasMaxLength(255);

                entity.Property(e => e.ScenarioName).HasMaxLength(1000);

                entity.Property(e => e.Section).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(1000);
            });

            modelBuilder.Entity<TblHrdataFymanagerCorrection>(entity =>
            {
                entity.ToTable("Tbl_HRData_FYManagerCorrection", "HR");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ApprovedRejectedBy)
                    .HasMaxLength(40)
                    .HasColumnName("approvedRejectedBy");

                entity.Property(e => e.ApprovedRejectedByLevel2)
                    .HasMaxLength(40)
                    .HasColumnName("approvedRejectedByLevel2");

                entity.Property(e => e.ApprovedRejectedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("approvedRejectedDate");

                entity.Property(e => e.ApprovedRejectedDateByLevel2)
                    .HasColumnType("datetime")
                    .HasColumnName("approvedRejectedDateByLevel2");

                entity.Property(e => e.ApproverComments)
                    .HasMaxLength(500)
                    .HasColumnName("approverComments");

                entity.Property(e => e.ApproverRejecterCommentsByLevel2)
                    .HasMaxLength(100)
                    .HasColumnName("approverRejecterCommentsByLevel2");

                entity.Property(e => e.Comment)
                    .HasMaxLength(500)
                    .HasColumnName("comment");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.CyManagerAlias)
                    .HasMaxLength(40)
                    .HasColumnName("cyManagerAlias");

                entity.Property(e => e.FyCorrectManagerAlias)
                    .HasMaxLength(40)
                    .HasColumnName("fyCorrectManagerAlias");

                entity.Property(e => e.FyManagerAlias)
                    .HasMaxLength(40)
                    .HasColumnName("fyManagerAlias");

                entity.Property(e => e.IcAlias)
                    .HasMaxLength(40)
                    .HasColumnName("icAlias");

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IsLevel2ApprovalEmailSent).HasColumnName("isLevel2ApprovalEmailSent");

                entity.Property(e => e.IsLevel1ApprovalEmailSent).HasColumnName("isLevel1ApprovalEmailSent");

                entity.Property(e => e.IspErrorDetails)
                    .HasMaxLength(1000)
                    .HasColumnName("ispErrorDetails");

                entity.Property(e => e.IspUpdateStatus)
                    .HasMaxLength(40)
                    .HasColumnName("ispUpdateStatus");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.Status)
                    .HasMaxLength(40)
                    .HasColumnName("status");

                entity.Property(e => e.FlowId)
                    .HasMaxLength(100)
                    .HasColumnName("flowId");

                entity.Property(e => e.FlowRunId)
                    .HasMaxLength(100)
                    .HasColumnName("flowRunId");

                entity.Property(e => e.FlowApprovalId)
                    .HasMaxLength(100)
                    .HasColumnName("flowApprovalId");

                entity.Property(e => e.TwoLevelApprovalRequired).HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<TblHrdataTaxonomyCorrection>(entity =>
            {
                entity.ToTable("Tbl_HRData_TaxonomyCorrection", "HR");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ApprovedOrRejectedEmailSent).HasDefaultValueSql("((0))");

                entity.Property(e => e.ApprovedRejectedBy)
                    .HasMaxLength(40)
                    .HasColumnName("approvedRejectedBy");

                entity.Property(e => e.ApprovedRejectedDate)
                    .HasMaxLength(40)
                    .HasColumnName("approvedRejectedDate");

                entity.Property(e => e.ApproverComments)
                    .HasMaxLength(500)
                    .HasColumnName("approverComments");

                entity.Property(e => e.Comments)
                    .HasMaxLength(500)
                    .HasColumnName("comments");

                entity.Property(e => e.CreatedByUserFullName)
                   .HasMaxLength(100)
                   .HasColumnName("createdByUserFullName");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.CyCareerStage).HasMaxLength(40);

                entity.Property(e => e.CyCostCenter).HasMaxLength(40);

                entity.Property(e => e.CyManagerAlias)
                    .HasMaxLength(40)
                    .HasColumnName("cyManagerAlias");

                entity.Property(e => e.CyOrg).HasMaxLength(40);

                entity.Property(e => e.CyQ1).HasMaxLength(40);

                entity.Property(e => e.CyQ2).HasMaxLength(40);

                entity.Property(e => e.CyRoleSummary).HasMaxLength(40);

                entity.Property(e => e.FyCareerStage).HasMaxLength(40);

                entity.Property(e => e.FyCostCenter).HasMaxLength(40);

                entity.Property(e => e.FyManagerAlias)
                    .HasMaxLength(40)
                    .HasColumnName("fyManagerAlias");

                entity.Property(e => e.FyOrg).HasMaxLength(40);

                entity.Property(e => e.FyQ1).HasMaxLength(40);

                entity.Property(e => e.FyQ2).HasMaxLength(40);

                entity.Property(e => e.FyRoleSummary).HasMaxLength(40);

                entity.Property(e => e.IcAlias)
                    .HasMaxLength(40)
                    .HasColumnName("icAlias");

                entity.Property(e => e.IcName)
                    .HasMaxLength(100)
                    .HasColumnName("icName");

                entity.Property(e => e.InReviewEmailSent).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.MarkedInReviewByAlias).HasMaxLength(40);

                entity.Property(e => e.MarkedInReviewByName).HasMaxLength(100);

                entity.Property(e => e.MarkedInReviewDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.ProposedCareerStage).HasMaxLength(40);

                entity.Property(e => e.ProposedCostCenter).HasMaxLength(40);

                entity.Property(e => e.ProposedOrg).HasMaxLength(40);

                entity.Property(e => e.ProposedQ1).HasMaxLength(40);

                entity.Property(e => e.ProposedQ2).HasMaxLength(40);

                entity.Property(e => e.ProposedRoleSummary).HasMaxLength(40);

                entity.Property(e => e.FyIncentivePlan)
                    .HasMaxLength(50)
                    .HasColumnName("FyIncentivePlan");

                entity.Property(e => e.CyIncentivePlan)
                    .HasMaxLength(50)
                    .HasColumnName("CyIncentivePlan");

                entity.Property(e => e.ProposedIncentivePlan)
                    .HasMaxLength(50)
                    .HasColumnName("ProposedIncentivePlan");

                entity.Property(e => e.Status)
                    .HasMaxLength(40)
                    .HasColumnName("status");

                entity.Property(e => e.SubmittedMailSent).HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<TblSellerDetail>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Tbl_Seller_Details", "HR");

                entity.Property(e => e.Alias).HasMaxLength(50);

                entity.Property(e => e.CyCareerStage)
                    .HasMaxLength(500)
                    .HasColumnName("CY_CareerStage");

                entity.Property(e => e.CyCostCenter)
                    .HasMaxLength(500)
                    .HasColumnName("CY_CostCenter");

                entity.Property(e => e.CyIncentivePlan)
                    .HasMaxLength(500)
                    .HasColumnName("CY_IncentivePlan");

                entity.Property(e => e.CyManagerAlias)
                    .HasMaxLength(50)
                    .HasColumnName("CY_ManagerAlias");

                entity.Property(e => e.CyManagerFullName).HasColumnName("CY_ManagerFullName");

                entity.Property(e => e.CyOrg).HasColumnName("CY_Org");

                entity.Property(e => e.CyQ1)
                    .HasMaxLength(50)
                    .HasColumnName("CY_Q1");

                entity.Property(e => e.CyQ2)
                    .HasMaxLength(50)
                    .HasColumnName("CY_Q2");

                entity.Property(e => e.CyRoleSummary)
                    .HasMaxLength(50)
                    .HasColumnName("CY_RoleSummary");

                entity.Property(e => e.EdmFyenddate).HasColumnName("edm_fyenddate");

                entity.Property(e => e.EdmFystartdate).HasColumnName("edm_fystartdate");

                entity.Property(e => e.EdmPlansellerid).HasColumnName("edm_plansellerid");

                entity.Property(e => e.FyCareerStage)
                    .HasMaxLength(500)
                    .HasColumnName("FY_CareerStage");

                entity.Property(e => e.FyCostCenter)
                    .HasMaxLength(500)
                    .HasColumnName("FY_CostCenter");

                entity.Property(e => e.FyIncentivePlan)
                    .HasMaxLength(500)
                    .HasColumnName("FY_IncentivePlan");

                entity.Property(e => e.FyManagerAlias).HasColumnName("FY_ManagerAlias");

                entity.Property(e => e.FyManagerFullName).HasColumnName("FY_ManagerFullName");

                entity.Property(e => e.FyOrg).HasColumnName("FY_Org");

                entity.Property(e => e.FyQ1).HasColumnName("FY_Q1");

                entity.Property(e => e.FyQ2).HasColumnName("FY_Q2");

                entity.Property(e => e.FyRs).HasColumnName("FY_RS");

                entity.Property(e => e.IspIsbubbled).HasColumnName("isp_isbubbled");

                entity.Property(e => e.IspIstouched).HasColumnName("isp_istouched");

                entity.Property(e => e.IspLevel1).HasColumnName("isp_level1");

                entity.Property(e => e.IspLevel2).HasColumnName("isp_level2");

                entity.Property(e => e.IspLevel3).HasColumnName("isp_Level3");

                entity.Property(e => e.IspReviewed).HasColumnName("isp_reviewed");

                entity.Property(e => e.IsplastModifiedDate).HasColumnName("ISPLastModifiedDate");

                entity.Property(e => e.IspreviewReason).HasColumnName("ISPReviewReason");

                entity.Property(e => e.ReportsToLevel1Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_1_Email");

                entity.Property(e => e.ReportsToLevel1FullName).HasColumnName("Reports_To_Level_1_Full_Name");

                entity.Property(e => e.ReportsToLevel2Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_2_Email");

                entity.Property(e => e.ReportsToLevel2FullName).HasColumnName("Reports_To_Level_2_Full_Name");

                entity.Property(e => e.ReportsToLevel3Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_3_Email");

                entity.Property(e => e.ReportsToLevel3FullName).HasColumnName("Reports_To_Level_3_Full_Name");

                entity.Property(e => e.ReportsToLevel4Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_4_Email");

                entity.Property(e => e.ReportsToLevel4FullName).HasColumnName("Reports_To_Level_4_Full_Name");

                entity.Property(e => e.ReportsToLevel5Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_5_Email");

                entity.Property(e => e.ReportsToLevel5FullName).HasColumnName("Reports_To_Level_5_Full_Name");

                entity.Property(e => e.ReportsToLevel6Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_6_Email");

                entity.Property(e => e.ReportsToLevel6FullName).HasColumnName("Reports_To_Level_6_Full_Name");

                entity.Property(e => e.ReportsToLevel7Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_7_Email");

                entity.Property(e => e.ReportsToLevel7FullName).HasColumnName("Reports_To_Level_7_Full_Name");

                entity.Property(e => e.ReviewStatus)
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.Statecode).HasColumnName("statecode");
            });

            modelBuilder.Entity<TblHrdataToolInput>(entity =>
            {
                entity.HasKey(e => e.Ic)
                    .HasName("Tbl_HRDa__3214EC26B04A44C4_PK");

                entity.ToTable("Tbl_HRData_ToolInput", "HR");

                entity.Property(e => e.Ic)
                    .HasMaxLength(255)
                    .HasColumnName("IC");

                entity.Property(e => e.Area).HasMaxLength(50);

                entity.Property(e => e.DecisionMadeOn).HasColumnType("datetime");

                entity.Property(e => e.DecisionMakerAlias).HasMaxLength(25);

                entity.Property(e => e.DecisionMakerName).HasMaxLength(100);

                entity.Property(e => e.FyCostCenter)
                    .HasMaxLength(250)
                    .HasColumnName("FY_CostCenter");

                entity.Property(e => e.FyIncentivePlan)
                    .HasMaxLength(50)
                    .HasColumnName("FY_IncentivePlan");

                entity.Property(e => e.FymanagerChangeApprovedOn)
                    .HasColumnType("datetime")
                    .HasColumnName("FYManagerChangeApprovedOn");

                entity.Property(e => e.IsEdmoverride)
                    .HasMaxLength(10)
                    .HasColumnName("IsEDMOverride");

                entity.Property(e => e.IsperrorDetails)
                    .HasMaxLength(500)
                    .HasColumnName("ISPErrorDetails");

                entity.Property(e => e.IspupdateStatus)
                    .HasMaxLength(500)
                    .HasColumnName("ISPUpdateStatus");

                entity.Property(e => e.R1Comments)
                    .HasMaxLength(1255)
                    .HasColumnName("R1_Comments");

                entity.Property(e => e.R1ConversationStatus)
                    .HasMaxLength(255)
                    .HasColumnName("R1_ConversationStatus");

                entity.Property(e => e.R1CoversationLevel)
                    .HasMaxLength(255)
                    .HasColumnName("R1_CoversationLevel");

                entity.Property(e => e.R1Edmvalidation)
                    .HasMaxLength(255)
                    .HasColumnName("R1_EDMValidation");

                entity.Property(e => e.R1Fy23correctManager)
                    .HasMaxLength(255)
                    .HasColumnName("R1_FY23CorrectManager");

                entity.Property(e => e.R1Org)
                    .HasMaxLength(255)
                    .HasColumnName("R1_Org");

                entity.Property(e => e.R1Q1)
                    .HasMaxLength(255)
                    .HasColumnName("R1_Q1");

                entity.Property(e => e.R1Q2)
                    .HasMaxLength(255)
                    .HasColumnName("R1_Q2");

                entity.Property(e => e.R1Rs)
                    .HasMaxLength(255)
                    .HasColumnName("R1_RS");

                entity.Property(e => e.R1Update)
                    .HasColumnType("datetime")
                    .HasColumnName("R1_update");

                entity.Property(e => e.R1Updatedby)
                    .HasMaxLength(255)
                    .HasColumnName("R1_updatedby");

                entity.Property(e => e.R2Comments)
                    .HasMaxLength(1255)
                    .HasColumnName("R2_Comments");

                entity.Property(e => e.R2ConversationStatus)
                    .HasMaxLength(255)
                    .HasColumnName("R2_ConversationStatus");

                entity.Property(e => e.R2CoversationLevel)
                    .HasMaxLength(255)
                    .HasColumnName("R2_CoversationLevel");

                entity.Property(e => e.R2Edmvalidation)
                    .HasMaxLength(255)
                    .HasColumnName("R2_EDMValidation");

                entity.Property(e => e.R2Fy23correctManager)
                    .HasMaxLength(255)
                    .HasColumnName("R2_FY23CorrectManager");

                entity.Property(e => e.R2Org)
                    .HasMaxLength(255)
                    .HasColumnName("R2_Org");

                entity.Property(e => e.R2Q1)
                    .HasMaxLength(255)
                    .HasColumnName("R2_Q1");

                entity.Property(e => e.R2Q2)
                    .HasMaxLength(255)
                    .HasColumnName("R2_Q2");

                entity.Property(e => e.R2Rs)
                    .HasMaxLength(255)
                    .HasColumnName("R2_RS");

                entity.Property(e => e.R2Update)
                    .HasColumnType("datetime")
                    .HasColumnName("R2_update");

                entity.Property(e => e.R2Updatedby)
                    .HasMaxLength(255)
                    .HasColumnName("R2_updatedby");

                entity.Property(e => e.RequestId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("RequestID");

                entity.Property(e => e.SendingEmailsent).HasMaxLength(10);

                entity.Property(e => e.Status)
                    .HasMaxLength(25)
                    .IsFixedLength();
            });

            modelBuilder.Entity<TblHrdatum>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Tbl_HRData", "HR");

                entity.Property(e => e.CyCareerStage)
                    .HasMaxLength(500)
                    .HasColumnName("CY_CareerStage");

                entity.Property(e => e.CyCostCenter)
                    .HasMaxLength(500)
                    .HasColumnName("CY_CostCenter");

                entity.Property(e => e.CyDiscipline)
                    .HasMaxLength(500)
                    .HasColumnName("CY_Discipline");

                entity.Property(e => e.CyIncentivePlan)
                    .HasMaxLength(500)
                    .HasColumnName("CY_IncentivePlan");

                entity.Property(e => e.CyManagerAlias)
                    .HasMaxLength(50)
                    .HasColumnName("CY_ManagerAlias");

                entity.Property(e => e.CyManagerFullName).HasColumnName("CY_ManagerFullName");

                entity.Property(e => e.CyOrg).HasColumnName("CY_Org");

                entity.Property(e => e.CyProfession)
                    .HasMaxLength(500)
                    .HasColumnName("CY_Profession");

                entity.Property(e => e.CyQ1)
                    .HasMaxLength(50)
                    .HasColumnName("CY_Q1");

                entity.Property(e => e.CyQ2)
                    .HasMaxLength(50)
                    .HasColumnName("CY_Q2");

                entity.Property(e => e.CyRoleSummary)
                    .HasMaxLength(50)
                    .HasColumnName("CY_RoleSummary");

                entity.Property(e => e.FyCareerStage)
                    .HasMaxLength(500)
                    .HasColumnName("FY_CareerStage");

                entity.Property(e => e.FyCostCenter)
                    .HasMaxLength(500)
                    .HasColumnName("FY_CostCenter");

                entity.Property(e => e.FyDiscipline)
                    .HasMaxLength(500)
                    .HasColumnName("FY_Discipline");

                entity.Property(e => e.FyIncentivePlan)
                    .HasMaxLength(500)
                    .HasColumnName("FY_IncentivePlan");

                entity.Property(e => e.FyManagerAlias).HasColumnName("FY_ManagerAlias");

                entity.Property(e => e.FyManagerFullName).HasColumnName("FY_ManagerFullName");

                entity.Property(e => e.FyOrg).HasColumnName("FY_Org");

                entity.Property(e => e.FyProfession)
                    .HasMaxLength(500)
                    .HasColumnName("FY_Profession");

                entity.Property(e => e.FyQ1).HasColumnName("FY_Q1");

                entity.Property(e => e.FyQ2).HasColumnName("FY_Q2");

                entity.Property(e => e.FyRoleSummary).HasColumnName("FY_RoleSummary");

                entity.Property(e => e.FymanagerChange)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("FYManagerChange");

                entity.Property(e => e.Ic)
                    .HasMaxLength(50)
                    .HasColumnName("IC");

                entity.Property(e => e.IcFullName).HasColumnName("IC_FullName");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.ReportsToLevel1Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_1_Email");

                entity.Property(e => e.ReportsToLevel1FullName).HasColumnName("Reports_To_Level_1_Full_Name");

                entity.Property(e => e.ReportsToLevel2Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_2_Email");

                entity.Property(e => e.ReportsToLevel2FullName).HasColumnName("Reports_To_Level_2_Full_Name");

                entity.Property(e => e.ReportsToLevel3Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_3_Email");

                entity.Property(e => e.ReportsToLevel3FullName).HasColumnName("Reports_To_Level_3_Full_Name");

                entity.Property(e => e.ReportsToLevel4Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_4_Email");

                entity.Property(e => e.ReportsToLevel4FullName).HasColumnName("Reports_To_Level_4_Full_Name");

                entity.Property(e => e.ReportsToLevel5Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_5_Email");

                entity.Property(e => e.ReportsToLevel5FullName).HasColumnName("Reports_To_Level_5_Full_Name");

                entity.Property(e => e.ReportsToLevel6Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_6_Email");

                entity.Property(e => e.ReportsToLevel6FullName).HasColumnName("Reports_To_Level_6_Full_Name");

                entity.Property(e => e.ReportsToLevel7Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_7_Email");

                entity.Property(e => e.ReportsToLevel7FullName).HasColumnName("Reports_To_Level_7_Full_Name");
            });

            modelBuilder.Entity<TblOrgLeader>(entity =>
            {
                entity.HasKey(e => e.Manager)
                    .HasName("PK__TBL_OrgL__B01A6904AD15FF88");

                entity.ToTable("TBL_OrgLeader", "HR");

                entity.Property(e => e.Manager)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ConversationRequired)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VwHrdatum>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Vw_HRdata", "HR");

                entity.Property(e => e.Conversation)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.CyCareerStage)
                    .HasMaxLength(500)
                    .HasColumnName("CY_CareerStage");

                entity.Property(e => e.CyCostCenter)
                    .HasMaxLength(500)
                    .HasColumnName("CY_CostCenter");

                entity.Property(e => e.CyIncentivePlan)
                    .HasMaxLength(500)
                    .HasColumnName("CY_IncentivePlan");

                entity.Property(e => e.CyManagerAlias)
                    .HasMaxLength(50)
                    .HasColumnName("CY_ManagerAlias");

                entity.Property(e => e.CyManagerFullName).HasColumnName("CY_ManagerFullName");

                entity.Property(e => e.CyOrg).HasColumnName("CY_Org");

                entity.Property(e => e.CyQ1)
                    .HasMaxLength(50)
                    .HasColumnName("CY_Q1");

                entity.Property(e => e.CyQ2)
                    .HasMaxLength(50)
                    .HasColumnName("CY_Q2");

                entity.Property(e => e.CyRoleSummary)
                    .HasMaxLength(50)
                    .HasColumnName("CY_RoleSummary");

                entity.Property(e => e.FyCareerStage)
                    .HasMaxLength(500)
                    .HasColumnName("FY_CareerStage");

                entity.Property(e => e.FyCompanyCode).HasColumnName("FY_CompanyCode");

                entity.Property(e => e.FyCostCenter)
                    .HasMaxLength(500)
                    .HasColumnName("FY_CostCenter");

                entity.Property(e => e.FyIncentivePlan)
                    .HasMaxLength(500)
                    .HasColumnName("FY_IncentivePlan");

                entity.Property(e => e.FyManagerAlias).HasColumnName("FY_ManagerAlias");

                entity.Property(e => e.FyManagerFullName).HasColumnName("FY_ManagerFullName");

                entity.Property(e => e.FyOrg).HasColumnName("FY_Org");

                entity.Property(e => e.FyQ1).HasColumnName("FY_Q1");

                entity.Property(e => e.FyQ2).HasColumnName("FY_Q2");

                entity.Property(e => e.FyRoleSummary).HasColumnName("FY_RoleSummary");

                entity.Property(e => e.FymanagerChange)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("FYManagerChange");

                entity.Property(e => e.Ic)
                    .HasMaxLength(50)
                    .HasColumnName("IC");

                entity.Property(e => e.IcFullName).HasColumnName("IC_FullName");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Loa).HasColumnName("LOA");

                entity.Property(e => e.R1Comments)
                    .HasMaxLength(1255)
                    .HasColumnName("R1_Comments");

                entity.Property(e => e.R1ConversationStatus)
                    .HasMaxLength(255)
                    .HasColumnName("R1_ConversationStatus");

                entity.Property(e => e.R1CoversationLevel)
                    .HasMaxLength(255)
                    .HasColumnName("R1_CoversationLevel");

                entity.Property(e => e.R1Edmvalidation)
                    .HasMaxLength(255)
                    .HasColumnName("R1_EDMValidation");

                entity.Property(e => e.R1Fy23correctManager)
                    .HasMaxLength(255)
                    .HasColumnName("R1_FY23CorrectManager");

                entity.Property(e => e.R1Org)
                    .HasMaxLength(255)
                    .HasColumnName("R1_Org");

                entity.Property(e => e.R1Q1)
                    .HasMaxLength(255)
                    .HasColumnName("R1_Q1");

                entity.Property(e => e.R1Q2)
                    .HasMaxLength(255)
                    .HasColumnName("R1_Q2");

                entity.Property(e => e.R1Rs)
                    .HasMaxLength(255)
                    .HasColumnName("R1_RS");

                entity.Property(e => e.R1Update)
                    .HasColumnType("datetime")
                    .HasColumnName("R1_update");

                entity.Property(e => e.R1Updatedby)
                    .HasMaxLength(255)
                    .HasColumnName("R1_updatedby");

                entity.Property(e => e.R1managerChange)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("R1ManagerChange");

                entity.Property(e => e.R2Comments)
                    .HasMaxLength(1255)
                    .HasColumnName("R2_Comments");

                entity.Property(e => e.R2ConversationStatus)
                    .HasMaxLength(255)
                    .HasColumnName("R2_ConversationStatus");

                entity.Property(e => e.R2CoversationLevel)
                    .HasMaxLength(255)
                    .HasColumnName("R2_CoversationLevel");

                entity.Property(e => e.R2Edmvalidation)
                    .HasMaxLength(255)
                    .HasColumnName("R2_EDMValidation");

                entity.Property(e => e.R2Fy23correctManager)
                    .HasMaxLength(255)
                    .HasColumnName("R2_FY23CorrectManager");

                entity.Property(e => e.R2Org)
                    .HasMaxLength(255)
                    .HasColumnName("R2_Org");

                entity.Property(e => e.R2Q1)
                    .HasMaxLength(255)
                    .HasColumnName("R2_Q1");

                entity.Property(e => e.R2Q2)
                    .HasMaxLength(255)
                    .HasColumnName("R2_Q2");

                entity.Property(e => e.R2Rs)
                    .HasMaxLength(255)
                    .HasColumnName("R2_RS");

                entity.Property(e => e.R2Update)
                    .HasColumnType("datetime")
                    .HasColumnName("R2_update");

                entity.Property(e => e.R2Updatedby)
                    .HasMaxLength(255)
                    .HasColumnName("R2_updatedby");

                entity.Property(e => e.R2managerChange)
                    .HasMaxLength(14)
                    .IsUnicode(false)
                    .HasColumnName("R2ManagerChange");

                entity.Property(e => e.ReceivingFormatingStatus)
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.ReceivingScriptLink)
                    .HasMaxLength(106)
                    .IsUnicode(false)
                    .HasColumnName("Receiving_ScriptLink");

                entity.Property(e => e.ReportsToLevel1Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_1_Email");

                entity.Property(e => e.ReportsToLevel1FullName).HasColumnName("Reports_To_Level_1_Full_Name");

                entity.Property(e => e.ReportsToLevel2Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_2_Email");

                entity.Property(e => e.ReportsToLevel2FullName).HasColumnName("Reports_To_Level_2_Full_Name");

                entity.Property(e => e.ReportsToLevel3Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_3_Email");

                entity.Property(e => e.ReportsToLevel3FullName).HasColumnName("Reports_To_Level_3_Full_Name");

                entity.Property(e => e.ReportsToLevel4Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_4_Email");

                entity.Property(e => e.ReportsToLevel4FullName).HasColumnName("Reports_To_Level_4_Full_Name");

                entity.Property(e => e.ReportsToLevel5Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_5_Email");

                entity.Property(e => e.ReportsToLevel5FullName).HasColumnName("Reports_To_Level_5_Full_Name");

                entity.Property(e => e.ReportsToLevel6Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_6_Email");

                entity.Property(e => e.ReportsToLevel6FullName).HasColumnName("Reports_To_Level_6_Full_Name");

                entity.Property(e => e.ReportsToLevel7Email)
                    .HasMaxLength(50)
                    .HasColumnName("Reports_To_Level_7_Email");

                entity.Property(e => e.ReportsToLevel7FullName).HasColumnName("Reports_To_Level_7_Full_Name");

                entity.Property(e => e.SendingFormatingStatus)
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.SendingScriptLink).HasColumnName("Sending_ScriptLink");
            });

            modelBuilder.Entity<VwManagerList>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Vw_ManagerList", "HR");

                entity.Property(e => e.CyManagerAlias).HasColumnName("CY_ManagerAlias");

                entity.Property(e => e.CyManagerFullName).HasColumnName("CY_ManagerFullName");
            });

            modelBuilder.Entity<VwManagerSecurity>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("Vw_ManagerSecurity", "HR");

                entity.Property(e => e.DirectManagerAlias).HasMaxLength(255);

                entity.Property(e => e.DirectManagerFullName).HasMaxLength(255);

                entity.Property(e => e.Ic)
                    .HasMaxLength(255)
                    .HasColumnName("IC");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ManagerAlias).HasMaxLength(255);

                entity.Property(e => e.Mtype)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("MType");

                entity.Property(e => e.Proxy).IsUnicode(false);
            });

            modelBuilder.Entity<MctEdmMapping>(entity =>
            {
                entity.HasNoKey();
                entity.ToTable("MCT_EDM_Mapping", "HR");

            });

            modelBuilder.Entity<ScriptTaxonomyContentHistory>(entity =>
            {
                entity.HasNoKey();
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate").
                     HasColumnName("validTo")
                    .HasDefaultValueSql("(getutcdate())");

                entity.ToTable("ScriptTaxonomyContentHistory", "HR");

            });

            modelBuilder.Entity<MctEdmMappingCy>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("MCT_EDM_Mapping_CY", "HR");

                entity.Property(e => e.CareerStage).HasMaxLength(50);

                entity.Property(e => e.IncentivePlan).HasMaxLength(50);

                entity.Property(e => e.Org).HasMaxLength(50);

                entity.Property(e => e.Q1).HasMaxLength(50);

                entity.Property(e => e.Q2).HasMaxLength(50);

                entity.Property(e => e.RoleSummary).HasMaxLength(50);
            });

            modelBuilder.Entity<RoleDefaultFeatureMapping>(entity =>
            {
                entity.ToTable("RoleDefaultFeatureMapping");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.FeatureId).HasColumnName("featureId");

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.RoleId).HasColumnName("roleId");
            });

            modelBuilder.Entity<ToolRuntimeWindow>(entity =>
            {
                entity.ToTable("ToolRuntimeWindow", "dbo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(40)
                    .HasColumnName("createdBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.EndDate)
                    .HasColumnType("datetime")
                    .HasColumnName("endDate");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(40)
                    .HasColumnName("modifiedBy")
                    .HasDefaultValueSql("('system')");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifiedDate")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.StartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("startDate");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
