﻿using Services.API.Security.Core.Entities;

namespace Services.API.Security.Core.JwtLogic
{
    public interface IJwtGenerator
    {
        string CreateToken(User user);
    }
}
