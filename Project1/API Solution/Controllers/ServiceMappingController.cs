// <copyright file="ServiceMappingController.cs" company="Microsoft Corporation">
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
using WebApi.Helpers;
using System.Resources;
using MCAPSHelpVNext.API.Controllers;

namespace MCAPSHelpVNext.Controllers.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceMappingController : ControllerBase
    {
        private readonly ServiceMappingService _serviceMappingService;
        private readonly string _correlationID;

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(ServiceMappingController).Assembly);
        private string _logDescription;
        public ServiceMappingController(ServiceMappingService serviceMappingService)
        {
            _serviceMappingService =  serviceMappingService;
            _correlationID = CorrelationSettings.CorrelationId;
        }


        /// <response code="200">OK. Returns a list of service mappings.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ServiceMapping))]       
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all service mappings",
            Description = "Returns a list of service mappings.",
            OperationId = "GetAll")]
        public IActionResult GetAll()
        {
             _logDescription = rm.GetString("serviceMapKey1");

            try
            {
                var result = _serviceMappingService.GetAll();
                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                
                throw new ArgumentException(ex.Message);
            }          
        }


        /// <param name="objDTO">The ServiceMappingDTO object representing the service mapping to be added.</param>
        /// <returns>Returns 201 Created with the newly created service mapping in the response body.</returns>
        /// <response code="201">Created. Returns the newly created service mapping.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ServiceMapping))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new service mapping",
            Description = "Adds a new service mapping.",
            OperationId = "Add")]
        public IActionResult Add([FromBody] ServiceMappingDTO objDTO)
        {
             _logDescription = rm.GetString("serviceMapKey2");

            try
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);

                }

                var serviceOwnerEntity = new ServiceMapping
                {
                    ServiceID = objDTO.ServiceID,
                    DataverseRowID = objDTO.DataverseRowID,
                    IsActive = objDTO.IsActive,
                    ServiceArea = objDTO.ServiceArea,
                    ServiceRole = objDTO.ServiceRole,
                    ServiceAzureADGroup = objDTO.ServiceAzureADGroup,
                    ServiceSegment = objDTO.ServiceSegment,
                    ServiceSubsegment = objDTO.ServiceSubsegment
                };

                var validationHelper = new ValidationHelper<ServiceMappingDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _serviceMappingService.AddService(serviceOwnerEntity);
                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                return CreatedAtAction(nameof(GetService), new { id = _serviceMappingService }, _serviceMappingService);
            }
            catch (Exception ex)
            {
                
                throw new ArgumentException(ex.Message);
            }
        }


       
        /// <param name="Id">The ID of the service mapping to be retrieved.</param>
        /// <returns>Returns the service mapping with the specified ID.</returns>
        /// <response code="200">OK. Returns the service mapping with the specified ID.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ServiceMapping))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets a service mapping by ID",
            Description = "Gets a service mapping by ID.",
            OperationId = "GetService")]
        public IActionResult GetService(int Id)
        {
             _logDescription = rm.GetString("serviceMapKey3");

            try
            {
                if (Id != 0)
                {
                    var result = _serviceMappingService.FindService(Id);
                    if(result == null)
                    {
                        
                        var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                        return new JsonResult(errorResponse);

                    }
                    Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                    return Ok(result);
                }
                
                return new JsonResult(ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode));
            }
            catch (Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
        }

      
        /// <param name="Id">The ID of the service mapping to be deleted.</param>
        /// <returns>Returns NoContent on successful deletion.</returns>
        /// <response code="204">NoContent on successful deletion.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("Delete/{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes a service mapping by ID",
            Description = "Deletes a service mapping by ID.",
            OperationId = "Delete")]
        public IActionResult Delete(int Id)
        {
             _logDescription = rm.GetString("serviceMapKey4");

            try
            {
                if (Id != 0)
                {
                    _serviceMappingService.DeleteService(Id);
                    Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                    return NoContent();
                }
                
                var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                return new JsonResult(errorResponse);
            }
            catch (Exception ex)
            {
                
                throw new ArgumentException(ex.Message);
            }
        }


        /// <param name="objDTO">The ServiceMappingDTO object representing the service mapping to be updated.</param>
        /// <returns>Returns 200 OK with the updated service mapping in the response body.</returns>
        /// <response code="200">OK. Returns the updated service mapping.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ServiceMapping))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates an existing service mapping",
            Description = "Updates an existing service mapping.",
            OperationId = "Update")]
        public IActionResult Patch([FromBody] ServiceMappingDTO objDTO)
        {
             _logDescription = rm.GetString("serviceMapKey5");

            try 
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var existingServiceOwner = _serviceMappingService.FindService(objDTO.ServiceID);

                if (existingServiceOwner == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }

                existingServiceOwner.ServiceID = objDTO.ServiceID;
                existingServiceOwner.DataverseRowID = objDTO.DataverseRowID;
                existingServiceOwner.IsActive = objDTO.IsActive;
                existingServiceOwner.ServiceArea = objDTO.ServiceArea;
                existingServiceOwner.ServiceRole = objDTO.ServiceRole;
                existingServiceOwner.ServiceAzureADGroup = objDTO.ServiceAzureADGroup;
                existingServiceOwner.ServiceSegment = objDTO.ServiceSegment;
                existingServiceOwner.ServiceSubsegment = objDTO.ServiceSubsegment;
                _serviceMappingService.UpdateService(existingServiceOwner);
                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                return Ok(existingServiceOwner);
            }
            catch (Exception ex)
            {
                
                throw new ArgumentException(ex.Message);
            }
        }


    }
}
