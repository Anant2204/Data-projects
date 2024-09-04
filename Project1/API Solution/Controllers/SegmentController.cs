// <copyright file="SegmentController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.API.Controllers;
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
using Swashbuckle.AspNetCore.Annotations;
using System.Data.Entity.Validation;
using System.Web.Http.Results;
using WebApi.Helpers;
using System.Resources;

namespace MCAPSHelpVNext.Controllers.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class SegmentController : ControllerBase
    {
        private readonly SegmentServices _segmentService;
        private readonly string _correlationID;

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(SegmentController).Assembly);
        private string _logDescription;

        public SegmentController(SegmentServices segmentService)
        {
            _segmentService = segmentService;
            _correlationID = CorrelationSettings.CorrelationId;
        }
      
        /// <response code="200">OK. Returns a list of segments.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Segment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all Segments",
            Description = "Returns a list of Segments.",
            OperationId = "GetAll")]
        public IActionResult GetAll()
        {
             _logDescription = rm.GetString("segmentKey1");

            try
            {
                var result =  _segmentService.GetAll();
                if(result != null) {
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

        /// <param name="Id">The ID of the segment to retrieve.</param>
        /// <returns>Returns 200 OK with the segment in the response body if found.</returns>
        /// <response code="200">OK. Returns the segment with the specified ID.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetById/{Id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Segment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets a segment by ID",
            Description = "Gets a segment by ID. Returns 200 OK with the segment in the response body if found.",
            OperationId = "GetService")]
        public IActionResult GetService(int Id)
        {
             _logDescription = rm.GetString("segmentKey2");

            try
            {
                if (Id != 0)
                {

                    var result = _segmentService.FindSegment(Id);
                   if(result != null)
                    {
                        Logging.LogRequest(_correlationID, _logDescription + Id, "GET", "200", true);
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

        /// <param name="id">The ID of the segment to retrieve.</param>
        /// <returns>Returns 200 OK with the segment in the response body if found.</returns>
        /// <response code="200">OK. Returns the segment with the specified ID.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetAllSegmentByRole/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Segment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets all segment by role",
            Description = "Gets all segment by role. Returns 200 OK with the segment in the response body if found.",
            OperationId = "GetAllSegmentByRole")]
        public IActionResult GetAllSegmentByRole(int id)
        {
             _logDescription = rm.GetString("segmentKey3");

            try
            {
                if (id != 0)
                {
                   var result = _segmentService.GetAllSegmentByRole(id);
                   if(result != null)
                    {
                        Logging.LogRequest(_correlationID, _logDescription + id, "GET", "200", true);
                        return Ok(result);
                    }                   
                }
                var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                return new JsonResult(errorResponse);
            }
            catch (Exception ex)
            {                
                var errorResponse = ErrorHandling.ErrorResponseDetailsByError(HttpContext, ex);
                return new JsonResult(errorResponse);
            }
        }

      
        /// <param name="objDTO">The SegmentDTO object representing the segment to be added.</param>
        /// <returns>Returns 201 Created with the newly created segment in the response body.</returns>
        /// <response code="201">Created. Returns the newly created segment.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Segment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Adds a new segment",
            Description = "Adds a new segment. Returns 201 Created with the newly created segment in the response body.",
            OperationId = "Add")]
        public IActionResult Add([FromBody] SegmentDTO objDTO)
        {
             _logDescription = rm.GetString("segmentKey4");

            try
            {
                if (objDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);
                }
                var _serviceObject = new Segment
                {
                    Name = objDTO.Name,
                    DataverseRowID = objDTO.DataverseRowID,
                    IsActive = objDTO.IsActive,
                };

                var validationHelper = new ValidationHelper<SegmentDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _segmentService.AddSegment(_serviceObject);

                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);

                return CreatedAtAction(nameof(GetService), new { id = _serviceObject.Id }, _serviceObject);
            }
            catch (Exception ex)
            {   
                throw new ArgumentException(ex.Message);
            }
        }

        /// <param name="segmentDTO">The data to update the segment.</param>
        /// <returns>Returns 200 OK with the updated segment in the response body.</returns>
        /// <response code="200">OK. Returns the updated segment.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpPatch("UpdateSegment")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Segment))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Updates a segment",
            Description = "Updates a segment based on the provided data. Returns 200 OK with the updated segment in the response body.",
            OperationId = "Patch")]
        public IActionResult Patch([FromBody] SegmentDTO segmentDTO)
        {
             _logDescription = rm.GetString("segmentKey5");

            try
            {
                if(segmentDTO == null)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);

                }
                var segmentEntity = new Segment
                {
                    Id = segmentDTO.Id,
                    Name = segmentDTO.Name,
                    DataverseRowID = segmentDTO.DataverseRowID,
                    IsActive = segmentDTO.IsActive,
                };
                _segmentService.UpdateSegment(segmentEntity);
                Logging.LogRequest(_correlationID, _logDescription + segmentDTO.Id, "Put", "200", true);
                return Ok(segmentEntity);
            }
            catch(Exception ex) {
                              
                throw new ArgumentException(ex.Message);
            }
           
        }



     
        /// <param name="Id">The ID of the segment to delete.</param>
        /// <returns>Returns 204 No Content on successful deletion.</returns>
        /// <response code="204">No Content. The segment was successfully deleted.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpDelete("DeleteSegment/{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Deletes a segment by ID",
            Description = "Deletes a segment based on the provided ID.",
            OperationId = "Delete")]
        public IActionResult Delete(int Id)
        {
             _logDescription = rm.GetString("segmentKey6");

            try
            {
                if (Id == 0)
                {
                    
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);
                }
                _segmentService.DeleteSegment(Id);
                Logging.LogRequest(_correlationID, _logDescription + Id, "Delete", "200", true);
                return NoContent();
            }
            catch (Exception ex)
            {  
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
