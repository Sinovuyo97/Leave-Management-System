using AutoMapper;
using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.BL.Interfaces;
using LeaveManagementSystem.BL.Models;
using LeaveManagementSystem.Shared;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.DA.Services
{
    public class LeaveService : ILeaveService
    {
        private readonly ILeaveRepository _leaveRepository;
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public LeaveService(ILeaveRepository leaveRepository, IUserRepository userRepository, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _leaveRepository = leaveRepository;
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public async Task<List<LeaveBalanceResponse>> GetLeaveBalancesAsync(Guid userId)
        {
            // get the leave history for the user
            var leaves = await _leaveRepository.ListAsync(x => x.UserId == userId);
            var user = await _userRepository.GetByIdAsync(userId);

            //Used days
            var usedAnnual = leaves.Where(x => x.LeaveType == LeaveType.Annual && x.Status != Status.Cancelled).Sum(x => x.UsedDays);
            var usedSick = leaves.Where(x => x.LeaveType == LeaveType.Sick && x.Status != Status.Cancelled).Sum(x => x.UsedDays);
            var usedFamilyResponsibility = leaves.Where(x => x.LeaveType == LeaveType.Family_Responsibility && x.Status != Status.Cancelled).Sum(x => x.UsedDays);

            //get the leave days accumulated
            var leaveBalance = new List<LeaveBalanceResponse>();

            var annualLeaveDays = 11;

            //calculate the number of days
            leaveBalance.Add(new LeaveBalanceResponse
            {
                BalanceType = LeaveType.Annual,
                MaxAllowed = _appSettings.MaxAnnualAllowed,
                AccumalatedLeaveDays = annualLeaveDays,
                NegativeAllowedDays = _appSettings.MaxAnnualAllowed - annualLeaveDays,
                Remaining = annualLeaveDays - usedAnnual,
                Used= usedAnnual
            });


            leaveBalance.Add(new LeaveBalanceResponse
            {
                BalanceType = LeaveType.Family_Responsibility,
                MaxAllowed = _appSettings.MaxFamilyResponsibility,
                AccumalatedLeaveDays = _appSettings.MaxFamilyResponsibility,
                NegativeAllowedDays = _appSettings.MaxFamilyResponsibility - usedFamilyResponsibility,
                Remaining = _appSettings.MaxFamilyResponsibility - usedFamilyResponsibility,
                Used = usedFamilyResponsibility
            });

            leaveBalance.Add(new LeaveBalanceResponse
            {
                BalanceType = LeaveType.Sick,
                MaxAllowed = _appSettings.MaxSickAllowed,
                AccumalatedLeaveDays = _appSettings.MaxSickAllowed,
                NegativeAllowedDays = _appSettings.MaxSickAllowed - usedSick,
                Remaining = _appSettings.MaxSickAllowed - usedSick,
                Used = usedSick
            });

            return leaveBalance;
        }

        public static decimal GetMonthsBetween(DateTime from, DateTime to)
        {
            if (from > to) return GetMonthsBetween(to, from);

            var monthDiff = Math.Abs((to.Year * 12 + (to.Month - 1)) - (from.Year * 12 + (from.Month - 1)));

            if (from.AddMonths(monthDiff) > to || to.Day < from.Day)
            {
                return monthDiff - 1;
            }
            else
            {
                return monthDiff;
            }
        }

        public async Task<List<LeaveRequest>> GetLeaveRequestsAsync(Guid userId)
        {
            var leaves = await _leaveRepository.ListAsync(x => x.UserId == userId);
            return _mapper.Map<List<LeaveRequest>>(leaves);
        }

        public async Task RequestLeaveAsync(LeaveRequest leaveRequest)
        {
            var leave = _mapper.Map<Leave>(leaveRequest);
            await _leaveRepository.CreateAsync(leave);
        }

        public async Task UpdateLeaveStatusAsync(Guid id, Status status)
        {
            var leave = await _leaveRepository.GetByIdAsync(id);
            leave.Status = status;
            await _leaveRepository.UpdateAsync(leave);
        }

        public async Task<List<LeaveRequest>> GetLeavesToApproveAsync(Guid userId)
        {
            var leaves = _mapper.Map<List<LeaveRequest>>(await _leaveRepository.GetLeavesToApproveAsync(userId));

            leaves.ForEach(x => {
                x.User = _userRepository.GetByIdAsync(x.UserId).Result;
                x.LeaveBalances = GetLeaveBalancesAsync(x.UserId).Result;
                x.Approvers.ToList().ForEach(x => { 
                    x.Role = _userRepository.GetByIdAsync(x.UserId).Result.Role;
                });
            });

            return leaves;
        }

        public async Task<IEnumerable<Leave>> GetAllLeaveRequestsAsync()
        {
            return await _leaveRepository.ListAsync();
        }

        public async Task UpdateLeaveRequestAsync(LeaveRequest leaveRequest)
        {
            var leave = _mapper.Map<Leave>(leaveRequest);
            await _leaveRepository.UpdateLeaveRequestAsync(leave);
        }
    }
}
