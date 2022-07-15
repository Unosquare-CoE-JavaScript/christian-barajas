using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Services.API.Security.Core.DTO;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.JwtLogic;
using Services.API.Security.Core.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Services.API.Security.Core.Application
{
    public class Login
    {
        public class UserLoginCommand : IRequest<UserDto>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class UserLoginValidation : AbstractValidator<UserLoginCommand>
        {
            public UserLoginValidation()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class UserLoginHandler : IRequestHandler<UserLoginCommand, UserDto>
        {
            private readonly SecurityContext _ctx;
            private readonly UserManager<User> _userManager;
            private readonly IMapper _mapper;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly SignInManager<User> _signInManager;
            public UserLoginHandler(
                SecurityContext ctx, 
                UserManager<User> userManager,
                IMapper mapper,
                IJwtGenerator jwtGenerator,
                SignInManager<User> signInManager)
            {
                _ctx = ctx;
                _userManager = userManager;
                _mapper = mapper;
                _jwtGenerator = jwtGenerator;
                _signInManager = signInManager;
            }

            public async Task<UserDto> Handle(UserLoginCommand request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new Exception("User Doesn't exists");
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            
                if (result.Succeeded)
                {
                    var userDto = _mapper.Map<User, UserDto>(user);
                    userDto.JwtToken = _jwtGenerator.CreateToken(user);
                    return userDto;
                }

                throw new Exception("Unable to login");
            }
        }
    }
}
