using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.API.Security.Core.Application;
using Services.API.Security.Core.DTO;
using System.Threading.Tasks;

namespace Services.API.Security.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(Register.UserRegisterCommand request)
        {
            return await _mediator.Send(request);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(Login.UserLoginCommand request)
        {
            return await _mediator.Send(request);
        }
        [HttpGet("session")]
        public async Task<ActionResult<UserDto>> GetSession()
        {
            return await _mediator.Send(new CurrentUser.CurrentUserCommand());
        }
    }
}
