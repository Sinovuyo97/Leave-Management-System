using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Shared
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public decimal MaxAnnualAllowed { get; set; }
        public decimal MaxSickAllowed { get; set; }
        public decimal MaxFamilyResponsibility { get; set; }
        public decimal LeaveDaysPerMonth { get; set; }

    }
}
