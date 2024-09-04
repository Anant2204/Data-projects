// <copyright file="IAuthorizationValidator.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>


namespace MCAPSHelpVNext.Api.Auth
{
    using System.Security.Claims;
    using MCAPSHelpVNext.Api.Shared;


    /// <summary>
    /// IAuthorizationValidator.
    /// </summary>
    public interface IAuthorizationValidator
    {
        /// <summary>
        /// The validator for user roles.
        /// </summary>
        /// <param name="entityTypeEnum"> the entity type enum.</param>
        /// <param name="entityid">the entity id.</param>
        /// <param name="claimsPrincipal">the current user context.</param>
        /// <param name="requiredPermission">the required permission for current action.</param>
        /// <exception cref="BadHttpRequestException">the exception.</exception>
        /// <returns>This method return exception when validation failed.</returns>
        Task ValidateAsync(EntityTypeEnum entityTypeEnum, string entityid, ClaimsPrincipal claimsPrincipal, PermissionTypeEnum requiredPermission);
    }
}