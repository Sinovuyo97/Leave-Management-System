using System.ComponentModel.DataAnnotations;

namespace LeaveManagementSystem.BL.Models.request
{
    public class AuthenticateRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
