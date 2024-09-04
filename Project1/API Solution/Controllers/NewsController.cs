// <copyright file="NewsController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.API.Helpers;
using MCAPSHelpVNext.API.Services;
using MCAPSHelpVNext.API.Utility;
using MCAPSHelpVNext.Controllers.DTO;
using MCAPSHelpVNext.Controllers.Utility;
using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Diagnostics;
using System.Reflection;
using System.Security.Cryptography;
using WebApi.Helpers;
using System.Resources;

namespace MCAPSHelpVNext.API.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly NewsRepository _newsService;
        private readonly string _correlationID;

       
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(NewsController).Assembly);
        private string _logDescription;
        public NewsController(NewsRepository configService)
        {
            _newsService = configService;
            _correlationID = CorrelationSettings.CorrelationId;
        }


        /// <response code="200">Returns the list of areas.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<AreaDTO>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Retrieves all news",
            Description = "Returns a list of News objects representing all news.",
            OperationId = "GetAll")]
        public IActionResult GetAll()
        {
             _logDescription = rm.GetString("newsKey");

            try
            {
                var result = _newsService.GetAll();
                if (result != null)
                {
                    Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                    return Ok(result);
                }
          
                var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                return new JsonResult(errorResponse);

            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
