// <copyright file="UserADGroupDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System.ComponentModel.DataAnnotations;

namespace MCAPSHelpVNext.API.DTO
{
    public class UserADGroupDTO
    {
        public int Id { get; set; }    
        public string Name { get; set; }   
        public Guid DataverseRowID { get; set; }
        public bool IsActive { get; set; }
        public string? GroupID { get; set; }
    }
}
