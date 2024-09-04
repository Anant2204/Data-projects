// <copyright file="UtilityHelpers.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Helpers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using MCAPSHelpVnext.Common.Logging;
    using Validation;

    /// <summary>
    /// Utility type that includes various extension methods.
    /// </summary>
    public static class UtilityHelpers
    {
        /// <summary>
        /// Extension method to get the activity Id from the <see cref="HttpRequestMessage"/>.
        /// </summary>
        /// <param name="request">The <see cref="HttpRequestMessage"/>.</param>
        /// <returns>The activity Id.</returns>
        public static string GetActivityId(this HttpRequestMessage request)
        {
            Requires.NotNull(request, nameof(request));
            string activityId = null;
            if (request.Headers.Contains(Constants.ActivityIdHeader))
            {
                IEnumerable<string> values = request.Headers.GetValues(Constants.ActivityIdHeader);
                activityId = values.First();
            }

            return activityId;
        }

        /// <summary>
        /// Extension method to set the activity Id in the <see cref="HttpResponseMessage"/>.
        /// </summary>
        /// <param name="response">The <see cref="HttpResponseMessage"/>.</param>
        /// <param name="activityId">The activity Id.</param>
        public static void SetActivityId(this HttpResponseMessage response, string activityId)
        {
            response?.Headers.Add(Constants.ActivityIdHeader, activityId);
        }
    }
}