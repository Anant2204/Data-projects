// <copyright file="ServiceOwnerServiceRepository.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class ServiceOwnerServiceRepository : IServiceOwnerServiceRepository, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public ServiceOwnerServiceRepository(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void AddServiceOwner(Models.ServiceOwnerServiceModel obj)
        {
            _dbContext.ServiceOwnerServics.Add(obj);
            _dbContext.SaveChanges();
        }

        public void DeleteServiceOwner(int objId)
        {
            var config = _dbContext.ServiceOwnerServics.FirstOrDefault(x => x.ServiceID == objId);
            if (config != null)
            {
                _dbContext.ServiceOwnerServics.Remove(config);
                _dbContext.SaveChanges();
            }
        }

        public Models.ServiceOwnerServiceModel FindServiceOwner(int objId)
        {
            return _dbContext.ServiceOwnerServics.FirstOrDefault(x=>x.ServiceID == objId);
        }

        public IEnumerable<Models.ServiceOwnerServiceModel> GetAll()
        {
            return _dbContext.ServiceOwnerServics.ToList();
        }

        public void UpdateServiceOwner(Models.ServiceOwnerServiceModel obj)
        {
            _dbContext.ServiceOwnerServics.Update(obj);
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
