// <copyright file="UserWorkSpace.cs" company="Microsoft Corporation">
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
    public class UserWorkSpace
    {
        [Key]
        public int Id { get; set; }

        public int? UserID { get; set; }

        public int? ServiceID { get; set; }
        public bool? IsActive { get; set; }
        public int? Version { get; set; }

        public DateTime ? TransactionTime { get; set; }

        [ForeignKey("ServiceID")]
        public virtual Service Service { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }

    }
}
