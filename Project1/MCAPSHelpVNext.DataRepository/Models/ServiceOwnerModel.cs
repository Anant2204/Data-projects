// <copyright file="ServiceOwnerModel.cs" company="Microsoft Corporation">
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
    public class ServiceOwnerModel
    {
        [Key]
        public int ID { get; set; }
        public string UPN { get; set; }

        public bool IsActive { get; set; }
    }
}
