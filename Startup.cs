using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using profile.Server.Extensions;

namespace profile
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public static IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
			//services.AddNodeServices(x=>x.LaunchWithDebugging = true);
			//can't launch with debugging, this is a bug will be fixed in .net core 2.0
			services.AddNodeServices();

			services.AddCustomOpenIddict();

			services.AddCustomDbContext();

			services.AddCustomIdentity();
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

			ILogger logger = loggerFactory.CreateLogger<Program>();
			logger.LogInformation(
			  "This is a test of the emergency broadcast system.");

			if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
				app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
				{
					HotModuleReplacement = true
				});

				logger.LogInformation(
			  "This is running in development model");
			}
            else
            {
				logger.LogInformation(
			  "This is running in production model");
				app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

			app.UseIdentity();

			app.UseOAuthValidation();

			app.UseOpenIddict();

			app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });


			app.SetupMigrations();
        }
    }
}
