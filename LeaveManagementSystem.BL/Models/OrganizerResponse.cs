using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class OrganizerResponse
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Id { get; set; }
        public bool Self { get; set; }
    }
}
