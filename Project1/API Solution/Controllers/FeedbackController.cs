// <copyright file="FeedbackController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.Api.Shared;
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
using Microsoft.Graph.ExternalConnectors;
using System.Diagnostics;
using System.Reflection;
using System.Security.Cryptography;
using System.Resources;

namespace MCAPSHelpVNext.API.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        
        private readonly string _correlationID;
        private readonly IConfiguration _configuration;
        private readonly FeedbackReposiroty _blobUploader;

        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(FeedbackController).Assembly);
        private string _logDescription;
        public FeedbackController(FeedbackReposiroty blobUploader, IConfiguration configuration)
        {
            _blobUploader = blobUploader;
            _correlationID = CorrelationSettings.CorrelationId;
            this._configuration = configuration;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromForm] InsertFeedbackHelperBinder json)
        {
             _logDescription = rm.GetString("feedbackKey");

            if (json == null)
            {
                return BadRequest("The 'json' parameter cannot be null.");
            }

            try
            {
                var phrase = _configuration.GetValue<string>("BlobStorageAccount:EncryptionPhrase");
                var result = await _blobUploader.Add(json, phrase);
                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);
                return Ok(result);

            }
            catch (Exception ex)
            {
                // Return a more detailed error response
                return BadRequest(new
                {
                    Message = "An error occurred while processing the request.",
                    ExceptionMessage = ex.Message,
                    StackTrace = ex.StackTrace,
                    // Add more properties as needed
                });
            }
        }

       

    }
}
