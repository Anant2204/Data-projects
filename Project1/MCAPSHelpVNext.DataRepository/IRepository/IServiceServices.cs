// <copyright file="IServiceServices.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.IRepository
{
    public interface IServiceServices
    {
        void AddService(Service service);
        void UpdateService(Service service);
        void DeleteService(int serviceId);
        Service FindService(int serviceId);
       
        IEnumerable<ServiceModelHelper> GetAllLoggedInService();
        ServiceModelHelper GetLoggedInServicesByID(int serviceID);

        Task<IEnumerable<ServiceHelper>> GetAllBasedOnUser(int UserId, dynamic? body);
        Task<IEnumerable<ServiceHelper>> GetAllBasedOnUserWithSearch(int userId, string query, dynamic ? body);
        Task<IEnumerable<ServiceGroupAndRequestTypeHelper>> ServiceGroupAndRequestType(int serviceID, int UserId);
        Task<IEnumerable<EcifPoDetailsResponse>> GetEcifStatus_GetPoDetails(string link, string search);
        Task<IEnumerable<EcifProgramsResponse>> GetEcifStatus_GetAllEcifPrograms(string link);
        Task<IEnumerable<EcifCasesResponse>> GetEcifStatus_GetAllMyEcifCases(string link, string firstName, string lastName);
        Task<IEnumerable<EcifCasesDetailsResponse>> GetEcifStatus_GetSpecificEcifCaseStatus(string link, string search);
    }
}
