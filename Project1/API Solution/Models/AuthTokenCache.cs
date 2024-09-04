////// <copyright file="AuthTokenCache.cs" company="Microsoft Corporation">
////// copyright (c) Microsoft Corporation. All rights reserved.
////// </copyright>
////// <author></author>
////// <date></date>
////// <summary></summary>

////using Microsoft.Extensions.Caching.Memory;
////using Microsoft.Identity.Client;
//////using Microsoft.IdentityModel.Clients.ActiveDirectory;

////namespace MCAPSHelpVnext.Api.Models
////{
////    public class AuthTokenCache: TokenCache
////    {
////        private static ReaderWriterLockSlim SessionLock = new ReaderWriterLockSlim(LockRecursionPolicy.NoRecursion);
////        readonly string UserObjectId = string.Empty;
////        readonly string CacheId = string.Empty;
////        private readonly IMemoryCache _memoryCache;


////        [Obsolete("Auth Token Cache")]
////        public AuthTokenCache(string userId, IMemoryCache memoryCache)
////        {
////            UserObjectId = userId;
////            _memoryCache = memoryCache;
////            CacheId = UserObjectId + "_TokenCache";
////            this.AfterAccess = AfterAccessNotification;
////            this.BeforeAccess = BeforeAccessNotification;
////            Load();
////        }

////        [Obsolete("Load")]
////        public void Load()
////        {
////            SessionLock.EnterReadLock();
////            this.Deserialize((byte[])_memoryCache.Get(CacheId));
////            SessionLock.ExitReadLock();
////        }

////        [Obsolete("Persist")]
////        public void Persist()
////        {
////            SessionLock.EnterWriteLock();

////            // Optimistically set HasStateChanged to false. We need to do it early to avoid losing changes made by a concurrent thread.
////            this.HasStateChanged = false;

////            // Reflect changes in the persistent store
////            _memoryCache.Set<byte[]>(CacheId,this.Serialize());
////            SessionLock.ExitWriteLock();
////        }

////        // Empties the persistent store.
////        public override void Clear()
////        {
////            base.Clear();
////            _memoryCache.Remove(CacheId);
////        }

////        // Triggered right before ADAL needs to access the cache.
////        // Reload the cache from the persistent store in case it changed since the last access.
////        [Obsolete("BeforeAccessNotification")]
////        void BeforeAccessNotification(TokenCacheNotificationArgs args)
////        {
////            Load();
////        }

////        // Triggered right after ADAL accessed the cache.
////        [Obsolete("AfterAccessNotification")]
////        void AfterAccessNotification(TokenCacheNotificationArgs args)
////        {
////            // if the access operation resulted in a cache update
////            if (this.HasStateChanged)
////            {
////                Persist();
////            }
////        }
////    }
////}
