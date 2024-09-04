// ***********************************************************************
// <copyright file="CorrelationManager.cs" company="Microsoft">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary> Project Controller</summary>
// ***********************************************************************

namespace Copilot.Backend.Logger.Core
{
    using Microsoft.AspNetCore.Http;
    using System;
    using System.Linq;

    /// <summary>
    /// Correlation Manager
    /// </summary>
    public static class CorrelationManager
    {
        /// <summary>
        /// The operation identifier key
        /// </summary>
        private const string OperationIdKey = "OperationId";

        /// <summary>
        /// The operationParentId identifier key
        /// </summary>
        private const string OperationParentIdKey = "OperationParentId";

        /// <summary>
        /// The operationName identifier key
        /// </summary>
        private const string OperationName = "OperationName";

        /// <summary>
        /// The Correlation Id
        /// </summary>
        private const string CorrelationIdKey = "CorrelationIdKey";

        /// <summary>
        /// Http Context accessor
        /// </summary>
        public static HttpContext _httpContext => new HttpContextAccessor().HttpContext;

        /// <summary>
        /// Gets the correlation identifier.
        /// </summary>
        /// <returns>Operation identifier</returns>
        public static string CorrelationId
        {
            get
            {
                if (_httpContext != null && _httpContext.Request != null
                    && _httpContext.Request.Headers.Keys.Any(k =>
                    string.Compare(k.ToLower(), "x-correlation-id", StringComparison.OrdinalIgnoreCase) == 0))
                {
                    return _httpContext.Request.Headers["X-Correlation-Id"].ToString();
                }

                return Guid.NewGuid().ToString();
            }
        }

        /// <summary>
        /// Sets the operation identifier.
        /// </summary>
        /// <param name="operationId">The operation identifier.</param>
        public static void SetOperationId(string operationId)
        {
            CallContext.SetData(OperationIdKey, operationId);
        }

        /// <summary>
        /// Gets the operation identifier.
        /// </summary>
        /// <returns>Operation identifier</returns>
        public static string GetOperationId()
        {
            var id = CallContext.GetData(OperationIdKey) as string;
            return id ?? Guid.NewGuid().ToString();
        }

        /// <summary>
        /// Set correlation Id
        /// </summary>
        /// <param name="operationId"> operation Id. </param>
        public static void SetCorrelationId(string operationId)
        {
            CallContext.SetData(CorrelationIdKey, operationId);
        }

        /// <summary>
        /// Get the Correlation ID 
        /// </summary>
        /// <returns>it will return id</returns>
        public static string GetCorrelationId()
        {
            var id = CallContext.GetData(CorrelationIdKey) as string;
            if (id == null)
            {
                string cid = CorrelationManager.CorrelationId;
                return cid;
            }

            return id;
        }

        /// <summary>
        /// Sets the operationParentId identifier.
        /// </summary>
        /// <param name="operationParentId">operationParentId</param>
        public static void SetOperationParentId(string operationParentId)
        {
            CallContext.SetData(OperationParentIdKey, operationParentId);
        }

        /// <summary>
        /// Gets the operationParentId identifier.
        /// </summary>
        /// <returns>OperationParentId identifier</returns>
        public static string GetOperationParentId()
        {
            var id = CallContext.GetData(OperationParentIdKey) as string;
            return id ?? Guid.NewGuid().ToString();
        }

        /// <summary>
        /// Gets the operation name.
        /// </summary>
        /// <returns>Operation name</returns>
        public static string GetOperationName()
        {
            var name = CallContext.GetData(OperationName) as string;
            return name ?? "";
        }


        /// <summary>
        /// Set operation name
        /// </summary>
        /// <param name="operationName">operationName</param>
        public static void SetOperationName(string operationName)
        {
            CallContext.SetData(OperationName, operationName);
        }
    }
}