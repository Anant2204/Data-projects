// <copyright file="ICachingService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.API.CachingService
{
    /// <summary>
    /// Caching service interface
    /// </summary>
    public interface ICachingService
    {
        /// <summary>
        /// Method to set and fetch cache items
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="getItemCallback"></param>
        /// <param name="expirationTime"></param>
        /// <returns></returns>
        T GetOrSet<T>(string key, Func<T> getItemCallback, TimeSpan expirationTime);
    }
}
