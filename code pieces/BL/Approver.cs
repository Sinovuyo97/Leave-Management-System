using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Entities
{
    public class Approver: BaseEntity
    {
        public Guid UserId { get; set; }
        public Status status { get; set; }
        public String Comments { get; set; }
        public Guid LeaveId { get; set; }
    }
}
