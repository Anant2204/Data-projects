// <copyright file="ServiceOwnerDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Controllers.DTO
{
    /// <summary>
    /// ServiceOwnerDTO
    /// </summary>
    public class ServiceOwnerDTO
    {
        /// <summary>
        ///      Property Name - ID.
        ///  </summary>
        public int ID { get; set; }
        /// <summary>
        ///      Property Name - UPN.
        ///  </summary>
        public string UPN { get; set; }

        /// <summary>
        ///      Property Name - IsActive.
        ///  </summary>
        public bool IsActive { get; set; }
    }
}
