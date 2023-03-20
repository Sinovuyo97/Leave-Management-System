using LeaveManagementSystem.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Models.Response
{
    public class ApproversBalanceResponse
    {
        public Status Status { get; set; }
        public int Total { get; set; }
    }
}
