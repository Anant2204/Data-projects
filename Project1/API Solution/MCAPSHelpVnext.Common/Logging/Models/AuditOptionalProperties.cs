// <copyright file="AuditOptionalProperties.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    /// <summary>
    /// The set of optional properties provided by the user for the audit event to be logged.
    /// </summary>
    public class AuditOptionalProperties
    {
        /// <summary>
        /// Gets or sets the description for the operation result. Include specific value that will help debugging.
        /// </summary>
        public string ResultDescription { get; set; }

        /// <summary>
        /// Gets or sets the IP address of the caller.
        /// </summary>
        public string CallerIpAddress { get; set; }

        /// <summary>
        /// Gets or sets provides a way to identify the cloud instance the audit event is raised from.
        /// </summary>
        public string CloudContext { get; set; }

        /// <summary>
        /// Gets or sets the tracking Id when the operation was done as a request from a customer or as a result of an support request.
        /// </summary>
        public string SupportRequestId { get; set; }

        /// <summary>
        /// Sanitizes this instance of the properties.
        /// </summary>
        internal void Sanitize()
        {
            this.ResultDescription = this.ResultDescription.SanitizeMessage();
            this.CallerIpAddress = this.CallerIpAddress.SanitizeName();
            this.CloudContext = this.CloudContext.SanitizeName();
            this.SupportRequestId = this.SupportRequestId.SanitizeName();
        }
    }
}