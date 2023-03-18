using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class EventResponse
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public OrganizerResponse Organizer { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TimeSpan TimeSpan { get; set; }
    }
}
