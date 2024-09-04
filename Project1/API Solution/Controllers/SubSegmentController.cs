// <copyright file="SubSegmentController.cs" company="Microsoft Corporation">
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
using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.Models;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Diagnostics;
using WebApi.Helpers;
using System.Resources;
using MCAPSHelpVNext.Controllers.Controllers;

namespace MCAPSHelpVNext.API.Controllers
{

    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class SubSegmentController : ControllerBase
    {
        private readonly SubSegmentService _subSegmentService;
        private readonly string _correlationID;

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(SubSegmentController).Assembly);

       private string _logDescription;

        public SubSegmentController(SubSegmentService subSegmentService)
        {
            _subSegmentService = subSegmentService;
            _correlationID = CorrelationSettings.CorrelationId;
        }

     
        /// <returns>Returns a list of sub-segments.</returns>
        /// <response code="200">OK. The list of sub-segments was successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<SubSegment>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all sub-segments",
            Description = "Gets a list of all sub-segments.",
            OperationId = "GetAllSubSegments")]
        public IActionResult GetAll()
        {
            _logDescription = rm.GetString("subSegmentKey1");

            try
            {
                var result = _subSegmentService.GetAll();
                if (result == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                return Ok(result);
            }
            catch(Exception ex)
            {
                
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
            }
        }

       
        /// <param name="objDTO">The data for the new sub-segment.</param>
        /// <returns>Returns the newly created sub-segment.</returns>
        /// <response code="201">Created. The sub-segment was successfully added.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(SubSegment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new sub-segment",
            Description = "Adds a new sub-segment to the system.",
            OperationId = "AddSubSegment")]
        public IActionResult Add([FromBody] SubSegmentDTO objDTO)
        {
            _logDescription = rm.GetString("subSegmentKey2");

            try
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                var collection = new SubSegment
                {
                    Name = objDTO.Name,
                    IsActive = objDTO.IsActive,
                    DataverseRowID = objDTO.DataverseRowID,
                };

                var validationHelper = new ValidationHelper<SubSegmentDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }

                _subSegmentService.AddSubSegment(collection);
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);
                return CreatedAtAction(nameof(GetService), new { id = _subSegmentService }, _subSegmentService);
            }
            catch (Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
        }




      //  IEnumerable<SubSegment> GetAllSubSegmentBySegmentId(int segmentID)



  [HttpGet("GetAllSubSegmentBySegmentId/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SubSegment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets a sub-segment by its ID",
            Description = "Gets a sub-segment from the system by its unique identifier.",
            OperationId = "GetSubSegmentById")]
        public IActionResult GetAllSubSegmentById(int Id)
        {
            _logDescription = rm.GetString("subSegmentKey3");

            try
            {
                if (Id != 0)
                {
                    var result =  _subSegmentService.GetAllSubSegmentBySegmentId(Id);
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



        /// <param name="Id">The ID of the sub-segment to retrieve.</param>
        /// <returns>Returns the sub-segment with the specified ID.</returns>
        /// <response code="200">OK. The sub-segment was successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SubSegment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets a sub-segment by its ID",
            Description = "Gets a sub-segment from the system by its unique identifier.",
            OperationId = "GetSubSegmentById")]
        public IActionResult GetService(int Id)
        {
            _logDescription = rm.GetString("subSegmentKey4");

            try
            {
                if (Id != 0)
                {
                    var result = _subSegmentService.FindSubSegment(Id);
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

        /// <param name="subSegmentDTO">The data to update the sub-segment with.</param>
        /// <returns>Returns the updated sub-segment.</returns>
        /// <response code="200">OK. The sub-segment was successfully updated.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SubSegment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates a sub-segment",
            Description = "Updates an existing sub-segment in the system based on the provided data.",
            OperationId = "UpdateSubSegment")]
        public IActionResult Patch([FromBody] SubSegmentDTO subSegmentDTO)
        {
            _logDescription = rm.GetString("subSegmentKey5");

            try
            {
                if (subSegmentDTO == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var result = _subSegmentService.FindSubSegment(subSegmentDTO.Id);
                if (result == null)
                {
                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }

                result.Name = subSegmentDTO.Name;
                result.DataverseRowID = subSegmentDTO.DataverseRowID;
                result.IsActive  = subSegmentDTO.IsActive;
               
                _subSegmentService.UpdateSubSegment(result);
                Logging.LogRequest(_correlationID, _logDescription, "Put", "200", true);
                return Ok(result);
            }
            catch (Exception ex)
            {
               
                throw new ArgumentException(ex.Message);
            }
        }


        /// <param name="Id">The ID of the sub-segment to delete.</param>
        /// <returns>Returns NoContent if the sub-segment was successfully deleted.</returns>
        /// <response code="204">NoContent. The sub-segment was successfully deleted.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("Delete/{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes a sub-segment by ID",
            Description = "Deletes an existing sub-segment in the system based on the specified ID.",
            OperationId = "DeleteSubSegment")]
        public IActionResult Delete(int Id)
        {
            _logDescription = rm.GetString("subSegmentKey6");
           string  _logInvalidDescription = rm.GetString("subSegmentInvalidKey");
            
            try
            {
                if (Id <= 0)
                {
                    ModelState.AddModelError("ObjId", _logInvalidDescription);                   
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _subSegmentService.DeleteSubSegment(Id);
                Logging.LogRequest(_correlationID, _logDescription, "Delete", "200", true);

                return NoContent();
            }catch(Exception ex)
            {               
                throw new ArgumentException(ex.Message);

            }
        }
    }
}

