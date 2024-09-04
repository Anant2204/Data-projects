// <copyright file="RoleService.cs" company="Microsoft Corporation">
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
    public class RoleService : IRoleService, IDisposable
    {
        private readonly BSODBContext _dbContext;

        public RoleService(BSODBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddRole(Role role)
        {
            _dbContext.Roles.Add(role);
            _dbContext.SaveChanges();
        }

        public void DeleteRole(int roleId)
        {
            var config = _dbContext.Roles.Find(roleId);
            if (config != null)
            {
                 config.IsActive = false;
                _dbContext.Roles.Update(config);
                _dbContext.SaveChanges();
            }
        }

        public Role FindRole(int roleId)
        {
            return _dbContext.Roles.Find(roleId);
        }

        public  IEnumerable<CommonModel> GetAll()
        {
            var result =  _dbContext.Set<CommonModel>().FromSqlRaw("EXEC BSO.GetAllRole").ToList();        
            return result;
        }

        public void UpdateRole(Role role)
        {
            _dbContext.Roles.Update(role);
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
