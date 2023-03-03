using AutoMapper;
using LeaveManagementSystem.BL.Custom_Exceptions;
using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.BL.Interfaces;
using LeaveManagementSystem.BL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCryptNet = BCrypt.Net.BCrypt;

namespace LeaveManagementSystem.Infrustructure.Services
{
    public class UserService : IUserService 
    {
        private readonly IUserRepository _userRepository;
        private ITokenService _tokenService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, ITokenService tokenService,
          IMapper mapper)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task RegisterUserAsync(RegisterRequest model)
        {
            await _userRepository.CreateUserAsync(model);
        }

        public async Task<AuthenticateResponse> AuthenticateUserAsync(AuthenticateRequest model)
        {
            var user = await _userRepository.GetByUserByEmailAsync(model.Email);

            // validate
            if (user == null || !BCryptNet.Verify(model.Password, user.PasswordHash))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.UserNotFound.ToString(),
                    Message = "Username or password is incorrect"
                }));

            // authentication successful
            var response = _mapper.Map<AuthenticateResponse>(user);
            response.Token = _tokenService.GenerateToken(user);
            return response;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.ListAsync();
        }

        public async Task DeleteUserAsync(Guid id)
        {
            await _userRepository.DeleteAsync(id);
        }


        public async Task<User> GetUserAsync(string email)
        {
            return await _userRepository.GetByUserByEmailAsync(email);
        }


        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task UpdateUserAsync(UpdateRequest model)
        {
            var user = await _userRepository.GetByIdAsync(model.Id);

            // validate
            if (user == null)
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.UserNotFound.ToString(),
                    Message = "User information was not found"
                }));

            if (await _userRepository.QueryAsync(x => x.Phone == model.Phone && x.Id != model.Id) != null)
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicatePhoneNumber.ToString(),
                    Message = "Duplicate phone number found on the system"
                }));

            if (await _userRepository.QueryAsync(x => x.Email == model.Email && x.Id != model.Id) != null)
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateEmail.ToString(),
                    Message = "Duplicate email found on the system"
                }));

            // Update the following;
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.Career = (Career)model.Career;
            user.Client = model.Client;
            user.Email = model.Email;
            user.Phone = model.Phone;
            user.Role = (Role)model.Role;

            await _userRepository.UpdateAsync(user);
        }

        public async Task<IEnumerable<User>> GetPagedUsersAsync(int skip, int take)
        {
            return await _userRepository.GetPagedListAsync(skip, take);
        }
    }
}
