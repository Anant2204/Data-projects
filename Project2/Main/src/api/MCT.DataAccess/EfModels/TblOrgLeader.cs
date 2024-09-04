// <copyright file="TblOrgLeader.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;

namespace MCT.DataAccess.EfModels
{
    public partial class TblOrgLeader
    {
        public string Manager { get; set; } = null!;
        public string? ConversationRequired { get; set; }
        public bool? TwoLevelApprovalRequired { get; set; }
    }
}
