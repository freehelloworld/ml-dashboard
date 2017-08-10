using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace profile.Server.Extensions
{
    public static class ApplicationBuilderExtensions
    {
		public static IApplicationBuilder SetupMigrations(this IApplicationBuilder app)
		{
			// For more details on creating database during deployment see http://go.microsoft.com/fwlink/?LinkID=615859
			try
			{
				var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
				serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
			}
			catch (Exception) { }
			return app;
		}

	}
}
