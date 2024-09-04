// <copyright file="SupportController.cs" company="Microsoft Corporation">
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
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using MCAPSHelpVNext.DataRepository.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Diagnostics;
using WebApi.Helpers;

namespace MCAPSHelpVNext.API.Controllers
{
    /// <summary>
    /// SupportController
    /// </summary>
        [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class SupportController : ControllerBase
    {
       
        public static readonly string AICustomEvent = "MCAPSHelp.APIService";
       
        private readonly SupportRequest _obj;

        /// <summary>
        /// SupportController
        /// </summary>
        /// <param name="obj"></param>
        public SupportController(SupportRequest obj)
        {
            _obj = obj;
           
        }

       
        /// <returns>Returns Ok with the list of support requests for the authenticated user.</returns>
        /// <response code="200">Ok. The support requests were successfully retrieved.</response>
        /// <response code="500">Internal Server Error or Application Error with Status Code.</response>
        [HttpGet("GetMySupportRequests")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SupportRequest>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(ErrorResponse))]
        [SwaggerOperation(
            Summary = "Gets support requests for the authenticated user",
            Description = "Retrieves support requests associated with the authenticated user.",
            OperationId = "GetMySupportRequests")]
        public IActionResult GetMySupportRequests()
        {
            try
            {
                string userIdentity = User.Identity.Name.Substring(0, User.Identity.Name.IndexOf("@"));
              
                HttpResponseMessage response = new HttpResponseMessage();
                Task.Run(async () =>
                {
                    response = await _obj.GetSupportRequestsAsync(userIdentity);
                }).GetAwaiter().GetResult();

              

                return Ok(response);

            }
            catch (Exception ex)
            {
                
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
