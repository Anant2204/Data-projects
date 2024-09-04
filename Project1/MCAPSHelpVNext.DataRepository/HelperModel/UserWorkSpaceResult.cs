// <copyright file="UserWorkSpaceResult.cs" company="Microsoft Corporation">
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
    public class UserWorkSpaceResult
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int? ServiceID { get; set; }
       
        public string? IRIS_Utterance { get; set; }
        public string? TileName { get; set; }
        public string? Name { get; set; }
        public string? AboutService { get; set; }
        public Guid? DataverseRowID { get; set; }
        public bool? Service_IsActive { get; set; }
        public bool? Service_IsDropdownUI { get; set; }
        public bool? Service_IsNonIRISService { get; set; }
        public bool? Service_IsPrivate { get; set; }
        public string? ServiceDropDownLinks { get; set; }
        public string? ServiceRequestFormLink { get; set; }
        public string? RelatedInformation { get; set; }
        public string ?ServiceCategories { get; set; }
        public int? Service_IsLarge { get; set; }

        public string? UPN { get; set; }
        public string? DisplayName { get; set; }
        public string? FAQLink { get; set; }
        public string? IrisAppName { get; set; }

        public string ? RequestTypeName { get; set; }




        // Add other properties as needed
    }

}
