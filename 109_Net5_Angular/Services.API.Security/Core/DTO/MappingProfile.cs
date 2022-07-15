using AutoMapper;
using Services.API.Security.Core.Entities;

namespace Services.API.Security.Core.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
        }
    }
}
