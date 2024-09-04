// <copyright file="TelemetryEnrichment.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Api.Services
{
    using System.Diagnostics.CodeAnalysis;
    using Microsoft.ApplicationInsights.AspNetCore.TelemetryInitializers;
    using Microsoft.ApplicationInsights.Channel;
    using Microsoft.ApplicationInsights.DataContracts;

    /// <summary>
    /// Telemetry enrichment service.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class TelemetryEnrichment : TelemetryInitializerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TelemetryEnrichment"/> class.
        /// </summary>
        /// <param name="httpContextAccessor">The <see cref="IHttpContextAccessor"/> service.</param>
        public TelemetryEnrichment(IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
        }

        /// <inheritdoc/>
        protected override void OnInitializeTelemetry(HttpContext platformContext, RequestTelemetry requestTelemetry, ITelemetry telemetry)
        {
            telemetry.Context.User.AuthenticatedUserId =
                platformContext.User?.Identity?.Name ?? string.Empty;
        }
    }
}
