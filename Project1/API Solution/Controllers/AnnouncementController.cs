// <copyright file="AnnouncementController.cs" company="Microsoft Corporation">
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
using MCAPSHelpVNext.DataRepository.Models;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph.ExternalConnectors;
using Swashbuckle.AspNetCore.Annotations;
using System.Data.Entity.Validation;
using WebApi.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MCAPSHelpVnext.Common.Logging;
using MCAPSHelpVNext.API.CachingService;
using MCAPSHelpVNext.API.DTO;

using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.IRepository;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Polly;
using System.Diagnostics;
using System.Web.Http.Results;
using System.Reflection;
using System.Resources;



namespace MCAPSHelpVNext.API.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly AnnouncementService _announcementService;
        private readonly string _correlationID;


        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(AnnouncementController).Assembly);
        private string _logDescription;

        public AnnouncementController(AnnouncementService announcementService, IConfiguration configuration)
        {
            _announcementService = announcementService;
            _configuration = configuration;
            _correlationID = CorrelationSettings.CorrelationId;
        }

        /// <response code="200">OK. Returns a list of announcements.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAnnouncements")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Announcement))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all Announcements",
            Description = "Returns a list of Announcements.",
            OperationId = "GetAnnouncements")]
        public IActionResult GetAnnouncements()
        {
           _logDescription = rm.GetString("announcementKey");

            try
            {
                var result = _announcementService.GetAnnouncements();
                if (result != null)
                {
                    var specificPropertyValues = result.Select(item => new Announcement
                    {
                        ID = item.ID,
                        Title = item.Title,
                        Description = Convert.ToBoolean(_configuration["IsRequiredRawHtml"]) ? item.Description : HtmlParser.ExtractTextFromHtml(item.Description),  // Replace with actual property names
                        StartDate = item.StartDate,
                        EndDate = item.EndDate,
                        IsAnnouncement = item.IsAnnouncement
                        //,IsLarge = item.AnnouncementDescription.ToLower().Contains("width") ? true : false,

                    }).ToList();

                    Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                    return Ok(result);
                }
                
                var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                return new JsonResult(errorResponse);
            }
            catch (Exception ex)
            {                
                           
                throw new ArgumentNullException(ex.Message);
            }
        }
               
    }
}
