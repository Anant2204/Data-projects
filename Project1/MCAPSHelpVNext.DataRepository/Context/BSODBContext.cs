// <copyright file="BSODBContext.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Context
{
    public class BSODBContext : DbContext
    {
        public BSODBContext(DbContextOptions<BSODBContext> options) : base(options)
        {

        }
        public DbSet<Config> Configs { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Segment> Segments { get; set; }
        public DbSet<SubSegment> SubSegments { get; set; }
        public DbSet<UserADGroup> UserADGroups { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }

        public DbSet<ServiceOwnerModel> ServiceOwners { get; set; }

        public DbSet<UserWorkSpace> UserWorkSpaces { get; set; }

        public DbSet<ServiceMapping> ServiceMappings { get; set; }

        public DbSet<ServiceOwnerServiceModel> ServiceOwnerServics { get; set; }

        public DbSet<MyHelpDasboard> MyHelpDasboards { get; set; }

        public DbSet<Announcement> Announcements { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Config
            modelBuilder.Entity<Config>().ToTable("Config", "BSO").HasKey(c => c.Id);
            // Area
            modelBuilder.Entity<Area>().ToTable("Area", "BSO").HasKey(a => a.Id);
            // Role
            modelBuilder.Entity<Role>().ToTable("Role", "BSO").HasKey(r => r.Id);
            // Segment
            modelBuilder.Entity<Segment>().ToTable("Segment", "BSO").HasKey(s => s.Id);
            // SubSegment
            modelBuilder.Entity<SubSegment>().ToTable("SubSegment", "BSO").HasKey(ss => ss.Id);
            // UserADGroup
            modelBuilder.Entity<UserADGroup>().ToTable("UserADGroup", "BSO").HasKey(uag => uag.Id);

            modelBuilder.Entity<MyHelpDasboard>().ToTable("MyHelpDasboard", "BSO").HasKey(uag => uag.Id);

            modelBuilder.Entity<ServiceOwnerServiceModel>().ToTable("ServiceOwnerServices", "BSO").HasNoKey();
            modelBuilder.Entity<User>().ToTable("User", "BSO").HasKey(u => u.Id);
            modelBuilder.Entity<ServiceOwnerModel>().ToTable("ServiceOwner", "BSO").HasKey(u => u.ID);

            modelBuilder.Entity<UserWorkSpace>().ToTable("UserWorkSpaceServices", "BSO").HasKey(u => u.Id);
            // Services
            modelBuilder.Entity<Service>().ToTable("Services", "BSO").HasKey(s => s.Id);
            modelBuilder.Entity<UserADGroupIDList>().HasNoKey();
            // ServiceMapping
            modelBuilder.Entity<ServiceMapping>().ToTable("ServiceMapping", "BSO")



        .HasKey(sm => new { sm.ServiceID, sm.ServiceArea, sm.ServiceRole, sm.ServiceAzureADGroup, sm.ServiceSegment, sm.ServiceSubsegment });

            //UserADGroupMapping
            ///modelBuilder.Entity<UserADGroupMapping>().ToTable("UserADGroupMapping", "BSO").HasKey(uag => uag.Id);
            base.OnModelCreating(modelBuilder);

            //Stored Procedures
            modelBuilder.Entity<UserHelper>().HasNoKey().ToView("GetAllUsers");

            modelBuilder.Entity<UserHelper>().HasNoKey().ToView("AddUser");

            modelBuilder.Entity<UserHelper>().HasNoKey().ToView("UpdateUser");

            modelBuilder.Entity<UserHelper>().HasNoKey().ToView("DeleteUserAndRelatedData");

            modelBuilder.Entity<UserHelper>().HasNoKey().ToView("GetUserByIdFromEmailDetails");

            modelBuilder.Entity<UserHelper>().HasNoKey().ToView("GetUserByIdFromEmailDetailsTest");

            //Service Table
            modelBuilder.Entity<ServiceModelHelper>().HasNoKey().ToView("GetLoggedInServices");

            modelBuilder.Entity<ServiceModelHelper>().HasNoKey().ToView("GetLoggedInServicesByID");

            modelBuilder.Entity<ServiceHelper>().HasNoKey().ToView("GetActiveServicesNotInUserWorkSpace");

            modelBuilder.Entity<ServiceHelper>().HasNoKey().ToView("GetActiveServicesNotInUserWorkSpace_Search");

            modelBuilder.Entity<UserWorkSpaceResult>().HasNoKey().ToView("GetUserWorkSpacesByUserId");

            modelBuilder.Entity<UserWorkSpaceResult>().HasNoKey().ToView("GetUserWorkSpacesByUserIdTest");

            modelBuilder.Entity<UserByIdResult>().HasNoKey().ToView("GetUserByIdFromEmail");

            modelBuilder.Entity<CommonModel>().HasNoKey().ToView("GetAllArea");
            modelBuilder.Entity<CommonModel>().HasNoKey().ToView("GetAllRole");
            modelBuilder.Entity<CommonModel>().HasNoKey().ToView("GetAllSegment");
            modelBuilder.Entity<CommonModel>().HasNoKey().ToView("GetAllSegmentByRole");
            modelBuilder.Entity<CommonModel>().HasNoKey().ToView("GetAllSubSegment");
            modelBuilder.Entity<UpdateUserByObjectModel>().HasNoKey().ToView("UpdateUserByObjectID");
            modelBuilder.Entity<InsertFeedbackHelper>().HasNoKey().ToView("GetFeedback");
            modelBuilder.Entity<InsertFeedbackHelper>().HasNoKey().ToView("InsertFeedback");
            modelBuilder.Entity<NavigationLink>().HasNoKey().ToView("GetAboutNavigationLinks");
            modelBuilder.Entity<AboutMCAPSHELPHtmlContentTableHelper>().HasNoKey().ToView("GetAboutMCAPSHtmlContent");

            modelBuilder.Entity<ServiceGroupAndRequestTypeHelper>().HasNoKey().ToView("GetServiceGroupNRequestTypeDetails");
            modelBuilder.Entity<CatalogFilterModel>().HasNoKey().ToView("GetCatalogFiltersJSON");
            

            // Announcement
            modelBuilder.Entity<Announcement>().ToTable("Announcement", "BSO").HasKey(a => a.ID);
            modelBuilder.Entity<Announcement>().ToView("GetAllAnnouncement").HasKey(a => a.ID);
            modelBuilder.Entity<News>().ToView("GetAllNews").HasKey(a => a.Id);


        }

        
    }

   
}
