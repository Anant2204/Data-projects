// <copyright file="IUserServices.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.HelperModel;
using MCAPSHelpVNext.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.IRepository
{
    public interface IUserServices
    {
        Task<int[]> AddUser(UserHelper userOb);
        public void UpdateUser(UserHelper userOb);
        void DeleteUser(int userId);
        User FindUser(int userId);
      
        IEnumerable<UserHelper> GetAll();
       
        Task<UserHelper> FindUserIdByEmail(string? emailId, string? Oid);

        Task<UserHelper> FindUserIdByEmailPerf(string emailId);

        void UpdateUserByObjectID(string userOBjectId, List<string> values);//UserADGroupListForJob

        void DisableUserAndRelatedData(string upn);

    }
}
