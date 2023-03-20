using AutoMapper;
using LeaveManagementSystem.BL.Entities;
using LeaveManagementSystem.BL.Models;
using LeaveManagementSystem.BL.Models.request;
using LeaveManagementSystem.BL.Models.Response;
using Microsoft.Extensions.Logging;
using System;

namespace G4L.UserManagement.API.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthenticateResponse>().ReverseMap();
            CreateMap<User, UserResponse>().ReverseMap();
            CreateMap<User, EmployeeResponse>().ReverseMap();

            CreateMap<RegisterRequest, User>().ReverseMap();
            CreateMap<LeaveRequest, Leave>().ReverseMap();
            CreateMap<ApproverRequest, Approver>().ReverseMap();
            CreateMap<DocumentRequest, Document>().ReverseMap();
            CreateMap<LeaveScheduleRequest, LeaveSchedule>().ReverseMap();
        }
    }
}

