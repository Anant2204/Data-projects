// <copyright file="IRepository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Interfaces
{
    /// <summary>
    /// repository interface
    /// </summary>
    public interface IRepository<T> where T : class
    {
        ///// <summary>
        ///// get method  declaration
        ///// </summary>
        //Task<List<T>> GetAll();
    }
}
