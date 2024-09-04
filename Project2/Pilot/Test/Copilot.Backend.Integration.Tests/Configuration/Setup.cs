//-----------------------------------------------------------------------
// <copyright file="Setup.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

using Microsoft.Extensions.Configuration;

namespace Copilot.Backend.Integration.Tests;

/// <summary>
/// The Setup class
/// </summary>
public static class Setup
{
    /// <summary>
    /// The configuration root
    /// </summary>
    private static IConfigurationRoot? config;

    /// <summary>
    /// Initialize a new instance of <see cref="Setup"/> class
    /// </summary>
    static Setup()
    {
        Initialize();
    }

    /// <summary>
    /// Initialize the test environment
    /// </summary>
    public static void Initialize()
    {
        config = new ConfigurationBuilder().AddJsonFile("appconfig.json").AddEnvironmentVariables().Build();
        Environment.SetEnvironmentVariable("CopilotApiBaseUrl", config["Values:CopilotApiBaseUrl"]);
        Environment.SetEnvironmentVariable("CopilotApi-Resource", config["Values:CopilotApi-Resource"]);
        Environment.SetEnvironmentVariable("ADInstances", config["Values:ADInstances"]);
        Environment.SetEnvironmentVariable("ClientId", config["Values:ClientId"]);
        Environment.SetEnvironmentVariable("ClientSecret", config["Values:ClientSecret"]);
        Environment.SetEnvironmentVariable("DatabaseResourceUrl", config["Values:DatabaseResourceUrl"]);
        Environment.SetEnvironmentVariable("IsAzureKeyVaultEnabled", config["Values:IsAzureKeyVaultEnabled"]);
        Environment.SetEnvironmentVariable("BuddyKeyVaultName", config["Values:BuddyKeyVaultName"]);
        Environment.SetEnvironmentVariable("HotfixKeyVaultName", config["Values:HotfixKeyVaultName"]);
        Environment.SetEnvironmentVariable("PerformanceTime", config["Values:PerformanceTime"]);
        Environment.SetEnvironmentVariable("TenantId", config["Values:TenantId"]);
    }
}
