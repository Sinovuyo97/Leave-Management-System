using LeaveManagementSystem.Shared;

namespace LeaveManagementSystem.BL.Entities
{
    public enum Access
    {
        New_user, Employee, Payroll_Administrator, HR_Administrator
    }
    public class AccessLevel : BaseEntity
    {
        public Access access { get; set; }
    }
}