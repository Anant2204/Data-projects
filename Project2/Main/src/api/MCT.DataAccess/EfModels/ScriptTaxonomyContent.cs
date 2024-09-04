// <copyright file="ScriptTaxonomyContent.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class ScriptTaxonomyContent
    {
        public ScriptTaxonomyContent()
        {
            ScriptExclusions = new HashSet<ScriptExclusion>();
        }

        public int Id { get; set; }
        public string CyOrg { get; set; } = null!;
        public string CyRoleSummary { get; set; } = null!;
        public string CyQ1 { get; set; } = null!;
        public string CyQ2 { get; set; } = null!;
        public string FyOrg { get; set; } = null!;
        public string FyRoleSummary { get; set; } = null!;
        public string FyQ1 { get; set; } = null!;
        public string FyQ2 { get; set; } = null!;
        public string? Content { get; set; }
        public string? Status { get; set; }
        public string? Title { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; } = null!;
        public DateTime? ModifiedDate { get; set; }

        public virtual ICollection<ScriptExclusion> ScriptExclusions { get; set; }
    }
}
