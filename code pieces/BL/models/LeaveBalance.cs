using LeaveManagementSystem.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Models
{
    public class LeaveBalanceResponse
    {
        public LeaveType BalanceType { get; set; }
        public decimal MaxAllowed { get; set; }
        public decimal AccumalatedLeaveDays { get; set; }
        public decimal NegativeAllowedDays { get; set; }
        public decimal Remaining { get; set; }
        public decimal Used { get; set; }
    }

}
