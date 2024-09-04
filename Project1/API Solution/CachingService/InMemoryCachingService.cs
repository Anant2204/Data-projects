// <copyright file="InMemoryCachingService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Microsoft.Extensions.Caching.Memory;
using System;

namespace MCAPSHelpVNext.API.CachingService
{
    /// <summary>
    /// InMemoryCachingService
    /// </summary>
    public class InMemoryCachingService : ICachingService
    {
        private readonly IMemoryCache _memoryCache;
        /// <summary>
        /// Initializes a new instance 
        /// </summary>
        /// <param name="memoryCache"></param>
        public InMemoryCachingService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        /// <summary>
        /// Method to set and fetch cache items
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="getItemCallback"></param>
        /// <param name="expirationTime"></param>
        /// <returns></returns>
        public T GetOrSet<T>(string key, Func<T> getItemCallback, TimeSpan expirationTime)
        {
            if (_memoryCache.TryGetValue(key, out T cachedItem))
            {
                return cachedItem;
            }

            T fetchedItem = getItemCallback();

            var cacheEntryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expirationTime
            };

            _memoryCache.Set(key, fetchedItem, cacheEntryOptions);

            return fetchedItem;
        }
    }

}
