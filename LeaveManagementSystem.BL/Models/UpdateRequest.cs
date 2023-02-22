using LeaveManagementSystem.BL.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace LeaveManagementSystem.BL.Models
{
    public class UpdateRequest
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }
        public string Client { get; set; }
        public Career? Career { get; set; }
        public Role? Role { get; set; }
    }
}
