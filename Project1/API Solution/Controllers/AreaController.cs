// <copyright file="AreaController.cs" company="Microsoft Corporation">
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
using MCAPSHelpVNext.API.Controllers;

namespace MCAPSHelpVNext.Controllers.Controllers
{
    /// <summary>
    /// AreaController
    /// </summary>
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        private readonly AreaService _areaService;
        private readonly string _correlationID;
  
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(AreaController).Assembly);
        private string _logDescription;

        /// <summary>
        /// Constructor - AreaController
        /// </summary>
        /// <param name="configService"></param>
        public AreaController(AreaService configService)
        {
            _areaService = configService;
            _correlationID = CorrelationSettings.CorrelationId;
        }


        /// <response code="200">Returns the list of areas.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<AreaDTO>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Retrieves all areas",
            Description = "Returns a list of AreaDTO objects representing all areas.",
            OperationId = "GetAll")]
        public IActionResult GetAll()
        {
             _logDescription = rm.GetString("areaKey1");
            try
            {
                var result =   _areaService.GetAll();
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
                
                
                throw new ArgumentNullException(ex.Message);
            }            
        }


        /// <param name="areaDTO">The AreaDTO object representing the area to be added.</param>
        /// <returns>Returns 201 Created with the newly created area in the response body.</returns>
        /// <response code="201">Created. Returns the newly created area.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Area))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new area",
            Description = "Adds a new area. Returns 201 Created with the newly created area in the response body.",
            OperationId = "Add")]
        public IActionResult Add([FromBody] AreaDTO areaDTO)
        {
             _logDescription = rm.GetString("areaKey2");

            try
            {
                if (areaDTO == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                string strGuid = areaDTO.DataverseRowID;
                Guid guid = Guid.Parse(strGuid);

                var serviceOwnerEntity = new Area
                    {
                        Name = areaDTO.Name,
                        DataverseRowID = guid,
                        IsActive = areaDTO.IsActive,
                    };

                    var validationHelper = new ValidationHelper<AreaDTO>();
                    var validationErrors = validationHelper.ValidateObject(areaDTO);

                    if (validationErrors.Any())
                    {
                        
                        var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                        return new JsonResult(errorResponse);
                    }

                    _areaService.AddArea(serviceOwnerEntity);
               
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);

                return CreatedAtAction(nameof(GetService), new { id = _areaService }, _areaService);
            }
            catch (Exception ex)
            {

                
                
                throw new ArgumentNullException(ex.Message);
            }           
        }


      
        /// <param name="Id">The ID of the area to be retrieved.</param>
        /// <returns>Returns the area with the specified ID.</returns>
        /// <response code="200">OK. Returns the area with the specified ID.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Area))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets an area by ID",
            Description = "Returns the area with the specified ID.",
            OperationId = "GetById")]
        public IActionResult GetService(int Id)
        {
             _logDescription = rm.GetString("areaKey3");

            try
            {
                if (Id != 0)
                {
                    var result = _areaService.FindArea(Id);
                    if (result != null)
                    {
                        Logging.LogRequest(_correlationID, _logDescription, "Get", "200", true);
                        return Ok(result);
                    }
                    
                }
                
                var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                return new JsonResult(errorResponse);

            }
            catch (Exception ex)
            {               
                
                throw new ArgumentNullException(ex.Message);
            }
        }


    
        /// <param name="areaDTO">The AreaDTO object representing the area to be updated.</param>
        /// <returns>Returns 200 OK with the updated area in the response body.</returns>
        /// <response code="200">OK. Returns the updated area.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Area))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates an existing area",
            Description = "Updates an existing area. Returns 200 OK with the updated area in the response body.",
            OperationId = "Update")]

        public IActionResult Patch([FromBody] AreaDTO areaDTO)
        {
             _logDescription = rm.GetString("areaKey4");

            try
            {
                if (areaDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var existingServiceOwner = _areaService.FindArea(areaDTO.Id);
                if (existingServiceOwner == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }

                    string strGuid = areaDTO.DataverseRowID;
                    Guid guid = Guid.Parse(strGuid);
                    existingServiceOwner.Id = areaDTO.Id;
                    existingServiceOwner.Name = areaDTO.Name;
                    existingServiceOwner.DataverseRowID = guid;
                    existingServiceOwner.IsActive = areaDTO.IsActive;
                    _areaService.UpdateArea(existingServiceOwner);

                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);
                return Ok(existingServiceOwner);
            }
            catch (Exception ex)
            {
                                
                throw new ArgumentNullException(ex.Message);
            }

        }


        
        /// <param name="Id">The ID of the area to be deleted.</param>
        /// <returns>Returns NoContent on successful deletion.</returns>
        /// <response code="204">NoContent on successful deletion.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("Delete/{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes an area by ID",
            Description = "Deletes an area by ID. Returns NoContent on successful deletion.",
            OperationId = "Delete")]
        public IActionResult Delete(int Id)
        {
             _logDescription = rm.GetString("areaKey5");

          string  _logDescriptionInvalid = rm.GetString("areaInvalidKey");

            try {
                
                if (Id <= 0)
                {
                        ModelState.AddModelError("ObjId", _logDescriptionInvalid);
                        
                        var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                        return new JsonResult(errorResponse);
                }
                _areaService.DeleteArea(Id);
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
