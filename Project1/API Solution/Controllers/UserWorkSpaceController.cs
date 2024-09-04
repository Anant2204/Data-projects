// <copyright file="UserWorkSpaceController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.API.CachingService;
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
using Newtonsoft.Json;
using System.Diagnostics;
using System.Diagnostics.Metrics;
using System.Web.Http.Results;
using System.Resources;

namespace MCAPSHelpVNext.Controllers.Controllers
{
    /// <summary>
    /// UserWorkSpaceController
    /// </summary>
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class UserWorkSpaceController : ControllerBase
    {
        private readonly UserWorkSpaceService _userWorkSpaceService;
        private readonly ICachingService _cachingService;
        private readonly IConfiguration _configuration;
        private readonly string _correlationID;

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(UserWorkSpaceController).Assembly);

        private string _logDescription;

        /// <summary>
        /// UserWorkSpaceController constructor
        /// </summary>
        /// <param name="userWorkSpaceService"></param>
        /// <param name="cachingService"></param>
        /// <param name="configuration"></param>
        public UserWorkSpaceController(UserWorkSpaceService userWorkSpaceService, ICachingService cachingService, IConfiguration configuration)
        {
            _userWorkSpaceService = userWorkSpaceService;
            _cachingService = cachingService;
            _configuration = configuration;
            _correlationID = CorrelationSettings.CorrelationId;
        }

        /// <summary>
        /// GetAllByUserId
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        [HttpGet("GetAllWorkspaces/{UserId}")]
        public IActionResult GetAllByUserId(int UserId)
        {
            _logDescription = rm.GetString("userWorkspaceKey5");

            try
            {
               
               var result = _userWorkSpaceService.GetAllByUserId(UserId);

               var uniqueNames = result.Select(item => item.Name).Distinct();

               var groupedResult = result
                        .GroupBy(item => item.Name)
                        .Select(group => new
                        {
                            Name = group.Key,
                            UniqueItem = group.First(),
                            ServiceRequestFormLinks = group
                                .Select(item => new
                                {
                                    RequestType = item.RequestTypeName,
                                    Url = item.ServiceRequestFormLink
                                })
                                .GroupBy(link => new { link.Url, link.RequestType })  // Group by both URL and RequestType to ensure uniqueness
                                .Select(linkGroup => linkGroup.First())  // Take the first item from each group
                        }).Distinct();

                var specificPropertyValues = groupedResult.Select(group =>
                {
                    var user = group.UniqueItem;
                    var serviceLinks = group.ServiceRequestFormLinks;
                    return new UserWorkSpaceResult
                    {
                        DisplayName = user.DisplayName,
                        AboutService = user.AboutService,
                        FAQLink = user.FAQLink,
                        IRIS_Utterance = user.IRIS_Utterance,
                        TileName = user.TileName,
                        Name = user.Name,
                        UserID = user.UserID,
                        RelatedInformation = user.RelatedInformation,
                        Id = user.Id,
                        ServiceCategories = user.ServiceCategories,
                        ServiceID = user.ServiceID,
                        ServiceDropDownLinks = user.ServiceDropDownLinks,
                       
                        Service_IsActive = user.Service_IsActive,
                        Service_IsDropdownUI = user.Service_IsDropdownUI,
                        Service_IsLarge = user.Service_IsLarge,
                        DataverseRowID = user.DataverseRowID,
                        Service_IsPrivate = user.Service_IsPrivate,
                        UPN = user.UPN,
                        Service_IsNonIRISService = user.Service_IsNonIRISService,
                        IrisAppName = !string.IsNullOrEmpty(user.IrisAppName) ? user.IrisAppName : _configuration["IrisAppName"],

                        ServiceRequestFormLink = group.ServiceRequestFormLinks != null && serviceLinks.Count() > 1
                        ? JsonConvert.SerializeObject(group.ServiceRequestFormLinks)
                        : user.ServiceRequestFormLink
                    };
                }).ToList();
                
                                 
                Logging.LogRequest(_correlationID, _logDescription+"/"+UserId, "GET", "200", true);
                return Ok(specificPropertyValues); // Await the result when returning from the method
            }
            catch (Exception ex)
            {             
                throw new ArgumentException(ex.Message);
            }
        }

        /// <summary>
        /// GetAllByUserIdPerf
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        // Performance Testing Action
        [HttpGet("GetAllByUserIdPerf/{UserId}")]
        public IActionResult GetAllByUserIdPerf(int UserId)
        {
            

            try
            {  
                Logging.LogRequest(_correlationID, $"UserWorkSpace/GetAllByUserIdPerf/{UserId}", "GET", "200", true);
                var result = _userWorkSpaceService.GetAllByUserIdPerf(UserId);
                return Ok(result); // Await the result when returning from the method
            }
            catch (Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
        }


        /// <summary>
        /// Add
        /// </summary>
        /// <param name="userWorkSpaceDTO"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] UserWorkSpaceDTO userWorkSpaceDTO)
        {
            _logDescription = rm.GetString("userWorkspaceKey1");

            try
            {
                if (userWorkSpaceDTO == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var userWorkSpaceEntity = new UserWorkSpace
                {
                    UserID = userWorkSpaceDTO.UserId,
                    ServiceID = userWorkSpaceDTO.ServiceId
                };

                var validationHelper = new ValidationHelper<UserWorkSpaceDTO>();
                var validationErrors = validationHelper.ValidateObject(userWorkSpaceDTO);

                if (validationErrors.Any())
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }
                await _userWorkSpaceService.AddUserWorkSpace(userWorkSpaceEntity);
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);

                return CreatedAtAction(nameof(GetService), new { id = _userWorkSpaceService }, _userWorkSpaceService);
            }
            catch (Exception ex)
            {
             
                throw new ArgumentException(ex.Message);
            }
        }

        /// <summary>
        /// AddBulk
        /// </summary>
        /// <param name="userWorkSpaceDTOs"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        [HttpPost("AddBulk")]
        public  async Task<IActionResult> AddBulk([FromBody] IEnumerable<UserWorkSpaceDTO> userWorkSpaceDTOs)
        {
            _logDescription = rm.GetString("userWorkspaceKey1");

            try
            {
                if (userWorkSpaceDTOs == null || !userWorkSpaceDTOs.Any())
                {
                
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                var userWorkSpaceEntities = userWorkSpaceDTOs
                    .Select(dto => new UserWorkSpace
                    {
                        UserID = dto.UserId,
                        ServiceID = dto.ServiceId
                    })
                    .ToList();

                var validationHelper = new ValidationHelper<IEnumerable<UserWorkSpaceDTO>>();
                var validationErrors = validationHelper.ValidateObject(userWorkSpaceDTOs);

                if (validationErrors.Any())
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }

               await  _userWorkSpaceService.AddUserWorkSpaces(userWorkSpaceEntities);

                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);

                return CreatedAtAction(nameof(GetService), new { id = _userWorkSpaceService }, _userWorkSpaceService);
            }
            catch (Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
        }

        /// <summary>
        /// GetService
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        [HttpGet("GetById/{Id}")]
        public IActionResult GetService(int Id)
        {
            _logDescription = rm.GetString("userWorkspaceKey2");

            try
            {
                if (Id != 0)
                {
                    var result = _userWorkSpaceService.FindUserWorkSpace(Id);
                    if (result == null)
                    {
                        
                        var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
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

        /// <summary>
        /// Patch
        /// </summary>
        /// <param name="userWorkSpaceDTO"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        [HttpPut("Update")]
        public IActionResult Patch([FromBody] UserWorkSpaceDTO userWorkSpaceDTO)
        {
            _logDescription = rm.GetString("userWorkspaceKey3");

            try
            {
                if (userWorkSpaceDTO == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var userWorkSpaceEntity = new UserWorkSpace
                {
                    Id = userWorkSpaceDTO.Id,
                    UserID = userWorkSpaceDTO.UserId,
                    ServiceID = userWorkSpaceDTO.ServiceId
                };
                _userWorkSpaceService.UpdateUserWorkSpace(userWorkSpaceEntity);
                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);

                return Ok(userWorkSpaceEntity);
            }
            catch (Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
        }

        /// <summary>
        /// DeleteUserWorkSpace
        /// </summary>
        /// <param name="objId"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        [HttpDelete("Delete/{objId}")]
        public IActionResult DeleteUserWorkSpace(int objId)
        {
            _logDescription = rm.GetString("userWorkspaceKey4");

            string _logInvalidDescription = rm.GetString("userWorkspaceInvalidKey");

            try
            {
                if (objId <= 0)
                {
                    ModelState.AddModelError("ObjId", _logInvalidDescription);
                 
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _userWorkSpaceService.DeleteUserWorkSpace(objId);
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
