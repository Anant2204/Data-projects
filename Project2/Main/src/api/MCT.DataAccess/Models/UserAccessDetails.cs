// <copyright file="UserAccessDetails.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Models
{
#pragma warning disable CS1591
    public partial class UserAccessDetails
    {
        public string RoleName { get; set; } = string.Empty;

        public string FeatureName { get; set; } = string.Empty;

        public string Permissions { get; set; } = string.Empty;

        public string? DefaultFeature { get; set; } = string.Empty;
    }

#pragma warning restore CS1591
}
