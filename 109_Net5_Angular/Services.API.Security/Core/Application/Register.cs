using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.API.Security.Core.DTO;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.JwtLogic;
using Services.API.Security.Core.Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Services.API.Security.Core.Application
{
    public class Register
    {
        public class UserRegisterCommand: IRequest<UserDto>
        {
            public string Name { get; set; }
            public string LastName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class UserRegisterHandler : IRequestHandler<UserRegisterCommand, UserDto>
        {
            private readonly SecurityContext _context;
            private readonly UserManager<User> _userManager;
            private readonly IMapper _mapper;
            private readonly IJwtGenerator _jwtGenerator;
            public UserRegisterHandler(
                SecurityContext context, 
                UserManager<User> userManager, 
                IMapper mapper,
                IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userManager = userManager;
                _mapper = mapper;
                _jwtGenerator = jwtGenerator;
            }

            public class UserRegisterValidation : AbstractValidator<UserRegisterCommand>
            {
                public UserRegisterValidation()
                {
                    RuleFor(x => x.Name).NotEmpty();
                    RuleFor(x => x.LastName).NotEmpty();
                    RuleFor(x => x.UserName).NotEmpty();
                    RuleFor(x => x.Email).NotEmpty();
                    RuleFor(x => x.Password).NotEmpty();
                }
            }

            public async Task<UserDto> Handle(UserRegisterCommand request, CancellationToken cancellationToken)
            {
                var exists = await _context.Users.Where(x => x.Email == request.Email).AnyAsync();

                if (exists)
                {
                    throw new System.Exception("The User's email already exists on Database");
                }
                exists = await _context.Users.Where(x => x.UserName == request.UserName).AnyAsync();
                if (exists)
                {
                    throw new System.Exception("The User's username already exists on Database");
                }

                var user = new User
                {
                    Name = request.Name,
                    LastName = request.LastName,
                    Email = request.Email,
                    UserName = request.UserName
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    var userDto = _mapper.Map<User, UserDto>(user);
                    userDto.JwtToken = _jwtGenerator.CreateToken(user);
                    return userDto;
                }

                throw new System.Exception("Process was not able to register new user");
            }
        }
    }
}
