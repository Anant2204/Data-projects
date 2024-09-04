// <copyright file="UnitOfWork.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace MCT.DataAccess.UnitOfWork
{
    using System.Data.Entity;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using MCT.DataAccess.Context;

    /// <summary>
    ///  UnitOfWork for Repository object
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ConversationContext _context;
        private readonly IServiceProvider _provider;
        /// <summary>Initializes a new instance of the <see cref="UnitOfWork" /> class.</summary>
        /// <param name="context">The context.</param>
        /// <param name="provider">The provider.</param>
        public UnitOfWork(ConversationContext context,IServiceProvider provider)
        {
            _context = context;
            _provider = provider;
    
        }

        /// <summary>
        /// Method to repository object.
        /// </summary>
        public T GetRepository<T>() where T : notnull
        {
            return this._provider.GetRequiredService<T>();
        }

        /// <summary>
        /// Method to save all changes.
        /// </summary>
        public void Complete()
        {

            _context.SaveChanges();
        }
        /// <summary>
        /// Updates the entity.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity.</typeparam>
        /// <param name="entityToUpdate">The entity to update.</param>
        public void UpdateEntity<TEntity>(TEntity entityToUpdate) where TEntity : class
        {
            // Check if the entity is already being tracked by the context
            var entry = _context.Entry(entityToUpdate);

            if (entry.State == Microsoft.EntityFrameworkCore.EntityState.Detached)
            {
                // If the entity is not being tracked, attach it and mark it as modified
                _context.Set<TEntity>().Attach(entityToUpdate);
                entry.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            }
            // Save the changes
            _context.SaveChanges();
        }
       
        private bool disposed = false;

        /// <summary>
        /// Method to dispose object.
        /// </summary>
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed && disposing)
            {
                _context.Dispose();
            }
            disposed = true;
        }

        /// <summary>
        /// Method to dispose.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
