import { UsermanagementModule } from './../usermanagement/usermanagement.module';
import { MasterLayoutComponent } from './master-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { UsermanagementComponent } from '../usermanagement/usermanagement.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { LeaveManagementComponent } from '../leave-management/leave-management.component';
import { LeaveManagementModule } from '../leave-management/leave-management.module';
const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user-management',
        component: UsermanagementComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'leave-management',
        component: LeaveManagementComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, DashboardModule, UsermanagementModule, LeaveManagementModule,
  ]
})
export class MasterLayoutRoutingModule {
  static components = [ MasterLayoutComponent ]
}
