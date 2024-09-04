
// <copyright file="Logging.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVnext.Common.Logging;
using System.Diagnostics;

namespace MCAPSHelpVNext.API.Utility
{
    public static class Logging
    {
        public static void LogRequest(string tagId, string message, string methodType, string responseCode, bool status)
        {
            var start = DateTimeOffset.UtcNow;
            var duration = Stopwatch.StartNew();           
            

            Instrument.Logger.LogRequest(tagId, message, methodType, start, TimeSpan.FromMilliseconds(duration.ElapsedMilliseconds), responseCode, status, new Dictionary<string, string>(), new Dictionary<string, double>());
        }

        public static void LogException(string tagId, string message, Exception exception)
        {     
            Instrument.Logger.LogException(tagId, message, exception, null, null, 0, null);
        }

    }
}
