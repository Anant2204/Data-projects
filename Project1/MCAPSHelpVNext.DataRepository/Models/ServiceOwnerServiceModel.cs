// <copyright file="ServiceOwnerServiceModel.cs" company="Microsoft Corporation">
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
    public class ServiceOwnerServiceModel
    {
        
        public int ServiceID { get; set; }

        public int? ServiceOwnerID { get; set; }

        [ForeignKey("ServiceID")]
        public virtual Service Service { get; set; }

        [ForeignKey("ServiceOwnerID")]
        public virtual ServiceOwnerModel ServiceOwner { get; set; }
    }
}
