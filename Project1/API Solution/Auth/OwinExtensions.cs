// <copyright file="OwinExtensions.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Microsoft.Owin.Builder;
using Microsoft.Owin.BuilderProperties;
using Owin;
using IApplicationLifetime = Microsoft.AspNetCore.Hosting.IApplicationLifetime;

namespace MCAPSHelpVNext.Api.Auth
{
    /// <summary>
    /// Owin Extension 
    /// </summary>
    public static class OwinExtensions
    {
        /// <summary>
        /// Owin app builder
        /// </summary>
        /// <param name="aspNetCoreApp"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        [Obsolete("NonComplaiant")] 
        public static IApplicationBuilder UseOwinApp(
            this IApplicationBuilder aspNetCoreApp,
            Action<IAppBuilder> configuration)
        {
            return aspNetCoreApp.UseOwin(setup => setup(next =>
            {
                AppBuilder owinAppBuilder = new AppBuilder();

                IApplicationLifetime aspNetCoreLifetime =
                        (IApplicationLifetime)aspNetCoreApp.ApplicationServices.GetService
                        (typeof(IApplicationLifetime));

                AppProperties owinAppProperties = new AppProperties(owinAppBuilder.Properties);

                owinAppProperties.OnAppDisposing =
                       aspNetCoreLifetime?.ApplicationStopping ?? CancellationToken.None;

                owinAppProperties.DefaultApp = next;

                configuration(owinAppBuilder);

                return owinAppBuilder.Build<Func<IDictionary<string, object>, Task>>();
            }));
        }
    }
}

