import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { contants } from '../shared/global/global.contants';
import { Roles } from '../shared/global/roles';
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isHR_Admin: boolean | undefined;
  isPayroll_Admin: boolean | undefined;
  isEmployee: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    const role = sessionStorage.getItem(contants.role);
    this.determinRole(role);
  }

  determinRole(role: string | null) {
    switch (role) {
      case Roles.Manager:
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
