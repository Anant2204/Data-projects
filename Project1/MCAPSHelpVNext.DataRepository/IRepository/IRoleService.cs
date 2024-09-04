// <copyright file="IRoleService.cs" company="Microsoft Corporation">
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
    public interface IRoleService
    {
        void AddRole(Role role);
        void UpdateRole(Role role);
        void DeleteRole(int roleId);
        Role FindRole(int roleId);
        IEnumerable<CommonModel> GetAll();

    }

}
