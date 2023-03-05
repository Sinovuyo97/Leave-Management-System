import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { LeaveTypes } from 'src/app/shared/global/leave-types';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { LeaveRequestComponent } from '../../leave-request/leave-request.component';
import { LeaveReviewComponent } from '../../leave-review/leave-review.component';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {

  modalDialog: MdbModalRef<LeaveReviewComponent> | null = null;
  leaveApplications: any[] = [];
  user: any;
  leaveBalances: any[] = [];
  dataSet: any;

  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private leaveService: LeaveService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.user = this.tokenService.getDecodeToken();
    this.getLeavesToApprove(this.user?.id);
  }

  getLeavesToApprove(userId: any) {
    this.leaveService.getLeaveToApprove(userId)
      .subscribe(arg => {
        console.log(arg);
        this.leaveApplications = arg;
      });
  }

  openDialog(request: any) {
    this.modalDialog = this.modalService.open(LeaveReviewComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { leaveRequest: request },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe(_ => {
      this.getLeavesToApprove(this.user?.id);
    });
  }

  cancelApplication(leave: any) {
    // Cancel leave here
    leave.status = LeaveStatus.Cancelled;

    this.leaveService.updateLeave(leave)
      .subscribe(_ =>
        this.getLeavesToApprove(this.user?.id)
      );
  }

  setData(used: number, remaining: number) {
    this.dataSet = { used, remaining };
  }

  getPrimaryColor(balanceType: LeaveTypes) {
    switch (balanceType) {
      case LeaveTypes.Annual:
        return '#2d572b';
      case LeaveTypes.Sick:
        return '#2d2b57';
      case LeaveTypes.Family_Responsibility:
        return '#2a5d6b';
      default:
        return;
    }
  }

  getStatusIcon(status: any): any {
    switch (status) {
      case LeaveStatus.Pending:
        return 'fa-circle-pause g4l-orange';
      case LeaveStatus.Approved:
        return 'fa-circle-check green-text';
      case LeaveStatus.Partially_Approved:
        return 'fa-circle-half-stroke g4l-green';
      case LeaveStatus.Cancelled:
        return 'fa-ban red-text';
      case LeaveStatus.Rejected:
        return 'fa-circle-xmark red-text';
      default:
        break;
    }
  }

  reviewLeave(request: any) {
    this.modalDialog = this.modalService.open(LeaveReviewComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { request: request, editCrucialInfo: true },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }
}
