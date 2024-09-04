// <copyright file="IManagerService.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.Business.Interfaces
{
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;

    /// <summary>
    ///  Manager service
    /// </summary>
    public interface IManagerService 
    {
        /// <summary>Gets the manager list.</summary>
        /// <param name="managerListRequest">Manager list request.</param>
        /// <param name="loggedInUserAlias">Logged in user alias.</param>
        /// <param name="roleList">Logged in user roles.</param>
        /// <returns>
        ///  Listof manager List
        /// </returns>
        Task<GetManagerWithDefaultSelection> GetManagerList(ManagerListRequest managerListRequest, string loggedInUserAlias, List<string> roleList);
    }
}
