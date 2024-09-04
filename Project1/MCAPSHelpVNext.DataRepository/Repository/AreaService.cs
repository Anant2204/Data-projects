// <copyright file="AreaService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Context;
using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.IRepository;
using MCAPSHelpVNext.DataRepository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class AreaService : IAreaService, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public AreaService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void AddArea(Area area)
        {
            _dbContext.Areas.Add(area);
            _dbContext.SaveChanges();
        }

        public int DeleteArea(int areaId)
        {
            var config = _dbContext.Areas.FirstOrDefault(x => x.IsActive && x.Id == areaId);
            if (config != null)
            {
                 config.IsActive = false;
                _dbContext.Areas.Update(config);              
            }
            return _dbContext.SaveChanges();
        }

        public Area FindArea(int areaId)
        {
            return _dbContext.Areas.FirstOrDefault(x=>x.IsActive && x.Id == areaId);
        }

        public IEnumerable<CommonModel> GetAll()
        {
            var result =  _dbContext.Set<CommonModel>().FromSqlRaw("EXEC BSO.GetAllArea").AsEnumerable().ToList();
            return result;
        }


        public void UpdateArea(Area area)
        {
            _dbContext.Areas.Update(area);
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
