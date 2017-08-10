using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace profile.Server.Controllers.api
{
	[Authorize]
	[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
	public class BaseController : Controller
	{
		public BaseController()
		{
		}
	}
}
