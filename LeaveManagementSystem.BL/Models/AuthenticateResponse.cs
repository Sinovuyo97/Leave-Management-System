using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Enum;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
