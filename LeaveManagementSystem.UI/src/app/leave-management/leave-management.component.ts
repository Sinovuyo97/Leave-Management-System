import { Component, OnInit } from '@angular/core';
import { contants } from '../shared/global/global.contants';
import { Roles } from '../shared/global/roles';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  isHR_Admin: boolean | undefined;
  isPayroll_Admin: boolean | undefined;
  isEmployee: boolean | undefined;
  isManager: boolean | undefined;

  constructor(
  ) { }

  ngOnInit(): void {
    const role = sessionStorage.getItem(contants.role);
    this.determinRole(role);
  }

  determinRole(role: string | null) {
    switch (role) {
      case Roles.Manager:
        this.isManager = true;
        break;
      case Roles.HR_Admin:
        this.isHR_Admin = true;
        break;
      case Roles.Payroll_Admin:
        this.isPayroll_Admin = true;
        break;
      case Roles.Employee:
        this.isEmployee = true;
        break;
    }
  }
}
