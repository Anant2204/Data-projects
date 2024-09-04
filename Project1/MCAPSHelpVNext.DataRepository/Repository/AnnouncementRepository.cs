// <copyright file="AnnouncementRepository.cs" company="Microsoft Corporation">
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
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class AnnouncementRepository : IAnnouncementRepository, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public AnnouncementRepository(BSODBContext dbContext)
        {
            _dbContext = dbContext;
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

        public IList<AnnouncementModel> GetAllAnnouncement()
        {
            return _dbContext.Set<AnnouncementModel>().FromSqlRaw("EXEC BSO.GetAnnouncements").ToList();
        }
    }
}
