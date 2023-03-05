using LeaveManagementSystem.API.Authorization;
using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.BL.Interfaces;
using LeaveManagementSystem.BL.Models;
using LeaveManagementSystem.DA;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace LeaveManagementSystem.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        } 

        [Authorize(Role.Manager, Role.HR_Administrator,Role.Payroll_Administrator)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [Authorize(Role.Manager, Role.HR_Administrator, Role.Payroll_Administrator)]
        [HttpGet("/paged")]
        public async Task<IActionResult> Get(int skip = 0, int take = 5)
        {
            return Ok(await _userService.GetPagedUsersAsync(skip, take));
        }

        //[Authorize(Role.Manager,Role.HR_Administrator)]
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] RegisterRequest user)
        {
            await _userService.RegisterUserAsync(user);
            return Ok();
        }

        [Authorize(Role.Manager, Role.HR_Administrator)]
        [HttpPut]
        public async Task<IActionResult> PutAsync([FromBody] UpdateRequest user)
        {
            await _userService.UpdateUserAsync(user);
            return Ok();
        }

        [Authorize(Role.Manager, Role.HR_Administrator)]
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(AuthenticateRequest model)
        {
            var user = await _userService.AuthenticateUserAsync(model);
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(user);
        }
    }
}
