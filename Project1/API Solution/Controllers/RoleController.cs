// <copyright file="RoleController.cs" company="Microsoft Corporation">
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
using Microsoft.Owin;
using Swashbuckle.AspNetCore.Annotations;
using WebApi.Helpers;
using System.Resources;
using System.Reflection;
using MCAPSHelpVNext.API.Controllers;

namespace MCAPSHelpVNext.Controllers.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;
        private readonly string _correlationID;
    
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(RoleController).Assembly);
        private string _logDescription;
        public RoleController(RoleService roleService)
        {
            _roleService = roleService;
            _correlationID = CorrelationSettings.CorrelationId;
        }


        /// <response code="200">OK. Returns a list of roles.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Role))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all roles",
            Description = "Gets all roles, Returns a list of roles.",
            OperationId = "GetAll")]
        public  IActionResult GetAll()
        {
             _logDescription = rm.GetString("roleKey1");

            try
            {
                var result =  _roleService.GetAll();
                if(result != null)
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

        /// <param name="objDTO">The RoleDTO object representing the role to be added.</param>
        /// <returns>Returns 201 Created with the newly created role in the response body.</returns>
        /// <response code="201">Created. Returns the newly created role.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Role))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new role",
            Description = "Adds a new role. Returns 201 Created with the newly created role in the response body.",
            OperationId = "Add")]
        public IActionResult Add([FromBody] RoleDTO objDTO)
        {
             _logDescription = rm.GetString("roleKey2");

            try
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                string strGuid = objDTO.DataverseRowID;
                Guid guid = Guid.Parse(strGuid);

                var _serviceObject = new Role
                {
                    Name = objDTO.Name,
                    DataverseRowID = guid,
                    IsActive = objDTO.IsActive
                };

                var validationHelper = new ValidationHelper<RoleDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _roleService.AddRole(_serviceObject);

                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);

                return CreatedAtAction(nameof(GetService), new { id = _serviceObject.Id }, _serviceObject);
            }
            catch (Exception ex)
            {               
                
                throw new ArgumentException(ex.Message);
            }
        }


        /// <param name="Id">The ID of the role to retrieve.</param>
        /// <returns>Returns 200 OK with the role in the response body if found.</returns>
        /// <response code="200">OK. Returns the role with the specified ID.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Role))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets a role by ID",
            Description = "Gets a role by ID. Returns 200 OK with the role in the response body if found.",
            OperationId = "GetService")]
        public IActionResult GetService(int Id)
        {
             _logDescription = rm.GetString("roleKey3");

            try
            {
                if (Id != 0)
                {
                    var result = _roleService.FindRole(Id);                   
                    Logging.LogRequest(_correlationID, _logDescription + Id, "GET", "200", true);
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

        /// <param name="roleDTO">The RoleDTO object representing the role updates.</param>
        /// <returns>Returns 200 OK with the updated role in the response body if successful.</returns>
        /// <response code="200">OK. Returns the updated role.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPatch("Update")]
        [Consumes("application/json")] // Specify the expected request content type
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Role))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates a role",
            Description = "Updates a role. Returns 200 OK with the updated role in the response body if successful.",
            OperationId = "Patch")]
        public IActionResult Patch([FromBody] RoleDTO roleDTO)
        {
             _logDescription = rm.GetString("roleKey4");

            try
            {
                if (roleDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var existingServiceOwner = _roleService.FindRole(roleDTO.Id);
                if (existingServiceOwner == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }

                string strGuid = roleDTO.DataverseRowID;
                Guid guid = Guid.Parse(strGuid);

                existingServiceOwner.Name = roleDTO.Name;
                existingServiceOwner.DataverseRowID = guid;
                existingServiceOwner.IsActive = roleDTO.IsActive;

                _roleService.UpdateRole(existingServiceOwner);
                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);
                return Ok(existingServiceOwner);
            }

            catch (Exception ex)
            { 
                throw new ArgumentException(ex.Message);
            }
        }


      
        /// <param name="deleteId">The ID of the role to be deleted.</param>
        /// <returns>Returns 204 No Content if the role is deleted successfully.</returns>
        /// <response code="204">No Content. The role is deleted successfully.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("Delete/{deleteId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes a role by ID",
            Description = "Deletes a role by ID. Returns 204 No Content if the role is deleted successfully",
            OperationId = "Delete")]
        public IActionResult Delete(int deleteId)
        {
             _logDescription = rm.GetString("roleKey5");

            string _logInvalidDescription = rm.GetString("roleInvalidKey");

            try
            {
                if (deleteId <= 0)
                {
                    ModelState.AddModelError("ObjId", _logInvalidDescription);
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _roleService.DeleteRole(deleteId);
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
