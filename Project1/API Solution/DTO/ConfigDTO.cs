// <copyright file="ConfigDTO.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System.ComponentModel.DataAnnotations;

namespace MCAPSHelpVNext.API.DTO
{
    public class ConfigDTO
    {
        public int Id { get; set; }

        public string Key { get; set; }

       
        public string Value { get; set; }
    }
}
