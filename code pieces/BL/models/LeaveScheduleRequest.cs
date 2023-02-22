using LeaveManagementSystem.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Models
{
    public class LeaveScheduleRequest
    {
        public DateTime Date { get; set; }
        public LeaveDayType LeaveDayType { get; set; }
        public HalfDaySchedule HalfDaySchedule { get; set; }
    }
}
