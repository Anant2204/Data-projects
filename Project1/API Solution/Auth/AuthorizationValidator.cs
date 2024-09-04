// <copyright file="AuthorizationValidator.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Auth
{
    using System.Security.Claims;
    using Microsoft.AspNetCore.Mvc;
    using MCAPSHelpVNext.Api.Shared;
    using MCAPSHelpVNext.Api.Auth;
    using MCAPSHelpVnext.Api.Services;

    /// <summary>
    /// AuthorizationValidator.
    /// </summary>
    public class AuthorizationValidator : IAuthorizationValidator
    {
        private readonly IAuthorizationStoreService cachedAuthorizationStoreService;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthorizationValidator"/> class.
        /// this will be used as on controller.
        /// [Authorize(AuthenticationSchemes = "SchemeStsA,SchemeStsB", Policy = "MyPolicy")].
        /// </summary>
        /// <param name="cachedAuthorizationStoreService">The fallback authorization store.</param>
        public AuthorizationValidator(IAuthorizationStoreService cachedAuthorizationStoreService)
        {
            this.cachedAuthorizationStoreService = cachedAuthorizationStoreService;
        }

        /// <summary>
        /// The validator for user roles.
        /// </summary>
        /// <param name="entityTypeEnum"> the entity type enum.</param>
        /// <param name="entityid">the entity id.</param>
        /// <param name="claimsPrincipal">the current user context.</param>
        /// <param name="requiredPermission">the required permission for current action.</param>
        /// <exception cref="BadHttpRequestException">the exception.</exception>
        /// <returns>this method return exception when validation failed.</returns>
        public async Task ValidateAsync(EntityTypeEnum entityTypeEnum, string entityid, ClaimsPrincipal claimsPrincipal, PermissionTypeEnum requiredPermission)
        {
            var user = (claimsPrincipal?.Identity?.GetAlias()) ?? throw new BadHttpRequestException(message: "User is not authorization to perform this operation", statusCode: 403);
            var currentUserPermissions = await this.cachedAuthorizationStoreService.GetResourceRolePermissionsAsync(entityTypeEnum, entityid, user).ConfigureAwait(false);

            if (currentUserPermissions == null || !currentUserPermissions.Contains(requiredPermission))
            {
                throw new BadHttpRequestException(message: "User is not authorization to perform this operation", statusCode: 403);
            }
        }
    }
}
