// <copyright file="SubSegmentDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System.ComponentModel.DataAnnotations;

namespace MCAPSHelpVNext.API.DTO
{
    public class SubSegmentDTO
    {
        public int Id { get; set; }

     
        public string Name { get; set; }
  
        public Guid DataverseRowID { get; set; }

        public bool IsActive { get; set; }
    }
}
