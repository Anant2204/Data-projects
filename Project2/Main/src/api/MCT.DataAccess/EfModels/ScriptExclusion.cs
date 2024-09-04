// <copyright file="ScriptExclusion.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class ScriptExclusion
    {
        public int Id { get; set; }
        public int ScriptId { get; set; }
        public string Alias { get; set; } = null!;
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual ScriptTaxonomyContent Script { get; set; } = null!;
    }
}
