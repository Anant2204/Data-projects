// <copyright file="ServiceMappingService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class ServiceMappingService : IServiceMappingService, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public ServiceMappingService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void AddService(ServiceMapping service)
        {
            _dbContext.ServiceMappings.Add(service);
            _dbContext.SaveChanges();
        }

        public void DeleteService(int serviceId)
        {
            var config = _dbContext.Set<ServiceMapping>().FirstOrDefault(e => e.ServiceID == serviceId);
            if (config != null)
            {
                config.IsActive = false;
                _dbContext.ServiceMappings.Update(config);
                _dbContext.SaveChanges();
            }
        }

        public ServiceMapping FindService(int serviceId)
        {
            var result = _dbContext.Set<ServiceMapping>().FirstOrDefault(e => e.ServiceID == serviceId);
            return result;
        }

        public IEnumerable<ServiceMapping> GetAll()
        {
            return _dbContext.ServiceMappings.Where(x=>x.IsActive).ToList();           
                                  
        }

        public void UpdateService(ServiceMapping service)
        {
            _dbContext.ServiceMappings.Update(service);
            _dbContext.SaveChanges();
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
    }
}
