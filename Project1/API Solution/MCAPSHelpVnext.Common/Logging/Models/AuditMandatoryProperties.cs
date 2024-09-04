// <copyright file="AuditMandatoryProperties.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    using Microsoft.Azure.Amqp.Framing;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// The set of properties that are required to be provided by the user in order for the audit event to be logged.
    /// </summary>
    public class AuditMandatoryProperties
    {
        /// <summary>
        /// The property value separator.
        /// </summary>
        private const string PropertyValueSeparator = "__";

        /// <summary>
        /// The property value escape separator.
        /// </summary>
        private const string PropertyValueSeparatorEsc = "&&und";

        /// <summary>
        /// Initializes a new instance of the <see cref="AuditMandatoryProperties"/> class.
        /// </summary>
        public AuditMandatoryProperties()
        {
            this.AuditCategories = new HashSet<AuditEventCategory>();
            this.CallerIdentities = new List<CallerIdentity>();
            this.TargetResources = new List<TargetResource>();
        }

        /// <summary>
        /// Gets the collection of all audit categories that apply to this audit event.
        /// </summary>
        public HashSet<AuditEventCategory> AuditCategories { get; private set; }

        /// <summary>
        /// Gets or sets name of the operation being audited. E.g. CreateStorageAccount.
        /// </summary>
        public string OperationName { get; set; }

        /// <summary>
        /// Gets or sets the result of the operation being audited.
        /// </summary>
        public OperationResult ResultType { get; set; }

        /// <summary>
        /// Gets the collection of caller identities that apply to the operation being audited.
        /// </summary>
        public List<CallerIdentity> CallerIdentities { get; private set; }

        /// <summary>
        /// Gets the collection of target resources that apply to the operation being audited.
        /// </summary>
        public List<TargetResource> TargetResources { get; private set; }

        /// <summary>
        /// Add a new audit category that applies to this audit event.
        /// </summary>
        /// <param name="auditEventCategory">The new audit category that applies to this audit event.</param>
        /// <returns> Whether the new audit category could be added. Will return false if audit category was already added previously.
        /// </returns>
        public bool AddAuditCategory(AuditEventCategory auditEventCategory)
        {
            return this.AuditCategories.Add(auditEventCategory);
        }

        /// <summary>
        /// Gets the string representation of the collection of audit categories that apply to this audit event.
        /// </summary>
        /// <returns>The string representation of the collection of audit categories.</returns>
        public string GetAuditEventCategoryEnumeration()
        {
            if (!this.AuditCategories.Any())
            {
                return string.Empty;
            }

            return string.Join(PropertyValueSeparator, this.AuditCategories.Select(x => x.ToString().Replace(PropertyValueSeparator, PropertyValueSeparatorEsc)));
        }

        /// <summary>
        /// Add a new caller identity to the collection of caller identities that apply to this audit operation.
        /// </summary>
        /// <param name="callerIdentity">The new caller identity to be added to the caller identity collection.</param>
        public void AddCallerIdentity(CallerIdentity callerIdentity)
        {
            this.CallerIdentities.Add(callerIdentity);
        }

        /// <summary>
        /// Add a range of caller identities to the collection of caller identities that apply to this audit operation.
        /// </summary>
        /// <param name="callerIdentities"> The collection of caller identities to be added to the caller identities collection.
        /// </param>
        public void AddCallerIdentities(CallerIdentity[] callerIdentities)
        {
            this.CallerIdentities.AddRange(callerIdentities);
        }

        /// <summary>
        /// CallerIdentityInfo
        /// </summary>
        public class CallerIdentityInfo
        {
            public string? CallerIdentityTypes { get; set; }
            public string? CallerIdentityValues { get; set; }
        }

        /// <summary>
        /// Get the string representation of the caller identity types and caller identity values from the caller identity collection.
        /// </summary>
        /// <param name="callerIdentityTypes">The string representation of the caller identity types.</param>
        /// <param name="callerIdentityValues">The string representation of the caller identity values.</param>
        public CallerIdentityInfo GetCallerIdentityEnumerations()
        {
            var callerIdentities = this.CallerIdentities;

            if (!callerIdentities.Any())
            {
                return new CallerIdentityInfo();
            }

            var callerIdentityTypes = string.Join(PropertyValueSeparator, callerIdentities.Select(c => c.CallerIdentityType.ToString()));
            var callerIdentityValues = string.Join(PropertyValueSeparator, callerIdentities.Select(c => c.CallerIdentityValue.Replace(PropertyValueSeparator, PropertyValueSeparatorEsc)));

            return new CallerIdentityInfo
            {
                CallerIdentityTypes = callerIdentityTypes,
                CallerIdentityValues = callerIdentityValues
            };
        }

        /// <summary>
        /// Add a new target resource to the collection of target resources that apply to this audit operation.
        /// </summary>
        /// <param name="targetResource">The target resource to be added.</param>
        public void AddTargetResource(TargetResource targetResource)
        {
            this.TargetResources.Add(targetResource);
        }

        /// <summary>
        /// Add a range of target resources to the collection of caller identities that apply to this audit operation.
        /// </summary>
        /// <param name="targetResources">The collection of target resources to be added to the collection of target resources that apply to this audit operation.
        /// </param>
        public void AddTargetResources(TargetResource[] targetResources)
        {
            this.TargetResources.AddRange(targetResources);
        }

        /// <summary>
        /// TargetResourceInfo
        /// </summary>
        public class TargetResourceInfo
        {
            public string? TargetResourceTypes { get; set; }
            public string? TargetResourceNames { get; set; }
        }

        /// <summary>
        /// Get the string representation of the target resource types and target resource names from the target resource collection.
        /// </summary>
        /// <param name="targetResourceTypes">The string representation of the target resource types.</param>
        /// <param name="targetResourceNames">The string representation of the target resource names.</param>
        public TargetResourceInfo GetTargetResourceEnumerations()
        {
            var targetResources = this.TargetResources;

            if (!targetResources.Any())
            {
                return new TargetResourceInfo();
            }

            var targetResourceTypes = string.Join(PropertyValueSeparator, targetResources.Select(c => c.TargetResourceType.Replace(PropertyValueSeparator, PropertyValueSeparatorEsc)));
            var targetResourceNames = string.Join(PropertyValueSeparator, targetResources.Select(c => c.TargetResourceName.Replace(PropertyValueSeparator, PropertyValueSeparatorEsc)));

            return new TargetResourceInfo
            {
                TargetResourceTypes = targetResourceTypes,
                TargetResourceNames = targetResourceNames
            };
        }


    }
}