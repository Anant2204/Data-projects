// <copyright file="IAuthorizationStoreService.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Auth
{
    using System.Threading.Tasks;
    using MCAPSHelpVNext.Api.Shared;

    /// <summary>
    /// Defines the authorization store service that retreives the permission matrix for an identity from the underlying store.
    /// </summary>
    public interface IAuthorizationStoreService
    {
        /// <summary>
        /// Gets the role for the user on the specified estimate.
        /// </summary>
        /// <param name = "entityId">The resource entity id.</param>
        /// <param name = "identity">The user identity.</param>
        /// <param name = "entityType">The resource type.</param>
        /// <returns>The user role as <see cref="RoleTypesEnum"/>.</returns>
        Task<RoleTypesEnum> GetResourceRoleAsync(EntityTypeEnum entityType, string entityId, string identity);

        /// <summary>
        /// Gets the permission for the user on the specfic estimate.
        /// </summary>
        /// <param name = "entityType">The resource type.</param>
        /// <param name = "entityId">The user identity.</param>
        /// <param name = "identity">The user identity.</param>
        /// <returns>The user permissions.</returns>
        Task<List<PermissionTypeEnum>> GetResourceRolePermissionsAsync(EntityTypeEnum entityType, string entityId, string identity);
    }
}
