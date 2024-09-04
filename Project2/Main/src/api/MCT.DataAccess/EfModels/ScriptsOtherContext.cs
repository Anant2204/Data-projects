// <copyright file="ScriptsOtherContext.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class ScriptsOtherContext
    {
        public int Id { get; set; }
        public int Seq { get; set; }
        public string? Section { get; set; }
        public string Key { get; set; } = null!;
        public string Type { get; set; } = null!;
        public string ContentType { get; set; } = null!;
        public string Value { get; set; } = null!;
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; } = null!;
        public DateTime ModifiedOn { get; set; }
    }
}
