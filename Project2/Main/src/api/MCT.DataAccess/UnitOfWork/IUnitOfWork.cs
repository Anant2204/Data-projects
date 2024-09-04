// <copyright file="IUnitOfWork.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.UnitOfWork
{
    /// <summary>
    ///  Interface IUnitOfWork
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>Gets the repository.</summary>
        /// <typeparam name="T"></typeparam>
        /// <returns>
        ///   Repository object
        /// </returns>
        public T GetRepository<T>() where T : notnull;

        /// <summary>Completes this instance.</summary>
        void Complete();
        /// <summary>
        /// Updates the entity.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entityToUpdate">The entity.</param>
        void UpdateEntity<T>(T entityToUpdate) where T : class;
    }
}
