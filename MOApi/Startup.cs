using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Logging;
using MOApi.Controllers;

namespace MOApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        [Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentity<Client, IdentityRole>().AddEntityFrameworkStores<MOContext>();
            var connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<MOContext>(options =>
            options.UseSqlServer(connection));
            services.AddMvc().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

/*            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
            .AddEntityFrameworkStores<ApplicationDbContext>();*/

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = ".AspNetCore.Identity.Application";
                options.LoginPath = "/";
                options.AccessDeniedPath = "/";
                options.LogoutPath = "/";
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });


            services.AddCors(options =>
            {
                options.AddPolicy("AllowMyOrigin",
                builder => builder
                    .WithOrigins("http://localhost:3000", "http://localhost:19006")
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);


            services.AddControllers();

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "SimpleWebApp";
                options.LoginPath = "/";
                options.AccessDeniedPath = "/";
                options.LogoutPath = "/";
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 401;

                    return Task.CompletedTask;
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IServiceProvider services, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            //новый корс
            app.UseCors("AllowMyOrigin");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //создание роли
            //CreateUserRoles(services).Wait();
            /*CreateNewTenUsers(services, 89109817277).Wait();*/

        }
        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<Client>>();
            // Создание ролей администратора и пользователя
            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(new
                IdentityRole("admin"));
            }
            if (await roleManager.FindByNameAsync("user") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("user"));
            }
            // Создание Администратора
            string adminLoginPhoneNumber = "admin";
            string adminPassword = "Aa123456!";
            if (await userManager.FindByNameAsync(adminLoginPhoneNumber) == null)
            {
                Client admin = new Client
                {
                    PhoneNumber = adminLoginPhoneNumber,
                    // Email = LoginPhoneNumber,
                    /*Password = adminPassword,*/
                    UserName = adminLoginPhoneNumber
                };
                IdentityResult result = await
                userManager.CreateAsync(admin, adminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "admin");
                }
            }
            // Создание Пользователя
            string userLoginPhoneNumber = "89109817270";
            //string userEmail = "user@mail.com";
            string userPassword = "Aa123456!";
            if (await userManager.FindByNameAsync(userLoginPhoneNumber) == null)
            {
                Client user = new Client
                {

                    PhoneNumber = userLoginPhoneNumber,
                    UserName = userLoginPhoneNumber,
                    /*Password = userPassword*/
                };
                IdentityResult result = await userManager.CreateAsync(user, userPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "user");
                }
            }
        }
        private async Task CreateNewTenUsers(IServiceProvider serviceProvider, long startUserLogin)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<Client>>();
            // Создание Администратора
            string adminLoginPhoneNumber = "admin";
            string adminPassword = "Aa123456!";
            //string userEmail = "user@mail.com";
            for (long i = startUserLogin; i <= startUserLogin + 1; i++)
            {
                string userLoginPhoneNumber = i.ToString();
                string userPassword = "Aa123456!";
                Random random = new Random();
                if (await userManager.FindByNameAsync(userLoginPhoneNumber) == null)
                {
                    Client user = new Client
                    {

                        PhoneNumber = userLoginPhoneNumber,
                        UserName = userLoginPhoneNumber
                        , DateConnect = DateTime.Now,
                        DateOfBirth = DateTime.Now,
                        Balance = random.Next(0, 1000), 
                         FreeGb = random.Next(0, 10), FreeMin = random.Next(0, 100)
                         , FreeSms = random.Next(0, 100),
                        IsPhysCl = true,
                        Name = "Name",
                        SurName="Surname"
                        /*Password = userPassword*/
                    };
                    IdentityResult result = await userManager.CreateAsync(user, userPassword);
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "user");
                    }
                }
                
            }
        }
    }
}
