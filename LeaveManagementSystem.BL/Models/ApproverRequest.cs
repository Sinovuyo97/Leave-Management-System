using LeaveManagementSystem.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Models
{
    public class ApproverRequest
    {
        public Guid UserId { get; set; }
        public Role Role { get; set; }
        public Status status { get; set; }
        public String Comments { get; set; }
    }
}
