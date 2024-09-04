// <copyright file="ServiceService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Data;
using System.Text;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class ServiceService : IServiceServices, IDisposable
    {
        private readonly BSODBContext _dbContext;
        private readonly HttpClient _httpClient;

        public ServiceService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
            _httpClient = new HttpClient();

        }

        public void AddService(Service service)
        {
            _dbContext.Services.Add(service);
            _dbContext.SaveChanges();
        }

        public void DeleteService(int serviceId)
        {
            var config = _dbContext.Services.Find(serviceId);
            if (config != null)
            {
                config.IsActive = false;
                _dbContext.Services.Update(config);
                _dbContext.SaveChanges();
            }
        }

        public Service FindService(int serviceId)
        {
            return _dbContext.Services.FirstOrDefault(x => x.IsActive && x.Id == serviceId);
        }

        public IEnumerable<Service> GetAll()
        {
            return _dbContext.Services.Where(x => x.IsActive).ToList();
        }

        public IEnumerable<ServiceModelHelper> GetAllLoggedInService()
        {
            return _dbContext.Set<ServiceModelHelper>().FromSqlRaw("EXEC BSO.GetLoggedInServices").ToList();
        }

        public ServiceModelHelper GetLoggedInServicesByID(int serviceID)
        {
            var serviceIDParam = new SqlParameter("@ServiceID", serviceID);

            return _dbContext.Set<ServiceModelHelper>()
         .FromSqlRaw("EXEC BSO.GetLoggedInServicesByID @ServiceID", serviceIDParam).AsEnumerable().FirstOrDefault();
        }


        public void UpdateService(Service service)
        {
            _dbContext.Services.Update(service);
            _dbContext.SaveChanges();
        }


        public async Task<IEnumerable<ServiceHelper>> GetAllBasedOnUser(int UserId, dynamic ? body)
        {
            var iDParam = new SqlParameter("@UserId", UserId);

            var mcemfilter = new SqlParameter("@FilterMCEM", SqlDbType.NVarChar, 200);
            if (body.McemFilter != null)
            {
                mcemfilter.Value = body.McemFilter;
            }
            else
            {
                mcemfilter.Value = DBNull.Value;
            }

            var catgfilter = new SqlParameter("@FilterServiceCategory", SqlDbType.NVarChar, 200);
            if (body.CategoryFilter != null)
            {
                catgfilter.Value = body.CategoryFilter;
            }
            else
            {
                catgfilter.Value = DBNull.Value;
            }

            return await _dbContext.Set<ServiceHelper>()
        .FromSqlRaw("EXEC BSO.GetActiveServicesNotInUserWorkSpace @UserId, @FilterMCEM, @FilterServiceCategory", iDParam, mcemfilter, catgfilter).ToListAsync();
        }

        public async Task<IEnumerable<ServiceHelper>> GetAllBasedOnUserWithSearch(int userId, string query, dynamic ? body)
        {
            var iDParam = new SqlParameter("@UserId", userId);
            var queryParam = new SqlParameter("@Query", query);

            var mcemfilter = new SqlParameter("@FilterMCEM", SqlDbType.NVarChar, 200);
            if (body.McemFilter != null)
            {
                mcemfilter.Value = body.McemFilter;
            }
            else
            {
                mcemfilter.Value = DBNull.Value;
            }

            var catgfilter = new SqlParameter("@FilterServiceCategory", SqlDbType.NVarChar, 200);
            if (body.CategoryFilter != null)
            {
                catgfilter.Value = body.CategoryFilter;
            }
            else
            {
                catgfilter.Value = DBNull.Value;
            }

            return await _dbContext.Set<ServiceHelper>()
                .FromSqlRaw("EXEC BSO.GetActiveServicesNotInUserWorkSpace_Search @UserId, @Query, @FilterMCEM, @FilterServiceCategory", iDParam, queryParam, mcemfilter, catgfilter)
                .ToListAsync();
        }


        public async Task<IEnumerable<ServiceGroupAndRequestTypeHelper>> ServiceGroupAndRequestType(int serviceID, int UserId)
        {
            var iDParam = new SqlParameter("@ServiceID", serviceID);
            var userParam = new SqlParameter("@UserId", UserId);

            return await _dbContext.Set<ServiceGroupAndRequestTypeHelper>()
        .FromSqlRaw("EXEC BSO.GetServiceGroupNRequestTypeDetails @ServiceID , @UserId", iDParam, userParam).ToListAsync();
        }

        public async Task<string> GetCatalogFilters()
        {
            var results = await _dbContext.Set<CatalogFilterModel>()
                .FromSqlRaw("EXEC BSO.GetCatalogFiltersJSON")
                .ToListAsync();

            var groupedResults = results.GroupBy(model => model.Type)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(item => new
                    {
                        item.ID,
                        item.Name
                    })
                    .ToList()
                );

            var json = JsonConvert.SerializeObject(groupedResults);
            return json;
        }





        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
                // Add disposal logic for other disposable objects if any
            }
        }

        public async Task<IEnumerable<EcifPoDetailsResponse>> GetEcifStatus_GetPoDetails(string link, string search)
        {
            var apiResponses = new List<EcifPoDetailsResponse>();

            try
            {
                object payload = new
                {
                    PO_Number = search
                };
                var responseData = await MakeHttpPostRequest(link, payload);
                string jsonString = responseData.Replace("\\\"", "\"").Replace("\"[", "[").Replace("]\"", "]");
                SqlResponseEcifPoDetails result = JsonConvert.DeserializeObject<SqlResponseEcifPoDetails>(jsonString);

                foreach (var program in result.EcifPoDetails)
                {
                    var apiResponse = new EcifPoDetailsResponse
                    {
                        PONumber = program.PONumber,
                        StatusCode = program.StatusCode,
                        POSubmittedDate = program.POSubmittedDate,
                        POApprovedDate = program.POApprovedDate
                    };

                    apiResponses.Add(apiResponse);
                }
            }
            catch (Exception)
            {
                //
            }

            return apiResponses;
        }

        public async Task<IEnumerable<EcifProgramsResponse>> GetEcifStatus_GetAllEcifPrograms(string link)
        {
            var programResponses = new List<EcifProgramsResponse>();
            try
            {
                var response = await _httpClient.GetAsync(link);
                var responseData = await response.Content.ReadAsStringAsync();
                string jsonString = responseData.Replace("\\\"", "\"").Replace("\"[", "[").Replace("]\"", "]");
                SqlResponse result = JsonConvert.DeserializeObject<SqlResponse>(jsonString);

                foreach (var program in result.Programs)
                {
                    var programResponse = new EcifProgramsResponse
                    {
                        ProgramName = program.ProgramId+" - "+program.ProgramName,
                        AreaName = program.AreaName,
                        Owner = program.Owner,
                        ProgramType = program.ProgramType
                    };

                    programResponses.Add(programResponse);
                }

            }
            catch (Exception)
            {
                //
            }
            return programResponses;
        }

        public async Task<IEnumerable<EcifCasesResponse>> GetEcifStatus_GetAllMyEcifCases(string link, string firstName, string lastName)
        {
            var apiResponses = new List<EcifCasesResponse>();

            try
            {
                object payload = new
                {
                    //FirstName = "Mukesh",
                    //LastName = "Yadav"
                    FirstName = firstName,
                    LastName = lastName
                };
                var responseData = await MakeHttpPostRequest(link, payload);
                string jsonString = responseData.Replace("\\\"", "\"").Replace("\"[", "[").Replace("]\"", "]");
                SqlResponseEcifCases result = JsonConvert.DeserializeObject<SqlResponseEcifCases>(jsonString);

                foreach (var program in result.EcifCases)
                {
                    var apiResponse = new EcifCasesResponse
                    {
                        CaseRequestId = program.CaseRequestId,
                        Status = program.Status,
                        Requester = program.Requester,
                        DeliveryStartDate = program.DeliveryStartDate,
                        DeliveryEndDate = program.DeliveryEndDate,
                    };

                    apiResponses.Add(apiResponse);
                }
            }
            catch (Exception)
            {
                //
            }

            return apiResponses;
        }
        
        public async Task<IEnumerable<EcifCasesDetailsResponse>> GetEcifStatus_GetSpecificEcifCaseStatus(string link, string search)
        {
            var apiResponses = new List<EcifCasesDetailsResponse>();

            try
            {
                object payload = new
                {
                    Case_Number = search
                };
                var responseData = await MakeHttpPostRequest(link, payload);
                string jsonString = responseData.Replace("\\\"", "\"").Replace("\"[", "[").Replace("]\"", "]");
                SqlResponseEcifCasesDetails result = JsonConvert.DeserializeObject<SqlResponseEcifCasesDetails>(jsonString);

                foreach (var program in result.EcifCasesDetails)
                {
                    var apiResponse = new EcifCasesDetailsResponse
                    {
                        //CaseRequestId = program.CaseRequestId,
                        Status = program.Status,
                        StatusDetail = program.StatusDetail,
                        Requester = program.Requester,
                        DeliveryStartDate = program.DeliveryStartDate,
                        DeliveryEndDate = program.DeliveryEndDate,
                    };

                    apiResponses.Add(apiResponse);
                }
            }
            catch (Exception)
            {
                //
            }

            return apiResponses;
        }

        private async Task<string> MakeHttpPostRequest(string link, object payload)
        {
            // Serialize the payload object to JSON
            var jsonPayload = Newtonsoft.Json.JsonConvert.SerializeObject(payload);

            // Create the HTTP request with the JSON payload
            var requestContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(link, requestContent);

            // Process the response data as needed
            var responseData = await response.Content.ReadAsStringAsync();

            return responseData;

        }
    }
}
