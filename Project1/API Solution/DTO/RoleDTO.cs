// <copyright file="RoleDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System.ComponentModel.DataAnnotations;

namespace MCAPSHelpVNext.Controllers.DTO
{
    /// <summary>
    /// RoleDTO
    /// </summary>
    public class RoleDTO
    {
        /// <summary>
        ///      Property Name - Id.
        ///  </summary>
        public int Id { get; set; }


        /// <summary>
        ///      Property Name - Name.
        ///  </summary>
        public string Name { get; set; }


        /// <summary>
        ///      Property Name - DataverseRowID.
        ///  </summary>
        public string DataverseRowID { get; set; }

        /// <summary>
        ///      Property Name - IsActive.
        ///  </summary>
        public bool IsActive { get; set; }
    }
}
