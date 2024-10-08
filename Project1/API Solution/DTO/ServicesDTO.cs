﻿// <copyright file="ServicesDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MCAPSHelpVNext.Controllers.DTO
{
    public class ServicesDTO
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(500)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string? IRIS_Utterance { get; set; }

        [MaxLength(100)]
        public string? TileName { get; set; }

        [MaxLength]
        public string? AboutService { get; set; }

        [MaxLength]
        public string? RelatedInformation { get; set; }

        public bool? IsNonIRISService { get; set; }

        [MaxLength]
        public string? ServiceRequestFormLink { get; set; }

        public bool? IsDropdownUI { get; set; }

        [MaxLength]
        public string? ServiceDropDownLinks { get; set; }

        [MaxLength]
        public string? ServiceCategories { get; set; }

        


        public bool? IsPrivate { get; set; }

        [MaxLength(255)]
        public Guid? DataverseRowID { get; set; }

        public bool IsActive { get; set; }

        [JsonIgnore]
        public bool? IsLarge { get; set; }

        public bool? IsSecuredByAzureADGroup {get;set;}
     

        public string? AzureADGroupName { get; set;}

        [MaxLength(2000)]
        public string? WelcomeMessage { get; set;}
        public string? UPN { get; set; }

        public string? DisplayName { get; set; }

        public string ? IrisAppName { get; set; }
        public bool? IsExistInWorkspace { get; set; }

    }
}
