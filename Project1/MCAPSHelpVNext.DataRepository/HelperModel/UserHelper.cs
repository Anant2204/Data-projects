// <copyright file="UserHelper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class UserHelper
    {

        public int Id { get; set; }
        public string UPN { get; set; }
        public string? Oid { get; set; }

        public int? UserArea { get; set; }
        public int? UserRole { get; set; }       
        
        public virtual List<UserADGroupIDList>? UserADGroupID { get; set; }
        
        public int? Segment { get; set; }
        public int? SubSegment { get; set; }
       
        public Guid? DataverseRowID { get; set; }

        public bool? IsActive { get; set; }

        public string? UserAreaName { get; set; }
        public string? UserRoleName { get; set; }
        public string? UserSegmentName { get; set; }
        public string? UserSubSegmentName { get; set; }

        public bool? IsWelcomeMessage { get; set; }

    }
    }

