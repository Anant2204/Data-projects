// <copyright file="AuthorizationGroupHandler.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using Azure;
using Azure.Core;
using MCAPSHelpVnext.Common.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Graph;
using Microsoft.Identity.Web;
using Newtonsoft.Json;
using System.Diagnostics.Tracing;
using System.Security.Claims;



namespace MCAPSHelpVNext.API.Helpers
{

    /// <summary>
    /// 
    /// </summary>
    public class GroupRequirement : IAuthorizationRequirement
    {
        public string GroupName { get; }

        public GroupRequirement(string groupName)
        {
            GroupName = groupName;
        }
    }
    /// <summary>
    /// 
    /// </summary>
    public class AuthorizationGroupHandler : AuthorizationHandler<GroupRequirement>
    {
        
        private readonly IHttpContextAccessor _httpContextAccessor;
        private const string ConstAuthorizeUserIsInSecurityGroup = "AuthorizeUserIsInSecurityGroup";

        public AuthorizationGroupHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, GroupRequirement requirement)
        {
            var requestMethod = _httpContextAccessor.HttpContext.Request.Path;
            
            try
            {
                var currentUserClaims = context.User.Claims;
                bool customClaimExists = context.User.Claims.Any(c => c.Type == ConstAuthorizeUserIsInSecurityGroup);

                if (!customClaimExists)
                {
                    // Access the ITokenAcquisition service from the HttpContext
                    var tokenAcquisition = _httpContextAccessor.HttpContext.RequestServices.GetRequiredService<ITokenAcquisition>();
                    var graphServiceClient = _httpContextAccessor.HttpContext.RequestServices.GetRequiredService<GraphServiceClient>();

                    var customUrl = "https://graph.microsoft.com/v1.0//me/transitiveMemberOf/microsoft.graph.group?$count=true&$search=(\"displayName: " + requirement.GroupName + "\")";
                    var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, customUrl);
                    httpRequestMessage.Headers.Add("ConsistencyLevel", "eventual");


                    var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync(new[] { "User.Read" });
                  

                   
                    httpRequestMessage.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                   
                    var response = await graphServiceClient.HttpProvider.SendAsync(httpRequestMessage);
                
                    var content = await response.Content.ReadAsStringAsync();
                    ;
                    var results = Newtonsoft.Json.Linq.JObject.Parse(content);
                    var groups = (results["value"]);

                    if (groups != null && groups.Count() > 0)
                    {

                        var customClaim = new Claim(ConstAuthorizeUserIsInSecurityGroup, "true");
                        var customIdentity = new ClaimsIdentity();
                        customIdentity.AddClaim(customClaim);

                        // Add the custom identity to the current user's ClaimsPrincipal
                        context.User.AddIdentity(customIdentity);

                        Instrument.Logger.LogMessage(EventLevel.Verbose,Guid.NewGuid().ToString(), $"Authorization Success in API  {requestMethod} for {context.User.Identity.Name}.");

                        context.Succeed(requirement);
                    }
                }
                else
                {
                    if (Convert.ToBoolean(currentUserClaims.FirstOrDefault(i => i.Type == ConstAuthorizeUserIsInSecurityGroup).Value))
                    {
                        Instrument.Logger.LogMessage(EventLevel.Verbose, Guid.NewGuid().ToString(), $"Authorization Success in API  {requestMethod} for {context.User.Identity.Name}.");

                        context.Succeed(requirement);
                    }
                }

            }
            catch(Exception ex)
            {;
               

                Instrument.Logger.LogException(Guid.NewGuid().ToString(), $"Authorization error in API  {requestMethod} for {context.User.Identity.Name}.", ex, new Dictionary<string, string>());
                context.Fail();
            }



        }
    }
}
