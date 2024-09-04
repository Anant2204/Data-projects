// <copyright file="DimManagerhierarchy.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class DimManagerhierarchy
    {
        public string Ic { get; set; } = null!;
        public string? ManagerAlias { get; set; }
        public string Mtype { get; set; } = null!;
        public string? DirectManagerFullName { get; set; }
        public string? DirectManagerAlias { get; set; }
        public int? Id { get; set; }
        public int? ManagerLevel { get; set; }
    }
}
