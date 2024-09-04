// <copyright file="GetCacheDetails.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.API.Utility
{
    public static class GetCacheDetails
    {
        public static string GetCacheKeyForAllItems(int version, int userId)
        {
            // Assuming a format like "AllItems_v{version}"
            return $"AllItems_v{userId +"_"+version}";
        }
    }
}
