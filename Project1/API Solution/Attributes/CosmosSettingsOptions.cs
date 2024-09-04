// <copyright file="CosmosSettingsOptions.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Api.Attributes
{
    /// <summary>
    /// The Options class for reading the Cosmos Settings.
    /// </summary>
    public class CosmosSettingsOptions
    {
        /// <summary>
        /// The root namespace for the settings section.
        /// </summary>
        public static readonly string EstimatesCosmosSettings = "EstimatesDbConfig";

        /// <summary>
        /// The root namespace for the settings section.
        /// </summary>
        public static readonly string CatalogCosmosSettings = "CatalogDbConfig";

        /// <summary>
        /// Gets or sets endpoint for Cosmos client.
        /// </summary>
        public string CosmosEndpoint { get; set; }

        /// <summary>
        /// Gets or sets the cosmos database name.
        /// </summary>
        public string Database { get; set; }

        /// <summary>
        /// Gets or sets the primary connection stringidel time for failover rotation.
        /// </summary>
        public int DisableDurationSeconds { get; set; } = 600;
    }
}
