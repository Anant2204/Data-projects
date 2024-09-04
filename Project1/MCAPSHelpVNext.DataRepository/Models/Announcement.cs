// <copyright file="Announcement.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace MCAPSHelpVNext.DataRepository.Models
{
    public class Announcement
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(100)]
        public string? Title { get; set; }
                
        [MaxLength(255)]
        public string? Description { get; set; }
                
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool IsAnnouncement { get; set; }

        [MaxLength(50)]
        public string? Type { get; set; }
    }
}
