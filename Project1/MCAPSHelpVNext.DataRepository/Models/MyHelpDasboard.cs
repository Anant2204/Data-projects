// <copyright file="MyHelpDasboard.cs" company="Microsoft Corporation">
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
    public class MyHelpDasboard
    {
        [Key]       
        public int Id { get; set; }

        public int? UserID { get; set; }

        [MaxLength(500)]
        public string TicketID { get; set; }

        [MaxLength(20)]
        public string TicketStatus { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}
