// <copyright file="ServiceModelHelperDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.API.DTO
{
    /// <summary>
    /// Model - ServiceModelHelperDTO
    /// </summary>
    public class ServiceModelHelperDTO
    {
        /// <summary>
        ///      Property Name - ID.
        ///  </summary>
        public int ID { get; set; }
        /// <summary>
        ///      Property Name - Name.
        ///  </summary>
        public string? Name { get; set; }
        /// <summary>
        ///      Property Name - FinalData.
        ///  </summary>
        public string? FinalData { get; set; }
        /// <summary>
        ///      Property Name - IsNonIRISService.
        ///  </summary>
        public bool? IsNonIRISService { get; set; }
        /// <summary>
        ///      Property Name - IsDropdownUI.
        ///  </summary>
        public bool? IsDropdownUI { get; set; }
        /// <summary>
        ///      Property Name - AboutService.
        ///  </summary>
        public string? AboutService { get; set; }
        /// <summary>
        ///      Property Name - RelatedInformation.
        ///  </summary>
        public string? RelatedInformation { get; set; }
        /// <summary>
        ///      Property Name - ServiceCategories.
        ///  </summary>
        public string? ServiceCategories { get; set; }
        /// <summary>
        ///      Property Name - IsPrivate.
        ///  </summary>
        public bool? IsPrivate { get; set; }
        /// <summary>
        ///      Property Name - DataverseRowID.
        ///  </summary>
        public Guid? DataverseRowID { get; set; }
        /// <summary>
        ///      Property Name - IsActive.
        ///  </summary>
        public bool? IsActive { get; set; }
    }
}
