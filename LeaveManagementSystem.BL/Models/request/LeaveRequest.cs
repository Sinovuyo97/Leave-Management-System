using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.BL.Models.request;
using LeaveManagementSystem.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Models
{
    public class LeaveRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public List<LeaveBalanceResponse> LeaveBalances { get; set; }
        public LeaveType LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal UsedDays { get; set; }
        public List<LeaveScheduleRequest> LeaveSchedule { get; set; }
        public string Comments { get; set; }
        public Status Status { get; set; } = Status.Pending;
        public ICollection<ApproverRequest> Approvers { get; set; }
        public ICollection<DocumentRequest> Documents { get; set; }

    }
}
