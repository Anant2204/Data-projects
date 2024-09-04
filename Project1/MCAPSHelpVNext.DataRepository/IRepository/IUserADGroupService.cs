// <copyright file="IUserADGroupService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using MCAPSHelpVNext.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCAPSHelpVNext.DataRepository.IRepository
{
    public interface IUserADGroupService
    {
        void AddUserADGroup(UserADGroup user);
        void UpdateUserADGroup(UserADGroup user);
        void DeleteUserADGroup(int userId);
        UserADGroup FindUserADGroup(int userId);
        IEnumerable<UserADGroup> GetAll();
    }
}
