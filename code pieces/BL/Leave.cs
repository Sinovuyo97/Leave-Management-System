using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Entities
{
    public class Leave: BaseEntity
    {
        public Guid UserId { get; set; }
        public LeaveType LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal UsedDays { get; set; }
        public List<LeaveSchedule> LeaveSchedule { get; set; }
        public Status Status { get; set; }
        public string Comments { get; set; }
        public List<Approver> Approvers { get; set; }
        public List<Document> Documents { get; set; }
    }
}
