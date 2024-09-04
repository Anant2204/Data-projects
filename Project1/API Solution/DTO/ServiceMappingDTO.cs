// <copyright file="ServiceMappingDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MCAPSHelpVNext.Controllers.DTO
{
    /// <summary>
    /// ServiceMappingDTO
    /// </summary>
    public class ServiceMappingDTO
    {
        /// <summary>
        ///      Property Name - ServiceID.
        ///  </summary>
        public int ServiceID { get; set; }
        /// <summary>
        ///      Property Name - ServiceArea.
        ///  </summary>
        public int ServiceArea { get; set; }
        /// <summary>
        ///      Property Name - ServiceRole.
        ///  </summary>
        public int ServiceRole { get; set; }
        /// <summary>
        ///      Property Name - ServiceAzureADGroup.
        ///  </summary>
        public int ServiceAzureADGroup { get; set; }
        /// <summary>
        ///      Property Name - ServiceSegment.
        ///  </summary>
        public int ServiceSegment { get; set; }
        /// <summary>
        ///      Property Name - ServiceSubsegment.
        ///  </summary>
        public int ServiceSubsegment { get; set; }

        /// <summary>
        ///      Property Name - DataverseRowID.
        ///  </summary>
        public Guid DataverseRowID { get; set; }

        /// <summary>
        ///      Property Name - IsActive.
        ///  </summary>
        public bool IsActive { get; set; }

        /// <summary>
        ///      Property Name - IsSecuredByAzureADGroup.
        ///  </summary>
        public bool IsSecuredByAzureADGroup { get; set; }
    }
}
