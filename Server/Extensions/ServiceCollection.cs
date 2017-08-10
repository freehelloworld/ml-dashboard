using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;
using profile.Server.Entities;
using Microsoft.AspNetCore.Builder;
using AspNet.Security.OpenIdConnect.Primitives;

namespace profile.Server.Extensions
{
    public static class ServiceCollection
    {

		public static IServiceCollection AddCustomDbContext(this IServiceCollection services)
		{

			// Add framework services.
			services.AddDbContext<ApplicationDbContext>(options =>
			{
				string useSqLite = Startup.Configuration["Data:useSqLite"];
				if (useSqLite.ToLower() == "true")
				{
					options.UseSqlite(Startup.Configuration["Data:SqlLiteConnectionString"]);
				}
				else
				{
					options.UseSqlServer(Startup.Configuration["Data:SqlServerConnectionString"]);
				}
				options.UseOpenIddict();
			});
			return services;
		}

		public static IServiceCollection AddCustomOpenIddict(this IServiceCollection services)
		{
			// Configure Identity to use the same JWT claims as OpenIddict instead
			// of the legacy WS-Federation claims it uses by default (ClaimTypes),
			// which saves you from doing the mapping in your authorization controller.
			services.Configure<IdentityOptions>(options =>
			{
				options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
				options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
				options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
			});
			// Register the OpenIddict services.
			services.AddOpenIddict()
				// Register the Entity Framework stores.
				.AddEntityFrameworkCoreStores<ApplicationDbContext>()

				// Register the ASP.NET Core MVC binder used by OpenIddict.
				// Note: if you don't call this method, you won't be able to
				// bind OpenIdConnectRequest or OpenIdConnectResponse parameters.
				.AddMvcBinders()

				// Enable the token endpoint.
				.EnableTokenEndpoint("/connect/token")

				// Enable the password and the refresh token flows.
				.AllowPasswordFlow()
				.AllowRefreshTokenFlow()

				// During development, you can disable the HTTPS requirement.
				.DisableHttpsRequirement()

				// Register a new ephemeral key, that is discarded when the application
				// shuts down. Tokens signed using this key are automatically invalidated.
				// This method should only be used during development.
				.AddEphemeralSigningKey();

			// On production, using a X.509 certificate stored in the machine store is recommended.
			// You can generate a self-signed certificate using Pluralsight's self-cert utility:
			// https://s3.amazonaws.com/pluralsight-free/keith-brown/samples/SelfCert.zip
			//
			// services.AddOpenIddict()
			//     .AddSigningCertificate("7D2A741FE34CC2C7369237A5F2078988E17A6A75");
			//
			// Alternatively, you can also store the certificate as an embedded .pfx resource
			// directly in this assembly or in a file published alongside this project:
			//
			// services.AddOpenIddict()
			//     .AddSigningCertificate(
			//          assembly: typeof(Startup).GetTypeInfo().Assembly,
			//          resource: "AuthorizationServer.Certificate.pfx",
			//          password: "OpenIddict");

			return services;
		}

		public static IServiceCollection AddCustomIdentity(this IServiceCollection services)
		{
			// For api unauthorised calls return 401 with no body
			services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
			{
				options.Password.RequiredLength = 4;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
				options.Cookies.ApplicationCookie.AutomaticChallenge = false;
				options.Cookies.ApplicationCookie.LoginPath = "/login";
				options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
				{
					OnRedirectToLogin = ctx =>
					{
						if (ctx.Request.Path.StartsWithSegments("/api") &&
							ctx.Response.StatusCode == (int)HttpStatusCode.OK)
						{
							ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
						}
						else if (ctx.Response.StatusCode == (int)HttpStatusCode.Forbidden)
						{
							ctx.Response.StatusCode = (int)HttpStatusCode.Forbidden;
						}
						else
						{
							ctx.Response.Redirect(ctx.RedirectUri);
						}
						return Task.FromResult(0);
					}
				};
			})
			.AddEntityFrameworkStores<ApplicationDbContext, int>()
			.AddDefaultTokenProviders();

			return services;
		}

	}
	
}
