// <copyright file="Repository.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>
namespace MCT.DataAccess.Repository
{
    using MCT.DataAccess.Context;
    using MCT.DataAccess.Interfaces;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Generic  Repository.
    /// </summary>
    public class Repository<T> : IRepository<T> where T : class
    {

        private readonly ConversationContext _context;
        private readonly DbSet<T> entities;

        /// <summary>Initializes a new instance of the <see cref="Repository{T}" /> class.</summary>
        /// <param name="context">The context.</param>
        public Repository(ConversationContext context)
        {
            _context = context;
            entities = context.Set<T>();
        }

    }
}
