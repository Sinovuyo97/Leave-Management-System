using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Interfaces
{
    public interface IUserService
    {
        Task RegisterUserAsync(RegisterRequest user);
        Task<AuthenticateResponse> AuthenticateUserAsync(AuthenticateRequest model);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task UpdateUserAsync(UpdateRequest user);
        Task DeleteUserAsync(Guid id);
        Task<User> GetUserAsync(string email);
        Task<IEnumerable<User>> GetPagedUsersAsync(int skip, int take);
    }
}
