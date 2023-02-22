using LeaveManagementSystem.BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Interfaces
{
    public interface ITokenService
    {
        public string GenerateToken(User user);
        public Guid? ValidateToken(string token);
    }
}
