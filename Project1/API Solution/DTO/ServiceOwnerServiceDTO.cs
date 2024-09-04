// <copyright file="ServiceOwnerServiceDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MCAPSHelpVNext.API.DTO
{
    public class ServiceOwnerServiceDTO
    {
   
        public int ServiceID { get; set; }

        public int? ServiceOwnerID { get; set; }

    }
}
