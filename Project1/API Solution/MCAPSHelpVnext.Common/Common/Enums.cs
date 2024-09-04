// <copyright file="Enum.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Common
{
    /// <summary>
    /// Cache Database.
    /// </summary>
    public enum RedisCacheDatabase
    {
        /// <summary>
        /// The default database
        /// </summary>
        DefaultDb = 0,

        /// <summary>
        /// The azure active directory token database
        /// </summary>
        AzureADTokenDb = 1,

        /// <summary>
        /// The azure active directory token database
        /// </summary>
        VoltaDB = 2,
    }

    /// <summary>
    /// Cache implementation type.
    /// </summary>
    public enum CacheImplementationType
    {
        /// <summary>
        /// The uesr memory implementation.
        /// </summary>
        UserMemory,

        /// <summary>
        /// The redis cache implementation
        /// </summary>
        RedisCache,
    }
}
