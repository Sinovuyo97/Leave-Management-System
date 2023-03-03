using LeaveManagementSystem.API.Authorization;
using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.BL.Interfaces;
using LeaveManagementSystem.BL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace LeaveManagementSystem.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly ILogger<LeaveController> _logger;
        private readonly ILeaveService _leaveService;

        public LeaveController(ILogger<LeaveController> logger, ILeaveService leaveService)
        {
            _logger = logger;
            _leaveService = leaveService;
        }

        [Authorize(Role.Employee)]
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] LeaveRequest leaveRequest)
        {
            _logger.Log(LogLevel.Information, $"applying for leave {leaveRequest.LeaveType}");
            await _leaveService.RequestLeaveAsync(leaveRequest);
            return Ok(leaveRequest);
        }

        [HttpGet("balances/{userId}")]
        public async Task<IActionResult> GetLeaveBalanceAsync(Guid userId)
        {
            var balances = await _leaveService.GetLeaveBalancesAsync(userId);
            return Ok(balances);
        }

        [Authorize(Role.Employee)]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAsync(Guid userId)
        {
            var leaveRequests = await _leaveService.GetLeaveRequestsAsync(userId);
            return Ok(leaveRequests);
        }
        
        [Authorize(Role.HR_Administrator, Role.Payroll_Administrator)]
        [HttpGet("approve/{userId}")]
        public async Task<IActionResult> GetLeavesToApproveAsync(Guid userId)
        {
            var leaveRequests = await _leaveService.GetLeavesToApproveAsync(userId);
            return Ok(leaveRequests);
        }

        [Authorize(Role.HR_Administrator, Role.Payroll_Administrator)]
        [HttpPut()]
        public async Task<IActionResult> UpdateLeaveRequestAsync([FromBody] LeaveRequest leaveRequest)
        {
            await _leaveService.UpdateLeaveRequestAsync(leaveRequest);
            return Ok();
        }

        [Authorize(Role.Employee)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync([FromBody] LeaveRequest leaveRequest, Guid id)
        {
            await _leaveService.UpdateLeaveStatusAsync(id, leaveRequest.Status);
            return Ok();
        }
        [Authorize(Role.Manager,Role.HR_Administrator,Role.Payroll_Administrator)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _leaveService.GetAllLeaveRequestsAsync());
        }
    }
}
