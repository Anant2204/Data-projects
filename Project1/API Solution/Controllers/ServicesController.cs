// <copyright file="ServicesController.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVnext.Common.Logging;
using MCAPSHelpVNext.API.CachingService;
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
using Microsoft.Graph.SecurityNamespace;
using Newtonsoft.Json;
using Polly;
using Swashbuckle.AspNetCore.Annotations;
using System.Data;
using System.Diagnostics;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http.Results;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Resources;
using MCAPSHelpVNext.API.Controllers;
using System.Globalization;
using System;


namespace MCAPSHelpVNext.Controllers.Controllers
{
    [Authorize(Policy = nameof(CommonConst.GetMCAPSHelpAPIAuthorization))]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly UserWorkSpaceService _userWorkSpaceService;
        private readonly ServiceService _service;
        private readonly IConfiguration _configgration;
        private readonly ICachingService _cachingService;
        private readonly string _correlationID;
        readonly ResourceManager rm = new ResourceManager("MCAPSHelpVNext.API.MCAPSHelpResource", typeof(ServicesController).Assembly);
        private string _logDescription;
        private readonly List<RequestType> _predefinedRequestType;

        public ServicesController(ServiceService service, IConfiguration configuration, ICachingService cachingService, UserWorkSpaceService userWorkSpaceService)
        {
            _service = service;
            _configgration = configuration;
            _cachingService = cachingService;
            _userWorkSpaceService = userWorkSpaceService;
            _correlationID = CorrelationSettings.CorrelationId;
            _predefinedRequestType = new List<RequestType>
            {
                new RequestType(1, "List of ECIF program details"),
                new RequestType(2, "Status of ALL my ECIF cases"),
                new RequestType(3, "Check a specific ECIF case status"),
                new RequestType(4, "Request PO status")
            };
        }

        [HttpPost("GetAllServices/{UserId}")]
        public  async Task<IActionResult> GetAll(int UserId, [FromBody] McemModel? body)
        {
             _logDescription = rm.GetString("servicesKey1");

            try
            {
                var result = await _service.GetAllBasedOnUser(UserId, body);

                var uniqueNames = result.Select(item => item.Name).Distinct();

                var groupedResult = result
                      .GroupBy(item => item.Name)
                      .Select(group => new
                      {
                          Name = group.Key,
                          UniqueItem = group.First(),
                          ServiceRequestFormLinks = group.Select(item => item.ServiceRequestFormLink).Distinct()
                      });

                var specificPropertyValues = groupedResult.Select(group =>
                {
                    var item = group.UniqueItem;
                    var serviceLinks = group.ServiceRequestFormLinks;
                    return new ServicesDTO
                    {
                        Id = item.Id,
                        Name = item.Name,
                        AboutService = item.AboutService,
                        DataverseRowID = item.DataverseRowID,
                        IRIS_Utterance = item.IRIS_Utterance,
                        TileName = item.TileName,

                        IsDropdownUI = item.IsDropdownUI,
                        IsNonIRISService = item.IsNonIRISService,

                        RelatedInformation = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? item.RelatedInformation : HtmlParser.ExtractTextFromHtml(item.RelatedInformation),  // Replace with actual property names
                        ServiceCategories = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? item.ServiceCategories : HtmlParser.ExtractTextFromHtml(item.ServiceCategories),
                        IsLarge = !string.IsNullOrEmpty(item.ServiceCategories) ? (item.ServiceCategories.ToLower().Contains("width") ? true : false) : false,
                        IsSecuredByAzureADGroup = item.IsSecuredByAzureADGroup,
                        AzureADGroupName = item.AzureADGroupName,
                        WelcomeMessage = item.WelcomeMessage,
                        UPN = item.UPN,
                        DisplayName = item.DisplayName,
                        IrisAppName = string.IsNullOrEmpty(item.IrisAppName) ? _configgration["IrisAppName"] : item.IrisAppName,
                        IsExistInWorkspace = item.IsExistInWorkspace,

                        ServiceRequestFormLink = group.ServiceRequestFormLinks != null && serviceLinks.Count() > 1
                        ? JsonConvert.SerializeObject(group.ServiceRequestFormLinks)
                        : group.ServiceRequestFormLinks?.FirstOrDefault(), // Set to the single link if only one, otherwise null

                    };
                }).ToList();

                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
              
                return Ok(specificPropertyValues);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.Message);
            }
        }

        [HttpPost("GetAllServicesWithSearch/{UserId}")]
        public async Task<IActionResult> GetAllServicesWithSearch(int UserId, [FromQuery] string query, [FromBody] McemModel? body)
        {
             _logDescription = rm.GetString("servicesKey2");

            List<ServicesDTO> specificPropertyValues = new List<ServicesDTO>();
            try
            {
                var result = await _service.GetAllBasedOnUserWithSearch(UserId, query, body);

                var groupedResult = result
                      .GroupBy(item => item.Name)
                      .Select(group => new
                      {
                          Name = group.Key,
                          UniqueItem = group.First(),
                          ServiceRequestFormLinks = group.Select(item => item.ServiceRequestFormLink).Distinct()
                      });

                specificPropertyValues = groupedResult.Select(group =>
                {
                    var item = group.UniqueItem;
                    var serviceLinks = group.ServiceRequestFormLinks;
                    return new ServicesDTO
                    {
                        Id = item.Id,
                        Name = item.Name,
                        AboutService = item.AboutService,
                        DataverseRowID = item.DataverseRowID,
                        IRIS_Utterance = item.IRIS_Utterance,
                        IsDropdownUI = item.IsDropdownUI,
                        IsNonIRISService = item.IsNonIRISService,
                        RelatedInformation = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? item.RelatedInformation : HtmlParser.ExtractTextFromHtml(item.RelatedInformation),  // Replace with actual property names
                        ServiceCategories = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? item.ServiceCategories : HtmlParser.ExtractTextFromHtml(item.ServiceCategories),
                        IsLarge = !string.IsNullOrEmpty(item.ServiceCategories) ? (item.ServiceCategories.ToLower().Contains("width") ? true : false) : false,
                        IsSecuredByAzureADGroup = item.IsSecuredByAzureADGroup,
                        AzureADGroupName = item.AzureADGroupName,
                        WelcomeMessage = item.WelcomeMessage,
                        UPN = item.UPN,
                        DisplayName = item.DisplayName,
                        IrisAppName = string.IsNullOrEmpty(item.IrisAppName) ? _configgration["IrisAppName"] : item.IrisAppName,
                        IsExistInWorkspace = item.IsExistInWorkspace,
                        ServiceRequestFormLink = group.ServiceRequestFormLinks != null && serviceLinks.Count() > 1
                        ? JsonConvert.SerializeObject(group.ServiceRequestFormLinks)
                        : group.ServiceRequestFormLinks?.FirstOrDefault(), // Set to the single link if only one, otherwise null
                    };
                }).ToList();

                Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
            return Ok(specificPropertyValues);
        }
                

        [HttpGet("GetAllServicesGroups/{ServiceID}/{UserId}")]
        public async Task<IActionResult> GetServiceAndRequest(int ServiceID, int UserId)
        {
            _logDescription = rm.GetString("servicesKey3");

            try
            {
                var result = await _service.ServiceGroupAndRequestType(ServiceID, UserId);
                if (result.Count() > 0)
                {
                    DataTable dataTable = ConvertToDataTable(result);

                    Dictionary<string, Dictionary<string, object>> serviceGroups = new Dictionary<string, Dictionary<string, object>>();

                    foreach (DataRow row in dataTable.Rows)
                    {
                        string serviceGroupName = row["ServiceGroupName"].ToString();
                        string serviceGroupDescription = row["ServiceGroupDescription"].ToString();
                        string requestTypeName = row["RequestTypeName"].ToString();

                        if (!serviceGroups.ContainsKey(serviceGroupName))
                        {
                            serviceGroups[serviceGroupName] = new Dictionary<string, object>
                          {
                    {"ServiceGroupDescription", serviceGroupDescription},
                    {"RequestTypeName", new List<string>()}
                         };
                        }

                        ((List<string>)serviceGroups[serviceGroupName]["RequestTypeName"]).Add(requestTypeName);
                    }

                    // Common fields to be added once after processing all rows
                    string displayName = dataTable.Rows[0]["DisplayName"].ToString(); // Assuming it's the same for all rows
                    string upn = dataTable.Rows[0]["UPN"].ToString(); // Assuming it's the same for all rows
                    string relatedInformation = dataTable.Rows[0]["Relatedinformation"].ToString();
                    string aboutService = dataTable.Rows[0]["AboutService"].ToString();

                    // Assuming it's the same for all rows

                    // Add common fields directly to the serviceGroups dictionary
                    serviceGroups["CommonFields"] = new Dictionary<string, object>
                    {
                    {"DisplayName", displayName},
                    {"UPN", upn},
                    {"Relatedinformation", relatedInformation},
                    {"AboutService", aboutService }
                    };

                    string jsonResult = JsonConvert.SerializeObject(serviceGroups, Formatting.Indented);

                    Logging.LogRequest(_correlationID, _logDescription, "GET", "200", true);
                    return Ok(jsonResult);
                }
                return Ok("There is no data for this service");
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        static DataTable ConvertToDataTable(IEnumerable<ServiceGroupAndRequestTypeHelper> data)
        {
            DataTable dataTable = new DataTable();

            dataTable.Locale = CultureInfo.InvariantCulture;

            // Add columns based on ServiceGroupAndRequestTypeHelper properties
            dataTable.Columns.Add("ServiceGroupName", typeof(string));
            dataTable.Columns.Add("ServiceGroupDescription", typeof(string));
            dataTable.Columns.Add("ServiceGroupID", typeof(int));
            dataTable.Columns.Add("RequestTypeName", typeof(string));
            dataTable.Columns.Add("RequestTypeID", typeof(int));

            dataTable.Columns.Add("DisplayName", typeof(string));
            dataTable.Columns.Add("UPN", typeof(string));
            dataTable.Columns.Add("Relatedinformation", typeof(string));
            dataTable.Columns.Add("AboutService", typeof(string));


            foreach (var item in data)
            {
                DataRow row = dataTable.NewRow();
                row["ServiceGroupName"] = item.ServiceGroupName;
                row["ServiceGroupDescription"] = item.ServiceGroupDescription;
                row["ServiceGroupID"] = item.ServiceGroupID;
                row["RequestTypeName"] = item.RequestTypeName;
                row["RequestTypeID"] = item.RequestTypeID;
                row["DisplayName"] = item.DisplayName;
                row["UPN"] = item.UPN;
                row["Relatedinformation"] = item.Relatedinformation;
                row["AboutService"] = item.AboutService;
                dataTable.Rows.Add(row);
            }

            return dataTable;
        }




        [HttpGet("GetById/{Id}")]
        public IActionResult GetService(int Id)
        {
             _logDescription = rm.GetString("servicesKey4");

            try
            {
                if (Id != 0)
                {

                    var result = _service.FindService(Id);
                    var specificPropertyValues = new ServicesDTO
                    {
                        Id = result.Id,
                        Name = result.Name,
                        AboutService = result.AboutService,
                        DataverseRowID = result.DataverseRowID,
                        IRIS_Utterance = result.IRIS_Utterance,
                        IsActive = result.IsActive,
                        IsDropdownUI = result.IsDropdownUI,
                        IsNonIRISService = result.IsNonIRISService,
                        IsPrivate = result.IsPrivate,
                        ServiceDropDownLinks = result.ServiceDropDownLinks,
                        ServiceRequestFormLink = result.ServiceRequestFormLink,
                        RelatedInformation = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? result.RelatedInformation : HtmlParser.ExtractTextFromHtml(result.RelatedInformation),  // Replace with actual property names
                        ServiceCategories = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? result.ServiceCategories : HtmlParser.ExtractTextFromHtml(result.ServiceCategories),
                        IsSecuredByAzureADGroup = result.IsSecuredByAzureADGroup,
                        AzureADGroupName = result.AzureADGroupName,
                        WelcomeMessage = result.WelcomeMessage
                    };
                    Logging.LogRequest(_correlationID, _logDescription + Id, "GET", "200", true);
                    return Ok(specificPropertyValues);
                }

                var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                return new JsonResult(errorResponse);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.Message);
            }
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] ServicesDTO objDTO)
        {
             _logDescription = rm.GetString("servicesKey5");

            try
            {
                if (objDTO == null)
                {

                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, BadRequest().StatusCode);
                    return new JsonResult(errorResponse);

                }
                var _serviceObject = new Service
                {
                    Name = objDTO.Name,
                    AboutService = objDTO.AboutService,
                    DataverseRowID = objDTO.DataverseRowID,
                    IRIS_Utterance = objDTO.IRIS_Utterance,
                    IsActive = objDTO.IsActive,
                    IsPrivate = objDTO.IsPrivate,
                    IsNonIRISService = objDTO.IsNonIRISService,
                    IsDropdownUI = objDTO.IsDropdownUI,
                    RelatedInformation = objDTO.RelatedInformation,
                    ServiceCategories = objDTO.ServiceCategories,
                    ServiceDropDownLinks = objDTO.ServiceDropDownLinks,
                    ServiceRequestFormLink = objDTO.ServiceRequestFormLink,
                    IsSecuredByAzureADGroup = objDTO.IsSecuredByAzureADGroup,
                    AzureADGroupName = objDTO.AzureADGroupName,
                    WelcomeMessage = objDTO.WelcomeMessage

                };

                var validationHelper = new ValidationHelper<ServicesDTO>();
                var validationErrors = validationHelper.ValidateObject(objDTO);

                if (validationErrors.Any())
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, UnprocessableEntity().StatusCode);
                    return new JsonResult(errorResponse);

                }
                _service.AddService(_serviceObject);

                Logging.LogRequest(_correlationID, _logDescription, "Post", "200", true);

                return CreatedAtAction(nameof(GetService), new { id = _serviceObject.Id }, _serviceObject);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.Message);
            }
        }

        [HttpPut("Update")]
        public IActionResult Patch([FromBody] ServicesDTO objDTO)
        {
             _logDescription = rm.GetString("servicesKey6");

            if (objDTO == null)
            {
                return BadRequest("The 'objDTO' parameter cannot be null.");
            }

            try
            {
                var _serviceObject = new Service
                {
                    Id = objDTO.Id,
                    Name = objDTO.Name,
                    AboutService = objDTO.AboutService,
                    DataverseRowID = objDTO.DataverseRowID,
                    IRIS_Utterance = objDTO.IRIS_Utterance,
                    IsActive = objDTO.IsActive,
                    IsPrivate = objDTO.IsPrivate,
                    IsNonIRISService = objDTO.IsNonIRISService,
                    IsDropdownUI = objDTO.IsDropdownUI,
                    RelatedInformation = objDTO.RelatedInformation,
                    ServiceCategories = objDTO.ServiceCategories,
                    ServiceDropDownLinks = objDTO.ServiceDropDownLinks,
                    ServiceRequestFormLink = objDTO.ServiceRequestFormLink,
                    IsSecuredByAzureADGroup = objDTO.IsSecuredByAzureADGroup,
                    AzureADGroupName = objDTO.AzureADGroupName,
                    WelcomeMessage = objDTO.WelcomeMessage
                };
                _service.UpdateService(_serviceObject);
                Logging.LogRequest(_correlationID, _logDescription + objDTO.Id, "Put", "200", true);
                return Ok(_serviceObject);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.Message);
            }
        }



        [HttpDelete("Delete/{serviceId}")]
        public IActionResult Delete(int serviceId)
        {
             _logDescription = rm.GetString("servicesKey7");

            try
            {
                if (serviceId == 0)
                {
                    var errorResponse = ErrorHandling.ErrorResponseDetailsByStatusCode(HttpContext, NotFound().StatusCode);
                    return new JsonResult(errorResponse);


                }
                _service.DeleteService(serviceId);
                Logging.LogRequest(_correlationID, _logDescription + serviceId, "Delete", "200", true);
                return NoContent();
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.Message);
            }
        }


        [HttpGet("GetUserLoggedInService")]
        public IActionResult GetLoggedInService()
        {
             _logDescription = rm.GetString("servicesKey8");

            try
            {
                var result = _service.GetAllLoggedInService();
                var specificPropertyValues = result.Select(item => new ServiceModelHelperDTO
                {
                    ID = item.ID,
                    Name = item.Name,
                    AboutService = item.AboutService,
                    DataverseRowID = item.DataverseRowID,
                    FinalData = item.FinalData,
                    IsActive = item.IsActive,
                    IsDropdownUI = item.IsDropdownUI,
                    IsNonIRISService = item.IsNonIRISService,
                    IsPrivate = item.IsPrivate,
                    RelatedInformation = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? item.RelatedInformation : HtmlParser.ExtractTextFromHtml(item.RelatedInformation),  // Replace with actual property names
                    ServiceCategories = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? item.ServiceCategories : HtmlParser.ExtractTextFromHtml(item.ServiceCategories),
                    //IsSecuredByAzureADGroup = item.IsSecuredByAzureADGroup,
                    //AzureADGroupName = item.AzureADGroupName,
                    //WelcomeMessage = item.WelcomeMessage
                }).ToList();


                Logging.LogRequest(_correlationID, _logDescription, "Get", "200", true);
                return Ok(specificPropertyValues);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.Message);
            }
        }

        [HttpGet("GetUserLoggedInServiceById/{Id}")]
        public IActionResult GetLoggedInServiceById(int Id)
        {
             _logDescription = rm.GetString("servicesKey9");

            try
            {
                var result = _service.GetLoggedInServicesByID(Id);
                var specificPropertyValues = new ServiceModelHelperDTO
                {
                    ID = result.ID,
                    Name = result.Name,
                    AboutService = result.AboutService,
                    DataverseRowID = result.DataverseRowID,
                    FinalData = result.FinalData,
                    IsActive = result.IsActive,
                    IsDropdownUI = result.IsDropdownUI,
                    IsNonIRISService = result.IsNonIRISService,
                    IsPrivate = result.IsPrivate,
                    RelatedInformation = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? result.RelatedInformation : HtmlParser.ExtractTextFromHtml(result.RelatedInformation),  // Replace with actual property names
                    ServiceCategories = Convert.ToBoolean(_configgration["IsRequiredRawHtml"]) ? result.ServiceCategories : HtmlParser.ExtractTextFromHtml(result.ServiceCategories)
                    //   IsSecuredByAzureADGroup = result.IsSecuredByAzureADGroup,
                    //AzureADGroupName = result.AzureADGroupName,
                    //WelcomeMessage = result.WelcomeMessage
                };
                Logging.LogRequest(_correlationID, _logDescription, "Get", "200", true);
                return Ok(specificPropertyValues);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.Message);
            }
        }

        /// <summary>
        /// Get request type for ecif
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetPredefinedRequestType")]
        public IActionResult GetPredefinedRequestType()
        {
            // Return the predefined entity as part of the response
            return Ok(_predefinedRequestType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        [HttpGet("GetEcifStatus/{id}")]
        public async Task<IActionResult> GetEcifStatus(int id)
        {
            try
            {
                // Find the claim for surname
                Claim surnameClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname);
                string lastName = surnameClaim != null ? surnameClaim.Value : "";

                // Find the claim for given name
                Claim givenNameClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName);
                string firstName = givenNameClaim != null ? givenNameClaim.Value : "";

                string link = _configgration.GetValue<string>("PowerAppRequestTypeLinks:" + id.ToString());

                switch (id)
                {
                    case 1:
                        return Ok(await _service.GetEcifStatus_GetAllEcifPrograms(link));
                    case 2:
                        return Ok(await _service.GetEcifStatus_GetAllMyEcifCases(link, firstName, lastName));
                    default:
                        return BadRequest("Invalid ID.");
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="search"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        [HttpGet("GetEcifStatusWithSearch/{id}")]
        public async Task<IActionResult> GetEcifStatusWithSearch(int id, [FromQuery] string search)
        {
            try
            {
                string link = _configgration.GetValue<string>("PowerAppRequestTypeLinks:" + id.ToString());
                if (link == null)
                {
                    return NotFound($"No link found for ID {id}");
                }

                switch (id)
                {
                    case 3:
                        return Ok(await _service.GetEcifStatus_GetSpecificEcifCaseStatus(link, search));
                    case 4:
                        return Ok(await _service.GetEcifStatus_GetPoDetails(link, search));
                    default:
                        return BadRequest("Invalid ID.");
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        /// <summary>
        /// Get Catalog page filters
        /// </summary>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        [HttpGet("GetCatalogFilters")]
        public async Task<IActionResult> GetCatalogFilters()
        {
            _logDescription = rm.GetString("servicesKey10");

            try
            {
                var result = await _service.GetCatalogFilters();

                Logging.LogRequest(_correlationID, _logDescription, "Get", "200", true);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.Message);
            }
        }
    }
}
