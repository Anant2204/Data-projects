// <copyright file="ServiceOwnerServiceController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>


using MCAPSHelpVNext.API.DTO;
using MCAPSHelpVNext.API.Helpers;
using MCAPSHelpVNext.API.Services;
using MCAPSHelpVNext.API.Utility;
using MCAPSHelpVNext.Controllers.Utility;
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

namespace MCAPSHelpVNext.API.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceOwnerServiceController : ControllerBase
    {
        private readonly ServiceOwnerServiceRepository  _serviceOwnerServices;
        private readonly string _correlationID;
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(ServiceOwnerServiceController).Assembly);
        private string _logDescription;

        public ServiceOwnerServiceController(ServiceOwnerServiceRepository serviceOwnerServices)
        {
            _serviceOwnerServices = serviceOwnerServices;
            _correlationID = CorrelationSettings.CorrelationId;
        }

        /// <returns>Returns a list of service owners service.</returns>
        /// <response code="200">OK. The list of service owners service was successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ServiceOwnerServiceModel>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all service owners service",
            Description = "Retrieves a list of all service owners service.",
            OperationId = "GetAllServiceOwners")]
        public IActionResult GetAll()
        {
             _logDescription = rm.GetString("serviceOwnerServiceKey1");

            try
            {
                var result = _serviceOwnerServices.GetAll();
                if (result == null)
                {
                    return BadRequest();
                }
                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                return Ok(result);
            }
            catch(Exception ex)
            {
                Logging.LogException(_correlationID, _logDescription, ex);
                
                throw new ArgumentException(ex.Message);
            }
        }
   
        /// <param name="objDTO">The data for creating the new service owner service.</param>
        /// <returns>Returns the newly created service owner service.</returns>
        /// <response code="201">Created. The service owner service was successfully created.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ServiceOwnerServiceModel))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new service owner service",
            Description = "Creates a new service owner service based on the provided data.",
            OperationId = "AddServiceOwnerService")]
        public IActionResult Add([FromBody] ServiceOwnerServiceDTO objDTO)
        {
             _logDescription = rm.GetString("serviceOwnerServiceKey2");

            try
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);

                }
                var collection = new ServiceOwnerServiceModel
                {
                   ServiceID = objDTO.ServiceID,
                   ServiceOwnerID = objDTO.ServiceOwnerID
                };

                var validationHelper = new ValidationHelper<ServiceOwnerServiceDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _serviceOwnerServices.AddServiceOwner(collection);
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);

                return CreatedAtAction(nameof(GetService), new { id = _serviceOwnerServices }, _serviceOwnerServices);
            }
            catch (Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
        }

        /// <param name="Id">The Id of the service owner service to retrieve.</param>
        /// <returns>Returns the details of the specified service owner service.</returns>
        /// <response code="200">OK. The service owner service was successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ServiceOwnerServiceModel))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets a specific service owner service by Id",
            Description = "Retrieves the details of a specific service owner service based on the provided Id.",
            OperationId = "GetServiceOwnerServiceById")]
        public IActionResult GetService(int Id)
        {
             _logDescription = rm.GetString("serviceOwnerServiceKey3");

            try
            {
                if (Id != 0)
                {
                    var result = _serviceOwnerServices.FindServiceOwner(Id);
                    if(result == null)
                    {
                        return NotFound();
                    }
                    Logging.LogRequest(_correlationID, _logDescription, "Get", "200", true);
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
      
        /// <param name="objDTO">The DTO containing updated information for the service owner service.</param>
        /// <returns>Returns the updated details of the specified service owner service.</returns>
        /// <response code="200">OK. The service owner service was successfully updated.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ServiceOwnerServiceModel))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates a specific service owner service",
            Description = "Modifies the details of a specific service owner service based on the provided ServiceID.",
            OperationId = "UpdateServiceOwnerService")]
        public IActionResult Patch([FromBody] ServiceOwnerServiceDTO objDTO)
        {
             _logDescription = rm.GetString("serviceOwnerServiceKey4");

            try
            {
                if (objDTO == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var result = _serviceOwnerServices.FindServiceOwner(objDTO.ServiceID);
                if (result == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }

                result.ServiceID = objDTO.ServiceID;
                result.ServiceOwnerID = objDTO.ServiceOwnerID;
                _serviceOwnerServices.UpdateServiceOwner(result);
                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                
                throw new ArgumentException(ex.Message);
            }
        }
       
        /// <param name="Id">The ID of the service owner service to delete.</param>
        /// <returns>Returns NoContent if the service owner service was successfully deleted.</returns>
        /// <response code="204">No Content. The service owner service was successfully deleted.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("Delete/{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes a specific service owner service",
            Description = "Deletes a specific service owner service based on the provided ServiceID.",
            OperationId = "DeleteServiceOwnerService")]
        public IActionResult Delete(int Id)
        {
             _logDescription = rm.GetString("serviceOwnerServiceKey5");

           string _logInvalidDescription = rm.GetString("serviceOwnerServiceInvalidKey");

            try
            {
                if (Id <= 0)
                {
                    ModelState.AddModelError("ObjId", _logInvalidDescription);
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _serviceOwnerServices.DeleteServiceOwner(Id);
                Logging.LogRequest(_correlationID, _logDescription, "Delete", "200", true);

                return NoContent();
            }catch(Exception ex)
            {
               
                throw new ArgumentException(ex.Message);

            }
        }
    }
}
