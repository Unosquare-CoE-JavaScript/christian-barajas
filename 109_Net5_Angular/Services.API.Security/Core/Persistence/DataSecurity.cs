using Microsoft.AspNetCore.Identity;
using Services.API.Security.Core.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Services.API.Security.Core.Persistence
{
    public class DataSecurity
    {
        public static async Task InsertUser(SecurityContext ctx, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User { 
                    Name = "Chris",
                    LastName = "Barajas",
                    Address = "SiempreViva 123",
                    UserName = "cbarajasone",
                    Email = "christian.barajas@unosquare.com"
                };

                await userManager.CreateAsync(user, "One101.,");
            }
        }
    }
}
