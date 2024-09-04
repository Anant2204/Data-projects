// <copyright file="ConfigController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.API.DTO;
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
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json.Linq;
using Swashbuckle.AspNetCore.Annotations;
using System.Diagnostics;
using System.Reflection;
using WebApi.Helpers;
using System.Resources;
using MCAPSHelpVNext.Controllers.Controllers;

namespace MCAPSHelpVNext.API.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigController : ControllerBase
    {
        private readonly ConfigService _configService;
        private readonly string _correlationID;

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(ConfigController).Assembly);
        private string _logDescription;
        public ConfigController(ConfigService configService)
        {
            _configService = configService;
            _correlationID = CorrelationSettings.CorrelationId;
        }


        /// <response code="200">Returns the list of configurations.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ConfigDTO>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Retrieves all configurations",
            Description = "Retrieves all configurations, returns a list of ConfigDTO objects representing all configurations.",
            OperationId = "GetAll")]

        public IActionResult GetAll()
        {
             _logDescription = rm.GetString("configKey1");

            try
            {
                var result = _configService.GetAll();
                if(result != null)
                {
                    Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                    return Ok(result);

                }
                
                var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                return new JsonResult(errorResponse);
            }
            catch(Exception ex)
            {              
                
                throw new ArgumentException(ex.Message);
            }
        }

        /// <param name="objDTO">The ConfigDTO object representing the configuration to be added.</param>
        /// <returns>Returns 201 Created with the newly created configuration in the response body.</returns>
        /// <response code="201">Created. Returns the newly created configuration.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ConfigDTO))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new configuration",
            Description = "Adds a new configuration. Returns 201 Created with the newly created configuration in the response body.",
            OperationId = "Add")]
        public IActionResult Add([FromBody] ConfigDTO objDTO)
        {
             _logDescription = rm.GetString("configKey2");

            try
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                var collection = new Config
                {
                    Key = objDTO.Key,
                    Value = objDTO.Value                   
                };

                var validationHelper = new ValidationHelper<ConfigDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }

                _configService.AddConfig(collection);
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);
                return CreatedAtAction(nameof(GetService), new { id = _configService }, _configService);
            }
            catch (Exception ex)
            {               
                
                throw new ArgumentException(ex.Message);
            }
        }


        /// <param name="Id">The ID of the configuration to be retrieved.</param>
        /// <returns>Returns 200 OK with the retrieved configuration in the response body.</returns>
        /// <response code="200">OK. Returns the retrieved configuration.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ConfigDTO))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Retrieves a configuration by ID",
            Description = "Retrieves a configuration by ID. Returns 200 OK with the retrieved configuration in the response body.",
            OperationId = "GetById")]
        public IActionResult GetService(int Id)
        {
             _logDescription = rm.GetString("configKey3");

            try
            {
                    if (Id != 0)                   
                    {
                        var result = _configService.FindConfig(Id);
                    if (result != null)
                    {
                        Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);
                        return Ok(result);
                    }         
                 
                }
                
                var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                return new JsonResult(errorResponse);
            }
            catch (Exception ex)
            {               
               
                throw new ArgumentException(ex.Message);
            }
        }


        /// <param name="configDTO">The ConfigDTO object representing the configuration to be updated.</param>
        /// <returns>Returns 200 OK with the updated configuration in the response body.</returns>
        /// <response code="200">OK. Returns the updated configuration.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPatch("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ConfigDTO))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates a configuration by ID",
            Description = "Updates a configuration by ID. Returns 200 OK with the updated configuration in the response body.",
            OperationId = "Update")]
        public IActionResult Patch([FromBody] ConfigDTO configDTO)
        {
             _logDescription = rm.GetString("configKey4");

            try
            {
                if (configDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);

                }
                var existingServiceOwner = _configService.FindConfig(configDTO.Id);
                if (existingServiceOwner == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }

                existingServiceOwner.Key = configDTO.Key;
                existingServiceOwner.Value = configDTO.Value;

                _configService.UpdateConfig(existingServiceOwner);

                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);

                return Ok(existingServiceOwner);
            }
            catch (Exception ex)
            {   
                throw new ArgumentException(ex.Message);
            }
        }

        /// <param name="Id">The ID of the configuration to be deleted.</param>
        /// <returns>Returns NoContent on successful deletion.</returns>
        /// <response code="204">NoContent on successful deletion.</response>
        /// <response code="400">Bad Request if the ID is invalid.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("Delete/{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes a configuration by ID",
            Description = "Deletes a configuration by ID. Returns NoContent on successful deletion.",
            OperationId = "Delete")]
        public IActionResult Delete(int Id)
        {
             _logDescription = rm.GetString("configKey5");
            string _logInvalidDescription = rm.GetString("configInvalidKey");

            try
            {

                if (Id <= 0)
                {
                    ModelState.AddModelError("ObjId", _logInvalidDescription);
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _configService.DeleteConfig(Id);
                Logging.LogRequest(_correlationID, _logDescription, "Delete", "200", true);
                return NoContent();
            }
            catch(Exception ex)
            {               
                
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
