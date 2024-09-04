// <copyright file="NavigationLink.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Models
{
    public class NavigationLink
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Content { get; set; }
        public string? Url { get; set; }
        public string? Key { get; set; }
        public int? ParentLinkId { get; set; }
    }

    public class NavigationResult
    {
        public List<NavigationLink> NavigationLinks { get; set; }
    }

}
