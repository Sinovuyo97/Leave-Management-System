using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Enum;
using LeaveManagementSystem.BL.Interfaces;
using LeaveManagementSystem.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveManagementSystem.DA.Repositories
{
    public class LeaveRepository : Repository<Leave>, ILeaveRepository
    {
        private readonly DatabaseContext _databaseContext;
        public LeaveRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<List<Leave>> GetLeavesToApproveByUserIdAsync(Guid userId)
        {
            return await Task.Run(() =>
            {
                var leaves = new List<Leave>();

                var leaveIds = _databaseContext.Approvers
                .Where(x => x.UserId == userId)
                .Select(x => x.LeaveId)
                .ToList();

                leaveIds.ForEach(leaveId =>
                {
                    var leave = _databaseContext.Leaves
                    .Where(x => x.Id == leaveId)
                    .Include(x => x.Approvers)
                    .Include(x => x.Documents)
                    .Include(x => x.LeaveSchedules)
                    .FirstOrDefault();

                    leaves.Add(leave);
                });

                return leaves;
            });
        }

        public async Task UpdateLeaveRequestAsync(Leave leave)
        {
            await Task.Run(() =>
            {
                var databaseEntry = _databaseContext.Leaves
                  .Where(p => p.Id == leave.Id)
                  .Include(x => x.Approvers)
                  .Include(x => x.Documents)
                  .Include(x => x.LeaveSchedules)
                  .FirstOrDefault();

                databaseEntry.LeaveType = leave.LeaveType;
                databaseEntry.StartDate = leave.StartDate;
                databaseEntry.EndDate = leave.EndDate;
                databaseEntry.Status = leave.Status;
                databaseEntry.Comments = leave.Comments;
                databaseEntry.Documents = leave.Documents;
                databaseEntry.Approvers = leave.Approvers;
                databaseEntry.LeaveSchedules = leave.LeaveSchedules;

                _databaseContext.Entry(databaseEntry).State = EntityState.Modified;

                _databaseContext.SaveChanges();
            });
        }

        public Task<Leave> GetFullLeaveByIdAsync(Guid id)
        {
            return Task.Run(() =>
            {
                return _databaseContext.Leaves
                        .Where(p => p.Id == id)
                        .Include(x => x.Approvers)
                        .Include(x => x.Documents)
                        .Include(x => x.LeaveSchedules)
                        .FirstOrDefault();

            });

        }

        public async Task<List<Leave>> GetAllLeavesToApproveAsync()
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Leaves
                        .Where(p => p.Status != Status.Approved)
                        .Include(x => x.Approvers)
                        .Include(x => x.Documents)
                        .Include(x => x.LeaveSchedules)
                        .ToListAsync();

            });
        }
    }
}
