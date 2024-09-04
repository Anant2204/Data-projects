using MCAPSHelpVNext.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Azure.Security.KeyVault.Secrets;
using MCAPSHelpVNext.API.Utility;
using MCAPSHelpVNext.Api.Shared;
using MCAPSHelpVNext.API.DTO;
using MCAPSHelpVNext.API.Services;
using MCAPSHelpVNext.Controllers.DTO;
using MCAPSHelpVNext.Controllers.Utility;
using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Graph.ExternalConnectors;
using System.Diagnostics;
using System.Reflection;
using System.Security.Cryptography;
using System.Resources;
using Swashbuckle.AspNetCore.Annotations;

namespace MCAPSHelpVNext.API.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class CDNTokenController : ControllerBase
    {

        private readonly IKeyVaultClient _secretCDNToken;
        private readonly string _correlationID;

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(AboutController).Assembly);
        private string _logDescription;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="secretManager"></param>
        public CDNTokenController(IKeyVaultClient secretManager)
        {
            _secretCDNToken = secretManager;
            _correlationID = CorrelationSettings.CorrelationId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="GetCDNToken"></param>
        /// <returns></returns>
        [HttpGet]
        [SwaggerOperation("GetCDNToken")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        public async Task<IActionResult> GetCDNToken(string cdnKeyVaultName)
        {
            _logDescription = rm.GetString("cdnTokenKey");

            try
            {              

                if (string.IsNullOrEmpty(cdnKeyVaultName))
                {
                    return BadRequest();
                }

                string secretValue = await _secretCDNToken.GetSecretAsync(cdnKeyVaultName);

                if (!string.IsNullOrEmpty(secretValue))
                {
                    Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                    return Ok(secretValue);
                }
                else
                {
                    return NotFound("CDN token not found.");
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);

            }


        }

    }
}