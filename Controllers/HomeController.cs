using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Logging;

namespace profile.Controllers
{
    public class HomeController : Controller
    {

		private readonly ILogger _logger;

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
        {
			_logger.LogInformation(
			  "Home index");
			return View();
        }

        public async Task<IActionResult> Chart( [FromServices] INodeServices nodeServices)
        {
			_logger.LogInformation("get in home chart");
			var options = new
            {
                width = 400,
                height = 200,
                showArea = true,
                showPoint = true,
                fullWidth = true
            };

            var data = new
            {
                labels = new[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" },
                series = new[]
                {
                    new[] {1,5,2,5,4,3},
                    new[] {2,3,4,8,1,2},
                    new[] {5,4,3,2,1,0}
                }
            };


            ViewData["ResultFromNode"] = await nodeServices.InvokeAsync<string>(
                "chartModule.js", "line", options, data);

			_logger.LogInformation(ViewData["ResultFromNode"].ToString());

			return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
