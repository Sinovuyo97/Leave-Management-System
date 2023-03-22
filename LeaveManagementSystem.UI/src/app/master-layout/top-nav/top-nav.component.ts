import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LeaveService } from 'src/app/leave-management/services/leave.service';
import { contants } from 'src/app/shared/global/global.contants';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  navItems: string[] = [];
  url: string = '';
  username: string | null = null;
  filterTerm!: string;
  date: string = new Date().toDateString();
  time: string = new Date().toTimeString();
  badgeContent: number = 0;
  user: any;
  leavesToApprove: any[] = [];
  status: any;
  approversdata: any[] = [];
  approverId: any;
  showBadge: any = "true";
  showColor: any = "warn";

  constructor(
    private router: Router,
    private leaveService: LeaveService,
    private tokenService: TokenService
  ) {
    this.username = sessionStorage.getItem(contants.username);

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url.replace('/', '').replace('-', ' ');
      }
    });
  }

  ngOnInit(): void {
    console.log(this.filterTerm);
    this.user = this.tokenService.getDecodeToken();
    console.log('I am notification' + this.user?.id);
    this.getLeavesToApprove(this.user?.id);
  }
  goTo(){
    this.router.navigate(['/leave-management']);
  }
  getLeavesToApprove(id: any) {
    this.leaveService.getLeaveToApprove(id).subscribe((resp) => {
      this.leavesToApprove = resp;

      // lets test if notification content will work or not
      this.leavesToApprove.forEach((element) => {
        console.log('I am element ' + element.status);
        if (element.status === LeaveStatus.Pending) {
          this.status = element.status;
          this.badgeContent += 1;
          this.showBadge = "false";
        }
        this.approversdata = element.approvers;
        this.approversdata.forEach((data) => {
          this.approverId = data.userId;
          console.log('Approver id Luhle ' + this.user.id);
        });

        if (
          element.status === LeaveStatus.Partially_Approved &&
          this.approverId == this.user?.id
        ) {
          this.status = element.status;
          this.badgeContent += 1;
          this.showBadge = "false";
        }
      });

      // lets test if notification content will work or not
    });
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
    sessionStorage.setItem(contants.time, this.time);
    sessionStorage.setItem('date', this.date);
  }
}
