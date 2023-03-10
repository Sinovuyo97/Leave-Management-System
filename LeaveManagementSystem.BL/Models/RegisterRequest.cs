using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace LeaveManagementSystem.BL.Models
{
    public class RegisterRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string IdNumber { get; set; }
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }
        public Career? Career { get; set; }
        public Role? Role { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
