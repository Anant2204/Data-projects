// <copyright file="IUserWorkSpaceService.cs" company="Microsoft Corporation">
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
    public interface IUserWorkSpaceService
    {
        Task AddUserWorkSpace(UserWorkSpace obj);
        Task AddUserWorkSpaces(IEnumerable<UserWorkSpace> userWorkSpaces);
        void UpdateUserWorkSpace(UserWorkSpace obj);
        void DeleteUserWorkSpace(int objId);
        UserWorkSpace FindUserWorkSpace(int objId);
        IEnumerable<UserWorkSpace> GetAll();
        IEnumerable<UserWorkSpace> GetAllBasedOnUserId(int UserId);
      
        IEnumerable<UserWorkSpaceResult> GetAllByUserId(int UserId);

        IEnumerable<UserWorkSpaceResult> GetAllByUserIdPerf(int userId);
        int GetVersionFromDatabase(int userId);

      
    }
}
