// <copyright file="ManagerController.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.API.Controllers
{
    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Net;

    using MCT.API.Attributes;
    using MCT.API.Extensions;
    using MCT.Business.Interfaces;
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.Services.Tools.Infrastructure.Logging;

    using Constants = MCT.API.Constants;

    /// <summary>
    ///Provides functionality to get manager details.
    /// </summary>
    [ApiController]
    public class ManagerController : BaseApiController
    {
        private readonly IManagerService _managerService;
        private readonly ApplicationStateOptions applicationState;
        private readonly IHttpContextAccessor httpcontext;

        /// <summary>Initializes a new instance of the <see cref="ManagerController" /> class.</summary>
        /// <param name="managerService">The manager service.</param>
        /// <param name="applicationState">State of the application.</param>
        /// <param name="httpcontext">The state of httpcontext</param>
        public ManagerController(IManagerService managerService, IOptions<ApplicationStateOptions> applicationState, IHttpContextAccessor httpcontext) : base(httpcontext)
        {
            _managerService = managerService;
            this.applicationState = applicationState.Value;
            this.httpcontext = httpcontext;
        }

        /// <summary>Gets this instance.</summary>
        /// <returns>
        ///   <br />
        /// </returns>
        [Route("/v1/manager/get")]
        [HttpPost]
        [ValidateModelState]
        [ProducesResponseTypeAttribute(StatusCodes.Status200OK, Type = typeof(GetManagerWithDefaultSelection))]
        [ProducesResponseTypeAttribute(StatusCodes.Status204NoContent, Type = typeof(NoContentResult))]
        public async Task<IActionResult> Get([FromBody][Required] ManagerListRequest request)
        {
            List<string>? roleList = new List<string>();
            Instrument.Logger.LogMessage(EventLevel.Informational, "FA5DA930-4E16-48ED-8201-F618B57341AD", $"{this.GetType()}.GetManagersList:Starting");
            string? user = this.CurrentUserAlias;

            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
            if (HttpContext.Items["Roles"] != null)
            {
                roleList = HttpContext.Items["Roles"] as List<string>;
            }
            if (roleList == null || !roleList.Any())
            {
                return this.BadRequest();
            }

            GetManagerWithDefaultSelection managerList = await _managerService.GetManagerList(request, user, roleList).ConfigureAwait(false);
            if (managerList != null && managerList.Managers != null && managerList.Managers.Count > 0)
            {
                return StatusCode(StatusCodes.Status200OK, managerList);
            }
            else
            {
                return StatusCode(StatusCodes.Status403Forbidden, null);
            }
        }
    }
}
