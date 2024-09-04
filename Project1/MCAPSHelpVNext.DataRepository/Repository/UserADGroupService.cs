// <copyright file="UserADGroupService.cs" company="Microsoft Corporation">
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
    public class UserADGroupService : IUserADGroupService, IDisposable
    {
        private readonly BSODBContext _dbContext;
        public UserADGroupService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddUserADGroup(UserADGroup user)
        {
            _dbContext.UserADGroups.Add(user);
            _dbContext.SaveChanges();
        }

        public void DeleteUserADGroup(int userId)
        {
            var config = _dbContext.UserADGroups.Find(userId);
            if (config != null)
            {
                config.IsActive = false;
                _dbContext.UserADGroups.Update(config);
                _dbContext.SaveChanges();
            }
        }

        public UserADGroup FindUserADGroup(int userId)
        {
            return _dbContext.UserADGroups.Find(userId);
        }

        public IEnumerable<UserADGroup> GetAll()
        {
           return _dbContext.UserADGroups.Where(x => x.IsActive).ToList();
        }

        public void UpdateUserADGroup(UserADGroup user)
        {
            _dbContext.UserADGroups.Update(user);
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
