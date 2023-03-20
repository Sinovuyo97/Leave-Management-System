using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.BL.Models.request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByUserByEmailAsync(string email);
        Task CreateUserAsync(RegisterRequest user);
        Task<IEnumerable<User>> GetUsersByRoleAsync(Role role);
    }
}
