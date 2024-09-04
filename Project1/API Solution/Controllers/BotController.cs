// <copyright file="BotController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVnext.Api.Attributes;
//using MCAPSHelpVnext.Api.Models;
using MCAPSHelpVnext.Api.Services;
using MCAPSHelpVNext.Api.Auth;
using MCAPSHelpVNext.Api.Shared;
using MCAPSHelpVNext.Api.Models;
using MCAPSHelpVNext.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Swashbuckle.AspNetCore.Annotations;
using System.Diagnostics;
using System.Security.Claims;
using Polly;
using Microsoft.Identity.Web;
using System.Diagnostics.Tracing;
using MCAPSHelpVnext.Common.Logging;
using Azure.Core;
using Microsoft.Graph.ExternalConnectors;
using WebApi.Helpers;
using MCAPSHelpVNext.API.Services;
using MCAPSHelpVNext.API.Utility;

namespace MCAPSHelpVNext.Api.Controllers
{
    /// <summary>
    /// BotController
    /// </summary>
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class BotController : ControllerBase
    {
        private readonly ApplicationStateOptions applicationState;
        private readonly IConfiguration _configuration;
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly string _correlationID;


        /// <summary>
        /// Initializes a new instance of the class.
        /// </summary>
        /// <param name="tokenAcquisition"></param>
        /// <param name="applicationState">The <see cref="ApplicationStateOptions"/> options type.</param>
        /// <param name="configuration"></param>
        public BotController(ITokenAcquisition tokenAcquisition, IOptions<ApplicationStateOptions> applicationState, IConfiguration configuration)
        {
            if (applicationState == null)
            {
                throw new ArgumentNullException(nameof(applicationState));
            }

            this.applicationState = applicationState.Value;
            this._configuration = configuration;
            this._tokenAcquisition = tokenAcquisition;
            this._correlationID = CorrelationSettings.CorrelationId;
        }


        /// <summary>
        /// GetToken()
        /// </summary>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        [HttpGet]
        [Route("/v1/mcapshelp/bot/GetToken")]
        [ValidateModelState]
        [SwaggerOperation("GetToken")]
        [SwaggerResponse(statusCode: 200, type: typeof(BotConfig), description: "Successful operation")]
        public async Task<IActionResult> GetToken()
        {
            var start = DateTimeOffset.UtcNow;
            var duration = Stopwatch.StartNew();
            var responseCode = "200";
            var success = false;
           

            Instrument.Logger.LogMessage(EventLevel.Informational, Guid.NewGuid().ToString(), $"{this.GetType()}.GetToken:Starting");

            string? user = this.User?.Identity?.GetAlias();
            if (user == null)
            {
                return this.Forbid("Error retreiving user context");
            }

            try
            {
                string json = string.Empty;
                string DLTokenEndpoint = string.Empty;
                var userObjectID = string.Empty;
                var token = string.Empty;
                DLTokenEndpoint = _configuration.GetValue<string>("IRIS:APIBaseEndPoint"); 
                string irisResourceId = _configuration.GetValue<string>("IRIS:ResourceId");
            
                userObjectID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

                string[] scopes = new string[] { irisResourceId+"/.default" };


                token = await _tokenAcquisition.GetAccessTokenForUserAsync(scopes);

                var config = new BotConfig()
                {
                    token = token,
                    UserId = userObjectID,
                    DisplayName = this.User?.Identity.Name,
                    EmailAddress = this.User?.Identity.Name,
                    IrisBaseApiUrl = DLTokenEndpoint
                };
                success = true;
                Instrument.Logger.LogMessage(EventLevel.Informational, _correlationID, $"{this.GetType()}.GetToken:Ended");

                return Ok(config);
            }
            catch (BadHttpRequestException ex)
            {
                responseCode = ex.StatusCode.ToString();

                Instrument.Logger.LogException(_correlationID, $"error in GetToken for {User.Identity.Name}.", ex, new Dictionary<string, string>());

                
                throw new ArgumentException(ex.Message);
            }
            catch (Exception ex)
            {
                responseCode = "500";
                Instrument.Logger.LogException(_correlationID, $"error in GetToken for {User.Identity.Name}.", ex, new Dictionary<string, string>());
                //return this.StatusCode(500, "Server error encounterd while getting the user role
                 throw new ArgumentException(ex.Message);
            }
            finally
            {
                if (this.applicationState.LogRequestResponse)
                {
                   Instrument.Logger.LogRequest(_correlationID, "GetToken", "GET", start, TimeSpan.FromMilliseconds(duration.ElapsedMilliseconds), responseCode, success, new Dictionary<string, string>(), new Dictionary<string, double>());
                }
            }
        }
    }
}
