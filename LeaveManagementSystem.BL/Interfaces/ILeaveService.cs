using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Interfaces
{
    public interface ILeaveService
    {
        Task RequestLeaveAsync(LeaveRequest leaveRequest);
        Task<List<LeaveBalanceResponse>> GetLeaveBalancesAsync(Guid userId);
        Task<List<LeaveRequest>> GetLeaveRequestsAsync(Guid userId);
        Task UpdateLeaveStatusAsync(Guid id, Enum.Status status);
        Task<List<LeaveRequest>> GetLeavesToApproveAsync(Guid userId);
        Task<IEnumerable<Leave>> GetAllLeaveRequestsAsync();
        Task UpdateLeaveRequestAsync(LeaveRequest leaveRequest);
    }
}
