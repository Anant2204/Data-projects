// <copyright file="TargetResource.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    /// <summary>
    /// Captures the details of the resource impacted by the operation being audited.
    /// </summary>
    public class TargetResource
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TargetResource"/> class.
        /// </summary>
        /// <param name="targetResourceType">The target resource type.</param>
        /// <param name="targetResourceName">The name for the target resource.</param>
        public TargetResource(string targetResourceType, string targetResourceName)
        {
            this.TargetResourceType = targetResourceType;
            this.TargetResourceName = targetResourceName;
        }

        /// <summary>
        /// Gets or sets the type of the resource acted upon by the operation being audited. E.g. StorageAccount, VM, Service etc.
        /// </summary>
        public string TargetResourceType { get; set; }

        /// <summary>
        /// Gets or sets the name of the resource acted upon be the operation being audited.
        /// </summary>
        public string TargetResourceName { get; set; }
    }
}