// <copyright file="SubSegment.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Models
{
    public class SubSegment
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(255)]
        public string Name { get; set; }


        [MaxLength(255)]
        public Guid DataverseRowID { get; set; }


        public int Segment { get; set; }

        [ForeignKey("Segment")]
        public virtual Segment SegmentCollection { get; set; }

        public bool IsActive { get; set; }
    }
}
