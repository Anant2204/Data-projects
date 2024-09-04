// ***********************************************************************
// <copyright file="TelemetryConfigurationHelper.cs" company="Microsoft">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Copilot.Backend.Logger.Core
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.ApplicationInsights.DataContracts;
    using Microsoft.ApplicationInsights.Extensibility;

    /// <summary>
    /// The telemetry configuration helper
    /// </summary>
    public class TelemetryConfigurationHelper
    {
        /// <summary>
        /// The maximum trace dependency with duration
        /// </summary>
        private const int MaxTraceDependencyWithDuration = 250;

        /// <summary>
        /// Configures the telemetry filter.
        /// </summary>
        public static void ConfigureTelemetryFilter()
        {
            // Add the telemetry initializers that links telemetry to the current operation.
#pragma warning disable CS0618 // Type or member is obsolete
            TelemetryConfiguration.Active.TelemetryInitializers.Add(new OperationCorrelationTelemetryInitializer());
#pragma warning restore CS0618 // Type or member is obsolete

            // Build the telemetry processor chain
#pragma warning disable CS0618 // Type or member is obsolete
            TelemetryConfiguration.Active.TelemetryProcessorChainBuilder
#pragma warning restore CS0618 // Type or member is obsolete
                .Use(next => new OperationFilterProcessor(next)
                {
                    AlwaysLogExceptions = true,
                    AlwaysLogFailedDependencies = true,
                    AlwaysTraceDependencyWithDuration = TimeSpan.FromMilliseconds(MaxTraceDependencyWithDuration),
                    AlwaysLogOperations = { },
                    MinAlwaysTraceLevel = SeverityLevel.Warning,
                    IncludeOperationLessTelemetry = true
                })
                .Build();
        }
    }
}
