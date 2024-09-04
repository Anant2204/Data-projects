// <copyright file="AnnouncementService.cs" company="Microsoft Corporation">
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
    public class AnnouncementService : IAnnouncementService, IDisposable
    {
        private readonly BSODBContext _dbContext;

        public AnnouncementService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }


        public IEnumerable<Announcement> GetAnnouncements()
        {
            var result = _dbContext.Set<Announcement>().FromSqlRaw("EXEC BSO.GetAllAnnouncement").ToList();
            return result;

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

