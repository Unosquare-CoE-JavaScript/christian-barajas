using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Services.API.Security.Core.DTO;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.JwtLogic;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Services.API.Security.Core.Application
{
    public class CurrentUser
    {
        public class CurrentUserCommand : IRequest<UserDto>
        {

        }
        public class CurrentUserhandler : IRequestHandler<CurrentUserCommand, UserDto>
        {
            private readonly UserManager<User> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserSession _userSession;
            private readonly IMapper _mapper;


            public CurrentUserhandler(
                UserManager<User> userManager,
                IJwtGenerator jwtGenerator,
                IUserSession userSession,
                IMapper mapper)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _userSession = userSession; 
                _mapper = mapper;
            }

            public async Task<UserDto> Handle(CurrentUserCommand request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userSession.GetUserSession());
                if (user != null)
                {
                    var userDto = _mapper.Map<User, UserDto>(user);
                    userDto.JwtToken = _jwtGenerator.CreateToken(user);
                    return userDto;
                }

                throw new Exception("Session owner not found");
            }
        }
    }
}
