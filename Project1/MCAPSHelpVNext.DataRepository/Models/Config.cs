// <copyright file="Config.cs" company="Microsoft Corporation">
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

namespace MCAPSHelpVNext.DataRepository.Models
{
    public class Config
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Key { get; set; }

        [Required]
        [MaxLength(500)]
        public string Value { get; set; }
    }
}
