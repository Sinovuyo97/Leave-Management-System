
using LeaveManagementSystem.BL.Enum;

namespace LeaveManagementSystem.BL.Models
{
    public class AuthenticateResponse
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Career Career { get; set; }
        public Role Role { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
