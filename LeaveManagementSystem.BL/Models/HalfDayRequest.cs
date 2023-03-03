using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveManagementSystem.BL.Models
{
    public class HalfDayRequest
    {
        private string Morning_half { get; set; }
        private string Afternoon_half { get; set; }
        public Guid UserId { get; set; }

        bool pickDay = false;

        public HalfDayRequest(string Morning_half, string Afternoon_half)
        {
            this.Morning_half = Morning_half;
            this.Afternoon_half = Afternoon_half;

            try
            {
                if (pickDay == true)
                {
                    MorningHours();
                }
                else if (pickDay == false)
                {
                    AfternoonHours();
                }
                else
                {
                    Console.WriteLine("please specify morning or afternoon hours!!!");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void MorningHours()
        {
            var mHours = DateTime.Parse("08:00");
        }

        public void AfternoonHours()
        {
            var aHours = DateTime.Parse("12:00");
        }

        public static object ToString(HalfDayRequest halfDayRequest)
        {
            throw new NotImplementedException();
        }
    }
}
