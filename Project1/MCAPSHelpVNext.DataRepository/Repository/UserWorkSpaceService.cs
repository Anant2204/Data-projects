// <copyright file="UserWorkSpaceService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Configurations;
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
using static System.TimeZoneInfo;

namespace MCAPSHelpVNext.DataRepository.Repository
{
    public class UserWorkSpaceService : IUserWorkSpaceService, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public UserWorkSpaceService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddUserWorkSpace(UserWorkSpace obj)
        {
            var existingData = _dbContext.UserWorkSpaces.Where(x => x.UserID == obj.UserID && x.ServiceID == obj.ServiceID).FirstOrDefault();
            if (existingData != null)
            {
                existingData.IsActive = true;
                existingData.Version = Convert.ToInt32(existingData.Version + 1);
                existingData.TransactionTime = DateTime.Now;
                _dbContext.UserWorkSpaces.Update(existingData);
                await _dbContext.SaveChangesAsync();

            }
            else
            {
                obj.IsActive = true;
                obj.Version = 1;
                obj.TransactionTime = DateTime.Now;
                await _dbContext.UserWorkSpaces.AddAsync(obj);
                await _dbContext.SaveChangesAsync();
            }
        }


        public async Task AddUserWorkSpaces(IEnumerable<UserWorkSpace> userWorkSpaces)
        {
            await _dbContext.UserWorkSpaces.AddRangeAsync(userWorkSpaces);
           await _dbContext.SaveChangesAsync();
        }

        public void DeleteUserWorkSpace(int objId)
        {
            var config = _dbContext.UserWorkSpaces.Find(objId);
            if (config != null)
            {
                _dbContext.UserWorkSpaces.Remove(config);
                _dbContext.SaveChanges();
            }
        }

        public UserWorkSpace FindUserWorkSpace(int objId)
        {
            return _dbContext.UserWorkSpaces.Find(objId);
        }


        public IEnumerable<UserWorkSpaceResult> GetAllByUserId(int UserId)
        {
            var iDParam = new SqlParameter("@UserId", UserId);

            return _dbContext.Set<UserWorkSpaceResult>()
        .FromSqlRaw("EXEC BSO.GetUserWorkSpacesByUserId @UserId", iDParam).ToList();

        }

        // Performance Testing Service
        public IEnumerable<UserWorkSpaceResult> GetAllByUserIdPerf(int userId)
        {
            var iDParam = new SqlParameter("@UserId", userId);

            return _dbContext.Set<UserWorkSpaceResult>()
        .FromSqlRaw("EXEC BSO.GetUserWorkSpacesByUserIdTest @UserId", iDParam).ToList();
        }


        public IEnumerable<UserWorkSpace> GetAll()
        {         
            return _dbContext.UserWorkSpaces.ToList();
        }


        public int GetVersionFromDatabase(int userId)
        {
            // Assuming UserWorkSpace is your main data table
            var latestVersion = _dbContext.UserWorkSpaces.Where(x => x.UserID == userId).Count();
            return latestVersion;
        }

        public void UpdateUserWorkSpace(UserWorkSpace obj)
        {
            _dbContext.UserWorkSpaces.Update(obj);
            _dbContext.SaveChanges();
        }

        public IEnumerable<UserWorkSpace> GetAllBasedOnUserId(int UserId)
        {
            return _dbContext.UserWorkSpaces.Where(x=>x.UserID == UserId).ToList();
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
