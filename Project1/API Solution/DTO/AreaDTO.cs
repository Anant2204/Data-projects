// <copyright file="AreaDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System.ComponentModel.DataAnnotations;

namespace MCAPSHelpVNext.Controllers.DTO
{
    public class AreaDTO
    {   
        public int Id { get; set; }
      
        public string Name { get; set; }

        public string  DataverseRowID { get; set; }

        public bool IsActive { get; set; }
    }
}
