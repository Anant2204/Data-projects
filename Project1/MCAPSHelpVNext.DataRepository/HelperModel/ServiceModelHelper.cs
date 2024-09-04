// <copyright file="ServiceModelHelper.cs" company="Microsoft Corporation">
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
    public class ServiceModelHelper
    {
        public int ID { get; set; }
        public string ? Name { get; set; }
        public string ? FinalData { get; set; }
        public bool ? IsNonIRISService { get; set; }
        public bool ? IsDropdownUI { get; set; }
        public string ? AboutService { get; set; }
        public string ? RelatedInformation { get; set; }
        public string ? ServiceCategories { get; set; }
        public bool ? IsPrivate { get; set; }
        public Guid ? DataverseRowID { get; set; }
        public bool ? IsActive { get; set; }
    }
}
