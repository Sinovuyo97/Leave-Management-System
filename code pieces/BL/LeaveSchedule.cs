using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Entities
{
    public class LeaveSchedule: BaseEntity
    {
        public DateTime Date { get; set; }
        public LeaveDayType LeaveDayType { get; set; }
        public HalfDaySchedule HalfDaySchedule { get; set; }
    }
}
