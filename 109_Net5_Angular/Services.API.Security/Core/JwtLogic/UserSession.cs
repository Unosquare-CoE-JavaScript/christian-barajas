using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Services.API.Security.Core.JwtLogic
{
    public class UserSession : IUserSession
    {
        private readonly IHttpContextAccessor _httpCtxAccessor;

        public UserSession(IHttpContextAccessor httpCtxAccessor)
        {
            _httpCtxAccessor = httpCtxAccessor;
        }

        public string GetUserSession()
        {
            var userName = _httpCtxAccessor.HttpContext.User?.Claims?
                .FirstOrDefault(x => x.Type == "username")
                ?.Value;
            return userName;
        }
    }
}
