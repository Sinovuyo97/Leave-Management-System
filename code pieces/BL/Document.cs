using System;
using LeaveManagementSystem.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Entities
{
    public class Document : BaseEntity
    {
        
        public string FileName { get; set; }
        public string FilePath { get; set; }
       
        
    }
}
