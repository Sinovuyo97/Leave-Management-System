using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Enum
{
    public enum ServerErrorCodes
    {
        InCorrectEmail,
        UserNotFound,
        DuplicateIdNumber,
        DuplicateEmail,
        DuplicatePhoneNumber
    }
}
