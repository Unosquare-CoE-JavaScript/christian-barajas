using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.API.Security
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // CreateHostBuilder(args).Build().Run();
            var HostServer = CreateHostBuilder(args).Build();

            using (var ctx = HostServer.Services.CreateScope())
            {
                var services = ctx.ServiceProvider;
                try
                {
                    var userManager = services.GetRequiredService<UserManager<User>>();
                    var _ctxEF = services.GetRequiredService<SecurityContext>();

                    DataSecurity.InsertUser(_ctxEF, userManager).Wait();

                } catch(Exception e)
                {
                    var loggin = services.GetRequiredService<ILogger<Program>>();

                    loggin.LogError(e, "Error while registering a user");
                }
            }

            HostServer.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
