using AutoMapper;
using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Models;

namespace G4L.UserManagement.API.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthenticateResponse>().ReverseMap();

            CreateMap<RegisterRequest, User>().ReverseMap();

            CreateMap<LeaveRequest, Leave>().ReverseMap();

            CreateMap<ApproverRequest, Approver>().ReverseMap();
        }
    }
}
