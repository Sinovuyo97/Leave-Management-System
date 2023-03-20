using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.Shared;
using System.Collections.Generic;
using System;
using System.Text.Json.Serialization;

namespace LeaveManagementSystem.BL.Entities
{
    public class User : BaseEntity
    {
        public User()
        {
            Leaves = new List<Leave>();
        }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Career Career { get; set; }
        public Role Role { get; set; }
        public DateTime WorkStartDate { get; set; }
        public string PasswordHash { get; set; }
        public List<Leave> Leaves { get; set; }
        
    }
}
