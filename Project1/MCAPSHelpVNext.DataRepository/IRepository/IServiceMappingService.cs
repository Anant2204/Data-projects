// <copyright file="IServiceMappingService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.IRepository
{
    public interface IServiceMappingService
    {

        void AddService(ServiceMapping service);
        void UpdateService(ServiceMapping service);
        void DeleteService(int serviceId);
        ServiceMapping FindService(int serviceId);
        IEnumerable<ServiceMapping> GetAll();
    }
}
