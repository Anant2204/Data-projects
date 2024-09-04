// <copyright file="InMemoryCachingServiceFactory.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Microsoft.Extensions.Caching.Memory;

namespace MCAPSHelpVNext.API.CachingService
{
    /// <summary>
    /// Handle instantiating memory cache object
    /// </summary>
    public class InMemoryCachingServiceFactory : ICachingServiceFactory
    {
        /// <summary>
        /// Instantiate memory cache object
        /// </summary>
        /// <returns></returns>
        public ICachingService CreateCachingService()
        {
            return new InMemoryCachingService(new MemoryCache(new MemoryCacheOptions()));
        }
    }
}
