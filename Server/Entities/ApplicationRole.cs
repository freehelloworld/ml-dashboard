using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace profile.Server.Entities
{
    public class ApplicationRole : IdentityRole<int>
	{
		[StringLength(250)]
		public string Description { get; set; }
	}
}
