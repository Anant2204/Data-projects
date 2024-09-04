// <copyright file="SegmentServices.cs" company="Microsoft Corporation">
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
    public class SegmentServices : ISegmentService, IDisposable
    {

        private readonly BSODBContext _dbContext;

        public SegmentServices(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddSegment(Segment segment)
        {
            _dbContext.Segments.Add(segment);
            _dbContext.SaveChanges();
        }

        public void DeleteSegment(int segmentId)
        {
            var config = _dbContext.Segments.Find(segmentId);
            if (config != null)
            {
                config.IsActive = false;
                _dbContext.Segments.Update(config);
                _dbContext.SaveChanges();
            }
        }

        public Segment FindSegment(int segmentId)
        {
            return _dbContext.Segments.Find(segmentId);
        }

        public IEnumerable<CommonModel> GetAll()
        {
            var result =  _dbContext.Set<CommonModel>().FromSqlRaw("EXEC BSO.GetAllSegment").ToList();
            return result;
        }

        public IEnumerable<CommonModel> GetAllSegmentByRole(int id)
        {
            var roleParam = new SqlParameter("@id", id);

            var result = _dbContext.Set<CommonModel>()
                .FromSqlRaw("EXEC BSO.GetAllSegmentByRole @id", roleParam)
                .ToList();

            return result;
        }
        
        public void UpdateSegment(Segment segment)
        {
            _dbContext.Segments.Update(segment);
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
