using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Models;
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
    }
}
