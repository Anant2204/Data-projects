// <copyright file="ServiceOwnerController.cs" company="Microsoft Corporation">
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
using System.Data.Entity.Validation;
using System.Diagnostics;
using WebApi.Helpers;
using System.Resources;
using MCAPSHelpVNext.API.Controllers;

namespace MCAPSHelpVNext.Controllers.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceOwnerController : ControllerBase
    {

        private readonly ServiceOwnerRepository _serviceOwnerService;
        private readonly string _correlationID;

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(ServiceOwnerController).Assembly);
        private string _logDescription;
        public ServiceOwnerController(ServiceOwnerRepository serviceOwnerService)
        {
            _serviceOwnerService = serviceOwnerService;
            _correlationID = CorrelationSettings.CorrelationId;
        }

       
        /// <returns>Returns OK with the list of service owner services if available.</returns>
        /// <response code="200">OK. The list of service owner services was successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ServiceOwnerModel>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all service owner services",
            Description = "Gets a list of all service owner services.",
            OperationId = "GetAllServiceOwnerServices")]
        public IActionResult GetAll()
        {
             _logDescription = rm.GetString("serviceOwnerKey1");

            try
            {
                var result = _serviceOwnerService.GetAll();
                if(result == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                
                throw new ArgumentException(ex.Message);
            }
        }


        /// <param name="objDTO">The service owner DTO for the new service owner.</param>
        /// <returns>Returns CreatedAtAction with the added service owner if successful.</returns>
        /// <response code="201">Created. The service owner was successfully added.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ServiceOwnerDTO))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new service owner",
            Description = "Adds a new service owner.",
            OperationId = "AddServiceOwner")]
        public IActionResult Add([FromBody] ServiceOwnerDTO objDTO)
        {
             _logDescription = rm.GetString("serviceOwnerKey2");

            try
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var serviceOwnerEntity = new ServiceOwnerModel
                {
                    UPN = objDTO.UPN,
                    IsActive = objDTO.IsActive,
                };

                var validationHelper = new ValidationHelper<ServiceOwnerDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }

                _serviceOwnerService.AddServiceOwner(serviceOwnerEntity);
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);
                return CreatedAtAction(nameof(GetService), new { id = _serviceOwnerService }, _serviceOwnerService);
            }
            catch (Exception ex)
            {
                
                throw new ArgumentException(ex.Message);
                
            }
        }

        /// <param name="Id">The ID of the service owner to retrieve.</param>
        /// <returns>Returns OK with the retrieved service owner if found.</returns>
        /// <response code="200">OK. The service owner was successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ServiceOwnerModel))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Retrieves a service owner by ID",
            Description = "Retrieves a service owner by ID.",
            OperationId = "GetServiceOwnerById")]
        public IActionResult GetService(int Id)
        {
             _logDescription = rm.GetString("serviceOwnerKey3");

            try
            {
                if (Id != 0)
                {
                    var result = _serviceOwnerService.FindServiceOwner(Id);
                    if (result == null)
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

        
        /// <param name="objDTO">The data to update the service owner.</param>
        /// <returns>Returns OK with the updated service owner if successful.</returns>
        /// <response code="200">OK. The service owner was successfully updated.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ServiceOwnerModel))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates a service owner",
            Description = "Updates a service owner with the provided data.",
            OperationId = "UpdateServiceOwner")]
        public IActionResult Patch([FromBody] ServiceOwnerDTO objDTO)
        {
             _logDescription = rm.GetString("serviceOwnerKey4");

            try
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var existingServiceOwner = _serviceOwnerService.FindServiceOwner(objDTO.ID);
                if (existingServiceOwner == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }

                existingServiceOwner.UPN = objDTO.UPN;
                existingServiceOwner.IsActive = objDTO.IsActive;
                _serviceOwnerService.UpdateServiceOwner(existingServiceOwner);
                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);
                return Ok(existingServiceOwner);
            }
            catch (Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
         }

        /// <param name="objId">The ID of the service owner to delete.</param>
        /// <returns>Returns No Content if the service owner was successfully deleted.</returns>
        /// <response code="204">No Content. The service owner was successfully deleted.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("Delete/{objId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes a service owner",
            Description = "Deletes a service owner with the specified ID.",
            OperationId = "DeleteServiceOwner")]
        public IActionResult Delete(int objId)
        {
             _logDescription = rm.GetString("serviceOwnerKey5");

           string  _logInvalidDescription = rm.GetString("serviceOwnerInvalidKey");

            try
            {
                if (objId <= 0)
                {
                    ModelState.AddModelError("ObjId", _logInvalidDescription);
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _serviceOwnerService.DeleteServiceOwner(objId);
                Logging.LogRequest(_correlationID, _logDescription, "Delete", "200", true);
                return NoContent();
            }
            catch (Exception ex)
            {
              
                throw new ArgumentException(ex.Message);
            }
           
        }

    }
}
