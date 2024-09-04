// <copyright file="ServiceGroupAndRequestTypeHelper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.HelperModel
{
    public class ServiceGroupAndRequestTypeHelper
    {
        public string ?ServiceGroupName { get; set; }
        public string ? ServiceGroupDescription { get; set; }
        public int ServiceGroupID { get; set; }
        public string ? RequestTypeName { get; set; }
        public int ?RequestTypeID { get; set; }
        public string ? Relatedinformation { get; set; }
        public string? DisplayName { get; set; }
        public string? UPN { get; set; }
        public string? AboutService { get; set; }
    }
}
