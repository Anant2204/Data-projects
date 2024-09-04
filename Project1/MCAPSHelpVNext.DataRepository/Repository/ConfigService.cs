// <copyright file="ConfigService.cs" company="Microsoft Corporation">
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
    public class ConfigService: IConfigService, IDisposable
    {
        private readonly BSODBContext _dbContext;

        public ConfigService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddConfig(Config config)
        {
            _dbContext.Configs.Add(config);
            _dbContext.SaveChanges();
        }

        public IEnumerable<Config> GetAll()
        {
           return _dbContext.Configs.ToList();            
        }

        public void UpdateConfig(Config config)
        {
            _dbContext.Configs.Update(config);
            _dbContext.SaveChanges();
        }

        public void DeleteConfig(int configId)
        {
            var config = _dbContext.Configs.Find(configId);
            if (config != null)
            {
                _dbContext.Configs.Remove(config);
                _dbContext.SaveChanges();
            }
        }

        public Config FindConfig(int configId)
        {
            return _dbContext.Configs.Find(configId);
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
