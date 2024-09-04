// <copyright file="UserWorkSpaceHelper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class UserWorkSpaceHelper
    {
        public int Id { get; set; }
        public int? UserID { get; set; }
        public int? ServiceID { get; set; }

        [NotMapped]
        public virtual ServiceHelper Service { get; set; }
        [NotMapped]
        public virtual UserHelper user { get; set; }
    }
}
