// <copyright file="CallerIdentity.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    using Validation;

    /// <summary>
    /// Captures the details of the entity invoking the operation being audited.
    /// </summary>
    public class CallerIdentity
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CallerIdentity"/> class.
        /// </summary>
        /// <param name="callerIdentityType">The type of the caller identity.</param>
        /// <param name="callerIdentityValue">The value of the caller identity.</param>
        public CallerIdentity(CallerIdentityType callerIdentityType, string callerIdentityValue)
        {
            Requires.NotNull(callerIdentityValue, nameof(callerIdentityValue));

            this.CallerIdentityType = callerIdentityType;
            this.CallerIdentityValue = callerIdentityValue;
        }

        /// <summary>
        /// Gets or sets the value corresponding to the caller identity type.
        /// </summary>
        public string CallerIdentityValue { get; set; }

        /// <summary>
        /// Gets or sets the type of the caller identity.
        /// </summary>
        /// <value>
        /// The type of the caller identity.
        /// </value>
        public CallerIdentityType CallerIdentityType { get; set; }
    }
}