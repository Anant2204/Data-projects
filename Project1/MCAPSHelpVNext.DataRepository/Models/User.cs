// <copyright file="User.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(255)]
        public string UPN { get; set; }
        public int UserArea { get; set; }
        public int UserRole { get; set; }
      
        public int Segment { get; set; }
        public int SubSegment { get; set; }

        [MaxLength(255)]
        public Guid DataverseRowID { get; set; }

        public bool IsActive { get; set; }

        public bool IsWelcomeMessage { get; set; }

        

        [ForeignKey("Segment")]
        public virtual Segment SegmentObject { get; set; }

        [ForeignKey("SubSegment")]
        public virtual SubSegment SubSegmentObject { get; set; }

        [ForeignKey("UserArea")]
        public  virtual Area UserAreaObject { get; set; }

        [ForeignKey("UserRole")]
        public virtual Role UserRoleObject { get; set; }




    }
}
