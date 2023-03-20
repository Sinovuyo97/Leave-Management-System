using AutoMapper;
using LeaveManagementSystem.BL.Custom_Exceptions;
using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.BL.Interfaces;
using LeaveManagementSystem.BL.Models;
using LeaveManagementSystem.BL.Models.request;
using LeaveManagementSystem.DA;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCryptNet = BCrypt.Net.BCrypt;
namespace LeaveManagementSystem.Infrustructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        public UserRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }
        public async Task CreateUserAsync(RegisterRequest model)
        {
            // validate
            if (_databaseContext.Users.Any(x => x.IdNumber == model.IdNumber))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "User with Id number already exist"
                }));

            // validate
            if (_databaseContext.Users.Any(x => x.Email == model.Email))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateEmail.ToString(),
                    Message = "User with the same email already exist"
                }));

            // validate
            if (_databaseContext.Users.Any(x => x.Phone == model.Phone))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicatePhoneNumber.ToString(),
                    Message = "User with the same phone number already exist"
                }));

            // map model to new user object
            var user = _mapper.Map<User>(model);
            // hash password
            user.PasswordHash = BCryptNet.HashPassword(model.Password);
            await _databaseContext.Users.AddAsync(user);

            await _databaseContext.SaveChangesAsync();
        }

        public async Task<User> GetByUserByEmailAsync(string email)
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<User>().Where(x => x.Email == email).FirstOrDefaultAsync();
            });
        }
        public async Task<IEnumerable<User>> ListAsync()
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<User>()
                    .Include(x => x.Leaves)
                    // .ThenInclude("Documents")
                    .AsEnumerable();
            });
        }

        public async Task<IEnumerable<User>> GetUsersByRoleAsync(Role role)
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<User>()
                    .Where(x => x.Role == role)
                    .AsEnumerable();
            });
        }
    }
}
