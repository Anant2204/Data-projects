// <copyright file="ServiceOwnerRepository.cs" company="Microsoft Corporation">
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
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class ServiceOwnerRepository : IServiceOwnerRepository, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public ServiceOwnerRepository(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddServiceOwner(ServiceOwnerModel obj)
        {
            _dbContext.ServiceOwners.Add(obj);
            _dbContext.SaveChanges();
        }

        public void DeleteServiceOwner(int objId)
        {
            var config = _dbContext.ServiceOwners.Find(objId);
            if (config != null)
            {
                config.IsActive = false;
                _dbContext.ServiceOwners.Update(config);
                _dbContext.SaveChanges();
            }
        }

        public ServiceOwnerModel FindServiceOwner(int objId)
        {
            return _dbContext.ServiceOwners.FirstOrDefault(k=>k.IsActive && k.ID == objId);
        }

        public IEnumerable<ServiceOwnerModel> GetAll()
        {
            return _dbContext.ServiceOwners.Where(k=>k.IsActive).ToList();
        }

        public void UpdateServiceOwner(ServiceOwnerModel obj)
        {
            _dbContext.ServiceOwners.Update(obj);
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
