// <copyright file="Constants.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    /// <summary>
    /// Defines the constants used by the service.
    /// </summary>
    internal abstract class Constants
    {
        /// <summary>
        /// the margin for double comparision.
        /// </summary>
        public const double Margin = .001D;

        /// <summary>
        /// Collection Name for the consumption estimates.
        /// </summary>
        public const string ConsumptionCollectionName = "estimate";

        /// <summary>
        /// Database Name for the consumption estimates.
        /// </summary>
        public const string ConsumptionDatabaseName = "consumption";

        /// <summary>
        /// Database Name for the consumption estimates.
        /// </summary>
        public const string CatalogDatabaseName = "cataloglookup";

        /// <summary>
        /// Database Name for the consumption estimates.
        /// </summary>
        public const string CatalogResourcesContainer = "resources";

        /// <summary>
        /// Database Name for the consumption estimates.
        /// </summary>
        public const string CatalogRetailPricingContainer = "retailpricing";

        /// <summary>
        /// Database Name for the consumption estimates.
        /// </summary>
        public const string CatalogAhrPricingContainer = "ahrpricing";

        /// <summary>
        /// Partition Key for Caralog Resources Container.
        /// </summary>
        public const string ReourcesContainerPartitionKey = "Retail_1";

        /// <summary>
        /// Stored Procedure Name to Get All Regions from Catalog DB Resources container.
        /// </summary>
        public const string StoredProcGetAllRegions = "GetAllRegions";

        /// <summary>
        /// Stored Procedure Name to Get All Resources Metadata from Catalog DB Resources container.
        /// </summary>
        public const string StoredProcGetAllResources = "GetServiceLevelHierarchy";

        /// <summary>
        /// Stored Procedure Name to Get Pricing for all available SKU's of the given Produc from Catalog DB Pricing container.
        /// </summary>
        public const string StoredProcGetProductPricing = "GetProductPricingById";

        /// <summary>
        /// Created By field in case of Import Scenarios.
        /// </summary>
        public const string CreatedByForImportScenarios = "ose";

        /// <summary>
        /// Entity Type for Opportunity Document.
        /// </summary>
        public const string OpportunityEntityType = "Opportunity";

        /// <summary>
        /// Default Verison for Cosmos Document Type.
        /// </summary>
        public const int DefaultDocumentVerison = 1;

        /// <summary>
        /// Cache Key for Regions.
        /// </summary>
        public const string KeyRegions = "Regions";

        /// <summary>
        /// Cache Key for Resources.
        /// </summary>
        public const string KeyResources = "Resources";

        /// <summary>
        /// Source name for the consumption event.
        /// </summary>
        public const string MessageEventSource = "/OneEstimator/Estimation";

        /// <summary>
        /// Type name for the create event.
        /// </summary>
        public const string EstimateEventCreate = "ConsumptionEstimateV2.Create";

        /// <summary>
        /// Type name for the create event.
        /// </summary>
        public const string EstimateEventClone = "ConsumptionEstimateV2.Clone";

        /// <summary>
        /// Type name for the edit event.
        /// </summary>
        public const string EstimateEventEdit = "ConsumptionEstimateV2.Edit";

        /// <summary>
        /// Type name for the Publish event.
        /// </summary>
        public const string EstimateEventPublish = "ConsumptionEstimateV2.Publish";

        /// <summary>
        /// Type name for the delete event.
        /// </summary>
        public const string EstimateEventDelete = "ConsumptionEstimateV2.Delete";

        /// <summary>
        /// Prefix for the consumption related event subject.
        /// </summary>
        public const string MessageSubjectPrefix = "Estimate/";

        /// <summary>
        /// Default name for the version created as part of publish event.
        /// </summary>
        public const string PublishEventDefaultVersionName = "C1 Published";

        /// <summary>
        /// The constant for time difference threshold in seconds.
        /// </summary>
        public const int TimeDifferenceThresholdSeconds = 5;
    }
}