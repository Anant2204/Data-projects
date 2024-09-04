// <copyright file="UserController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.Api.Shared;
using MCAPSHelpVNext.API.Controllers;
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
using Swashbuckle.AspNetCore.Annotations;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Resources;

namespace MCAPSHelpVNext.Controllers.Controllers
{
    /// <summary>
    /// UserController
    /// </summary>
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configgration;
        private readonly UserService _userService;
        private readonly string _correlationID;
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(UserController).Assembly);

        private string _logDescription;

        /// <summary>
        ///     Constructor - UserController.
        /// </summary>
        /// <param name="userService">: Describe MCAPSHelpVNext.DataRepository.Repository.UserService userService here.</param>
        /// <returns>void.</returns>
        public UserController(UserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _correlationID = CorrelationSettings.CorrelationId;
            _configgration = configuration;
        }


        /// <summary>
        ///     Function Name - GetAll.
        /// </summary>
        /// <returns>Microsoft.AspNetCore.Mvc.IActionResult.</returns>
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            _logDescription = rm.GetString("userKey1");
            try
            {
                var result = _userService.GetAll();
                if (result == null)
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
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


        /// <summary>
        ///     Function Name - Add.
        /// </summary>
        /// <param name="userDTO">: Describe MCAPSHelpVNext.Controllers.DTO.UserDTO userDTO here.</param>
        /// <returns>Microsoft.AspNetCore.Mvc.IActionResult</returns>
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] UserDTO userDTO)
        {
            _logDescription = rm.GetString("userKey2");

            try
            {
                if (userDTO == null)
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                var userEntity = new UserHelper
                {
                    Oid = userDTO.Oid,
                    UPN = userDTO.UPN,
                    UserArea = userDTO.UserArea,
                    UserRole = userDTO.UserRole,
                    UserADGroupID = userDTO.UserADGroupID,
                    Segment = userDTO.Segment,
                    SubSegment = userDTO.SubSegment,
                    DataverseRowID = userDTO.DataverseRowID,
                    IsActive = userDTO.IsActive,
                    IsWelcomeMessage = userDTO.IsWelcomeMessage
                };

                var validationHelper = new ValidationHelper<UserDTO>();
                var validationErrors = validationHelper.ValidateObject(userDTO);

                if (validationErrors.Any())
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }

                var createdUserId = await _userService.AddUser(userEntity);
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);
                return CreatedAtAction(nameof(GetService), new { id = createdUserId }, createdUserId);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        /// <summary>
        ///     Function Name - Patch.
        /// </summary>
        /// <param name="userDTO">: Describe MCAPSHelpVNext.Controllers.DTO.UserDTO userDTO here.</param>
        /// <returns>Microsoft.AspNetCore.Mvc.IActionResult.</returns>
        [HttpPut("Update")]
        public IActionResult Patch([FromBody] UserDTO userDTO)
        {
            _logDescription = rm.GetString("userKey3");

            try
            {
                if (userDTO == null)
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var userEntity = new UserHelper
                {
                    Id = userDTO.Id,
                    UPN = userDTO.UPN,
                    UserArea = userDTO.UserArea,
                    UserRole = userDTO.UserRole,
                    UserADGroupID = userDTO.UserADGroupID,
                    Segment = userDTO.Segment,
                    SubSegment = userDTO.SubSegment,
                    DataverseRowID = userDTO.DataverseRowID,
                    IsActive = userDTO.IsActive,
                    IsWelcomeMessage = userDTO.IsWelcomeMessage
                };
                _userService.UpdateUser(userEntity);
                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);
                return Ok(userEntity);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }

        }

        /// <summary>
        ///     Function Name - Delete.
        /// </summary>
        /// <param name="objId">: Describe int objId here.</param>
        /// <returns>Microsoft.AspNetCore.Mvc.IActionResult.</returns>
        [HttpDelete("Delete/{objId}")]
        public IActionResult Delete(int objId)
        {
            _logDescription = rm.GetString("userKey4");

            string _logInvalidDescription = rm.GetString("userInvalidKey");

            try
            {
                if (objId <= 0)
                {
                    ModelState.AddModelError("ObjId", _logInvalidDescription);
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _userService.DeleteUser(objId);
                Logging.LogRequest(_correlationID, _logDescription, "Delete", "200", true);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        /// <summary>
        ///     Function Name - GetUserServiceByEmailaddress.
        /// </summary>
        /// <param name="upn">: Describe string upn here.</param>
        /// <param name="OID">: Describe string OID here.</param>
        /// <returns>Microsoft.AspNetCore.Mvc.IActionResult.</returns>
        [HttpGet("GetUserByEmailId/{upn}/{OID?}")]
        [SwaggerOperation(Summary = "Get user by email address", Description = "Retrieve user information based on email address.")]
        [SwaggerResponse(StatusCodes.Status200OK, "Success", typeof(UserHelper))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Bad Request", typeof(ErrorResponse))]
        [SwaggerResponse(StatusCodes.Status404NotFound, "Not Found", typeof(ErrorResponse))]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Internal Server Error", typeof(ErrorResponse))]
        public async Task<IActionResult> GetUserServiceByEmailaddress(string upn, string OID)
        {
            _logDescription = rm.GetString("userKey5");

            try
            {
                var validationHelper = new ValidationHelper<UserDTO>();
                if (string.IsNullOrEmpty(upn))
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                if (!validationHelper.IsEmailValid(upn))
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                object _annoucementKey = _configgration.GetValue<string>("Announcement:Key");
                var result = await _userService.FindUserIdByEmail(upn, OID);


             

                if (result != null)
                {
                    var resultWithAdditionalColumn = new
                    {
                        result.Id,
                        result.UPN,
                        result.Oid,
                        result.UserArea,
                        result.UserRole,
                        result.UserADGroupID,
                        result.Segment,
                        result.SubSegment,
                        result.DataverseRowID,
                        result.IsActive,
                        result.UserAreaName,
                        result.UserRoleName,
                        result.UserSegmentName,
                        result.UserSubSegmentName,
                        result.IsWelcomeMessage,
                        // Add your new property here
                        AnnoucementKey = _annoucementKey
                    };

                    Logging.LogRequest(_correlationID, _logDescription, "Get", "200", true);
                    return Ok(resultWithAdditionalColumn);
                }

                else
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        /// <summary>
        ///     Function Name - GetUserServiceByEmailaddressPerf.
        /// </summary>
        /// <param name="upn">: Describe string upn here.</param>
        /// <returns>Microsoft.AspNetCore.Mvc.IActionResult.</returns>
        [HttpGet("GetUserByEmailIdPerf/{upn}")]
        public async Task<IActionResult> GetUserServiceByEmailaddressPerf(string upn)
        {
            _logDescription = rm.GetString("userKey6");

            try
            {
                var validationHelper = new ValidationHelper<UserDTO>();
                if (string.IsNullOrEmpty(upn))
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                if (!validationHelper.IsEmailValid(upn))
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                var result = await _userService.FindUserIdByEmailPerf(upn);

                if (result != null)
                {
                    Logging.LogRequest(_correlationID, _logDescription, "Get", "200", true);
                    return Ok(result);
                }


                else
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        /// <summary>
        ///     Function Name - GetService.
        /// </summary>
        /// <param name="Id">: Describe int Id here.</param>
        /// <returns>Microsoft.AspNetCore.Mvc.IActionResult.</returns>
        [HttpGet("GetById/{Id}")]
        public IActionResult GetService(int Id)
        {
            _logDescription = rm.GetString("userKey7");

            try
            {
                if (Id != 0)
                {
                    var result = _userService.FindUser(Id);
                    if (result == null)
                    {
                        var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                        return new JsonResult(errorResponse);
                    }
                    Logging.LogRequest(_correlationID, _logDescription, "Get", "200", true);
                    return Ok(result);
                }
                return new JsonResult(ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode));
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
