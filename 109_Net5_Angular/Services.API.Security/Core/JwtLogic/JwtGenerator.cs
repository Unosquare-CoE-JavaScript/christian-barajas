﻿using Microsoft.IdentityModel.Tokens;
using Services.API.Security.Core.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services.API.Security.Core.JwtLogic
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("username", user.UserName),
                new Claim("email", user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("B5VCQ5lpHCoeEMhXEBmAaLTPqthcF7b9"));

            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(3),
                SigningCredentials = credential
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
