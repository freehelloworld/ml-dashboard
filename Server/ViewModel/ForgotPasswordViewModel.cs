using System.ComponentModel.DataAnnotations;

namespace profile.Server.ViewModel
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
