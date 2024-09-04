// <copyright file="IManagerRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Interfaces
{
    using MCT.DataAccess.EfModels.EfCustomModels;
    using MCT.DataAccess.Models;


    /// <summary>
    /// ManagerRepository interface
    /// </summary>
    public interface IManagerRepository
    {

        /// <summary>
        /// get all method to retrieve managers.
        /// </summary>
        Task<List<Manager>> GetAll();

        /// <summary>
        /// get all method to retrieve managers with Authorization.
        /// </summary>
        Task<List<Manager>> GetAll(string currentUserAlias);

        /// <summary>
        /// get managers list.
        /// </summary>
        Task<List<GetManagerListResult>?> GetManagersList(string currentUserAlias, bool? completeReportingHierarchy, List<string> roleList);


        /// <summary>
        /// get managers list by empAlias.
        /// </summary>
        Task<string?> GetManagersListByEmpAlias(string empAlias, string isSendOrReceive);
    }
}
