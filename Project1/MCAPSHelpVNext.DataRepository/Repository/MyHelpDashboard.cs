// <copyright file="MyHelpDashboard.cs" company="Microsoft Corporation">
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
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class MyHelpDashboard : IMyHelpDashboard, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public MyHelpDashboard(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add(MyHelpDasboard obj)
        {
           _dbContext.MyHelpDasboards.Add(obj);
            _dbContext.SaveChanges();
        }

        public MyHelpDasboard FindById(int Id)
        {
            return _dbContext.MyHelpDasboards.Find(Id);
        }

        public IEnumerable<MyHelpDasboard> GetAll()
        {
            return _dbContext.MyHelpDasboards.ToList();
        }

        public void Update(MyHelpDasboard obj)
        {
            _dbContext.MyHelpDasboards.Update(obj);
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
