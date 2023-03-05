import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Roles } from 'src/app/shared/global/roles';
import { EnrolComponent } from 'src/app/usermanagement/enrol/enrol.component';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { UserService } from 'src/app/usermanagement/services/user.service';
import { NavItem } from '../models/nav-item';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  holdingArray: FormGroup = new FormGroup({});
  user: any;
  navItems: NavItem[] = [];
  modalDialog: MdbModalRef<EnrolComponent> | null = null;
  logoutTime: any;
  userId: any;
  date: any;
  loginTime: any;
  comingdata: any;
  constructor(
    private modalService: MdbModalService,
    private userService: UserService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.getUserDetails(user.id);
    var time: any = new Date();
    this.logoutTime = time.toTimeString().substring(0,5);
  }

  getUserDetails(userId: string | null) {
    this.userService.getUserById(userId).subscribe((response: any) => {
      this.user = response;
      this.navItems = this.getNavItems(this.user);
    });
  }

  getNavItems(user: any) {
    switch (user?.role) {
      case Roles.Manager:
        return [
          {
            name: 'Dashboard',
            route: '/dashboard',
            faIcon: 'fa-chart-line'
          },
          {
            name: 'User management',
            route: '/user-management',
            faIcon: 'fa-users-gear'
          },
          {
            name: 'Attendence Register',
            route: '/attendence-register',
            faIcon: 'fa-solid fa-clipboard-user'
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            faIcon: 'fa-person-walking-dashed-line-arrow-right'
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            faIcon: 'fa-user-graduate'
          },
        ];
      case Roles.HR_Admin:
         return [
          {
            name: 'Dashboard',
            route: '/dashboard',
            faIcon: 'fa-chart-line'
          },
          {
            name: 'User management',
            route: '/user-management',
            faIcon: 'fa-users-gear'
          },
          {
            name: 'Attendence Register',
            route: '/attendence-register',
            faIcon: 'fa-solid fa-clipboard-user'
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            faIcon: 'fa-person-walking-dashed-line-arrow-right'
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            faIcon: 'fa-user-graduate'
          },
        ];
      case Roles.Employee:
         return [
          {
            name: 'Dashboard',
            route: '/dashboard',
            faIcon: 'fa-chart-line'
          },
          {
            name: 'Attendence Register',
            route: '/attendence-register',
            faIcon: 'fa-solid fa-clipboard-user'
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            faIcon: 'fa-person-walking-dashed-line-arrow-right'
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            faIcon: 'fa-user-graduate'
          },
        ];
      case Roles.Employee:
         return [
          {
            name: 'Dashboard',
            route: '/dashboard',
            faIcon: 'fa-chart-line'
          },
          {
            name: 'Attendence Register',
            route: '/attendence-register',
            faIcon: 'fa-solid fa-clipboard-user'
          },
          {
            name: 'Leave',
            route: '/leave-management',
            faIcon: 'fa-person-walking-dashed-line-arrow-right'
          },
          {
            name: 'IKM',
            route: '/ikm-management',
            faIcon: 'fa-user-graduate'
          },
        ];
      default:
        return [];
    }
  }

  openLMSinNewTab(url: string){
    window.open(url, "_blank");
  }

  openDialog(user?: any) {
    this.modalDialog = this.modalService.open(EnrolComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'right',
      data: { user: user, editCrucialInfo: false },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe(() => {});
  }
}


