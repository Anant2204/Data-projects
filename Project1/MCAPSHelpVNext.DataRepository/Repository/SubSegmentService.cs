// <copyright file="SubSegmentService.cs" company="Microsoft Corporation">
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
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class SubSegmentService : ISubSegmentService, IDisposable
    {

        private readonly BSODBContext _dbContext;

        public SubSegmentService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddSubSegment(SubSegment subSegment)
        {
            _dbContext.SubSegments.Add(subSegment);
            _dbContext.SaveChanges();
        }

        public void DeleteSubSegment(int subSegmentId)
        {
            var config = _dbContext.SubSegments.Find(subSegmentId);
            if (config != null)
            {
                config.IsActive = false;
                _dbContext.SubSegments.Update(config);
                _dbContext.SaveChanges();
            }
        }

        public SubSegment FindSubSegment(int subSegmentId)
        {
            return _dbContext.SubSegments.Find(subSegmentId);
        }

        public IEnumerable<SubSegment> GetAll()
        {
           return _dbContext.SubSegments.Where(x => x.IsActive).ToList();
        }


        public IEnumerable<CommonModel> GetAllSubSegmentBySegmentId(int segmentId)
        {
            var upnParam = new SqlParameter("@SegmentId", segmentId);
            var result =  _dbContext.Set<CommonModel>().FromSqlRaw("EXEC BSO.GetAllSubSegment @SegmentId", upnParam).ToList();
            return result;
        }

        public void UpdateSubSegment(SubSegment subSegment)
        {
            _dbContext.SubSegments.Update(subSegment);
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
