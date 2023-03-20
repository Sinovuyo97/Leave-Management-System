using LeaveManagementSystem.BL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.DA
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        // SQL Tables/Entity
        public DbSet<User> Users { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<Approver> Approvers { get; set; }
        public DbSet<LeaveSchedule> LeaveSchedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Leave>().Property(x => x.UsedDays).HasPrecision(10, 2);
        }


    }

}
