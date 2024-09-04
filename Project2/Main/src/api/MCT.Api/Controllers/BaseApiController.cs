using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MCT.API.Controllers
{
    /// <summary>
    ///   BaseApiController
    /// </summary>
    [ApiController]
    public class BaseApiController : ControllerBase
    {
       
        /// <summary>
        /// the details.
        /// </summary>
        public readonly string? CurrentUserAlias;

        /// <summary>
        /// the details http context.
        /// </summary>
        private readonly IHttpContextAccessor? httpcontext;

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseApiController"/> class.
        /// <param name="httpcontext">The http context.</param>
        /// </summary>
        public BaseApiController(IHttpContextAccessor httpcontext)
        {
            this.httpcontext = httpcontext;
            var alias = this.httpcontext?.HttpContext?.User.Claims?.FirstOrDefault(x => x.Type == "upn")?.Value;

            if (alias?.IndexOf('@') > 0)
            {
                alias = alias[..alias.IndexOf('@')];
            }
     
            if (!string.IsNullOrEmpty(alias))
            {
                this.CurrentUserAlias = alias;
            }
            else
            {
                this.CurrentUserAlias = null;
            }
        }
    }
}
