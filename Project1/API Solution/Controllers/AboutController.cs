// <copyright file="AboutController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.Api.Shared;
using MCAPSHelpVNext.API.DTO;
using MCAPSHelpVNext.API.Services;
using MCAPSHelpVNext.API.Utility;
using MCAPSHelpVNext.Controllers.DTO;
using MCAPSHelpVNext.Controllers.Utility;
using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph.ExternalConnectors;
using System.Diagnostics;
using System.Reflection;
using System.Security.Cryptography;
using System.Resources;

namespace MCAPSHelpVNext.API.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly AboutRepository _userService;
        private readonly string _correlationID;
       
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(AboutController).Assembly);
        private string _logDescription;

        public AboutController(AboutRepository userService)
        {
            _userService = userService;
            _correlationID = CorrelationSettings.CorrelationId;
        }

        [HttpGet("GetHtmlContent")]
        public IActionResult GetAll()
        {
            _logDescription = rm.GetString("aboutKey");
            try
            {
                var result = _userService.GetHTML();
                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                return Ok(result);
            }
            catch (Exception ex)
            {               
                
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
