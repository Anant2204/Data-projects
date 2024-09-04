// <copyright file="ServiceMapping.cs" company="Microsoft Corporation">
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
    public class ServiceMapping
    {
        public int ServiceID { get; set; }
        public int ServiceArea { get; set; }
        public int ServiceRole { get; set; }
        public int ServiceAzureADGroup { get; set; }
        public int ServiceSegment { get; set; }
        public int ServiceSubsegment { get; set; }

        [MaxLength(255)]
        public Guid DataverseRowID { get; set; }

        public bool IsActive { get; set; }

        [ForeignKey("ServiceID")]
        public virtual Service Service { get; set; }

        [ForeignKey("ServiceArea")]
        public virtual Area ServiceAreaObject { get; set; }

        [ForeignKey("ServiceRole")]
        public virtual Role ServiceRoleObject { get; set; }

        [ForeignKey("ServiceAzureADGroup")]
        public virtual UserADGroup ServiceAzureADGroupObject { get; set; }

        [ForeignKey("ServiceSegment")]
        public virtual Segment ServiceSegmentObject { get; set; }

        [ForeignKey("ServiceSubsegment")]
        public virtual SubSegment ServiceSubsegmentObject { get; set; }

        public bool IsSecuredByAzureADGroup { get; set; }

    }
}
