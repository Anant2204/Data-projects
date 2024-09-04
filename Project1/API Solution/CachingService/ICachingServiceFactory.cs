// <copyright file="ICachingServiceFactory.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.API.CachingService
{
    /// <summary>
    /// Handle instantiating memory cache object
    /// </summary>
    public interface ICachingServiceFactory
    {
        /// <summary>
        /// Instantiate memory cache object
        /// </summary>
        /// <returns></returns>
        ICachingService CreateCachingService();
    }
}
