// <copyright file="UserADGroupController.cs" company="Microsoft Corporation">
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
    public class UserADGroupController : ControllerBase
    {
        private readonly UserADGroupService _userADGroupService;
        private readonly string _correlationID;
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(UserADGroupController).Assembly);

       private string _logDescription;

        public UserADGroupController(UserADGroupService userADGroupService)
        {
            _userADGroupService = userADGroupService;
            _correlationID = CorrelationSettings.CorrelationId;

        }


        /// <returns>Returns Ok with the list of all user AD groups.</returns>
        /// <response code="200">Ok. The user AD groups were successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<UserADGroup>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all user AD groups",
            Description = "Retrieves all user AD groups.",
            OperationId = "GetAllUserADGroups")]
        public IActionResult GetAll()
        {
            _logDescription = rm.GetString("userADGroupKey1");
            try
            {
                var result = _userADGroupService.GetAll();
                if (result == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }
                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                return Ok(result);
            }
            catch(Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
        }

       
        /// <param name="objDTO">The DTO for the user AD group to be added.</param>
        /// <returns>Returns Created with the newly added user AD group.</returns>
        /// <response code="201">Created. The user AD group was successfully added.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(UserADGroup))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new user AD group",
            Description = "Adds a new user AD group.",
            OperationId = "AddUserADGroup")]
        public IActionResult Add([FromBody] UserADGroupDTO objDTO)
        {
            _logDescription = rm.GetString("userADGroupKey2");

            try
            {
                if (objDTO == null)
                {
                  
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                var collection = new UserADGroup
                {
                    Name = objDTO.Name,
                    IsActive = objDTO.IsActive,
                    DataverseRowID = objDTO.DataverseRowID,
                    GroupID = objDTO.GroupID,
                };

                var validationHelper = new ValidationHelper<UserADGroupDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }

                _userADGroupService.AddUserADGroup(collection);
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);
                return CreatedAtAction(nameof(GetService), new { id = _userADGroupService }, _userADGroupService);
            }
            catch (Exception ex)
            {
              
                throw new ArgumentException(ex.Message);
            }
        }


        /// <param name="Id">The ID of the user AD group to retrieve.</param>
        /// <returns>Returns Ok with the user AD group if found.</returns>
        /// <response code="200">Ok. The user AD group was successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserADGroup))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets a user AD group by ID",
            Description = "Gets a user AD group by ID.",
            OperationId = "GetUserADGroupById")]
        public IActionResult GetService(int Id)
        {
            _logDescription = rm.GetString("userADGroupKey3");

            try
            {
                if (Id != 0)
                {
                    var result = _userADGroupService.FindUserADGroup(Id);
                    if (result == null)
                    {
                       
                        var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
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


        /// <param name="userADGroupDTO">The data to update the user AD group.</param>
        /// <returns>Returns Ok with the updated user AD group if successful.</returns>
        /// <response code="200">Ok. The user AD group was successfully updated.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserADGroup))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates a user AD group",
            Description = "Updates a user AD group with the specified details.",
            OperationId = "UpdateUserADGroup")]
        public IActionResult Patch([FromBody] UserADGroupDTO userADGroupDTO)
        {
            _logDescription = rm.GetString("userADGroupKey4");

            try
            {
                if (userADGroupDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var result = _userADGroupService.FindUserADGroup(userADGroupDTO.Id);
                if (result == null)
                {
                  
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }

                result.Name = userADGroupDTO.Name;
                result.GroupID = userADGroupDTO.GroupID;
                result.DataverseRowID = userADGroupDTO.DataverseRowID;
                result.IsActive = userADGroupDTO.IsActive;
                _userADGroupService.UpdateUserADGroup(result);
                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);
                return Ok(result);
            }
            catch (Exception ex)
            {
              
                throw new ArgumentException(ex.Message);
            }
        }

        /// <param name="Id">The ID of the user AD group to delete.</param>
        /// <returns>Returns NoContent if the user AD group was successfully deleted.</returns>
        /// <response code="204">No Content. The user AD group was successfully deleted.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("Delete/{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes a user AD group by ID",
            Description = "Deletes the user AD group with the specified ID.",
            OperationId = "DeleteUserADGroup")]
        public IActionResult Delete(int Id)
        {
            _logDescription = rm.GetString("userADGroupKey5");

           string  _logInvalidDescription = rm.GetString("userADInvalidKey");

            

            try
            {
                if (Id <= 0)
                {
                    ModelState.AddModelError("ObjId", _logInvalidDescription);
                 
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _userADGroupService.DeleteUserADGroup(Id);
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
