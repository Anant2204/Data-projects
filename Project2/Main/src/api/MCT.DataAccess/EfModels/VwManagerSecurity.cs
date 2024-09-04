// <copyright file="VwManagerSecurity.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class VwManagerSecurity
    {
        public int? Id { get; set; }
        public string? Ic { get; set; }
        public string? ManagerAlias { get; set; }
        public string Mtype { get; set; } = null!;
        public string? DirectManagerFullName { get; set; }
        public string? DirectManagerAlias { get; set; }
        public string? Proxy { get; set; }
    }
}
