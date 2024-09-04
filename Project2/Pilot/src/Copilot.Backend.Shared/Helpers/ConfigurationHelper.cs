// ***********************************************************************
// <copyright file="ConfigurationHelper.cs" company="Microsoft">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Copilot.Backend.Shared.Helpers
{
    using Microsoft.Extensions.Configuration;
    /// <summary>
    /// Configuration Helper class.
    /// </summary>
    public static class ConfigurationHelper
    {
        /// <summary>
        /// Gets or sets The Configuration field value.
        /// </summary>
        public static IConfiguration? Configuration { get; set; }

        /// <summary>
        /// Getting the configuration value.
        /// </summary>
        /// <typeparam name="T"> T type</typeparam>
        /// <param name="key"> The key value</param>
        /// <returns>Dynamic type</returns>
        public static T? Get<T>(string key)
        {
            return Configuration == null ? default(T) : Configuration.GetValue<T>(key);
        }
    }
}
