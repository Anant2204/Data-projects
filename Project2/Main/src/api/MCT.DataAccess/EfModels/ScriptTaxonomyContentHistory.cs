// <copyright file="ScriptTaxonomyContentHistory.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.EfModels
{
    public partial class ScriptTaxonomyContentHistory
    {
        public int Id { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? ValidTo { get; set; }

    }
}
