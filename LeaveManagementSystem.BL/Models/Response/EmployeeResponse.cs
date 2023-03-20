using LeaveManagementSystem.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Models.Response
{
    public class EmployeeResponse: UserResponse
    {
        public Career Career { get; set; }
        public DateTime WorkStartDate { get; set; }
    }
}
