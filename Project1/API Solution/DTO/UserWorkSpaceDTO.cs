// <copyright file="UserWorkSpaceDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MCAPSHelpVNext.Controllers.DTO
{
    /// <summary>
    /// UserWorkSpaceDTO
    /// </summary>
    public class UserWorkSpaceDTO
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// UserId
        /// </summary>
        public int? UserId { get; set; }

        /// <summary>
        /// ServiceId
        /// </summary>
        public int? ServiceId { get; set; }

      


    }
}
