import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { contants } from 'src/app/shared/global/global.contants';
import { HalfDaySchedule } from 'src/app/shared/global/half-day-schedule';
import { LeaveDayType } from 'src/app/shared/global/leave-day-type';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { LeaveTypes } from 'src/app/shared/global/leave-types';
import { Roles } from 'src/app/shared/global/roles';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { LeaveRequestComponent } from '../leave-request/leave-request.component';
import { FileUpload } from '../models/file-upload';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-leave-review',
  templateUrl: './leave-review.component.html',
  styleUrls: ['./leave-review.component.css']
})
export class LeaveReviewComponent implements OnInit {

  isHR_Admin: boolean | undefined;
  isPayroll_Admin: boolean | undefined;
  isEmployee: boolean | undefined;
  isManager: boolean | undefined;

  formModel: any;
  userId: any;
  daysAvailable: number | undefined = 0;
  daysRemaining: number = 0;

  keys = Object.keys;

  leaveTypes = LeaveTypes;
  daysType = LeaveDayType;
  halfDaySchedule = HalfDaySchedule;

  negativeDays: boolean = false;

  leaveBalances: any[] = [];
  request: any = {};
  role: string | null = '';

  constructor(
    public modalRef: MdbModalRef<LeaveReviewComponent>,
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log(this.request);
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.role = sessionStorage.getItem(contants.role);
    this.buildForm(this.request);
    this.populateFormArrays();
    this.determinRole(this.role);
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

  buildForm(request: any) {
    this.formModel = this.formBuilder.group({
      id: [request?.id],
      userId: [request?.userId],
      leaveType: [ { value: request?.leaveType , disabled: true }, Validators.required],
      startDate: [request?.startDate, Validators.required],
      endDate: [request?.endDate, Validators.required],
      leaveDayDuration: [ LeaveDayType.All_day ],
      leaveSchedule: this.formBuilder.array([]),
      comments: [ { value: request?.comments, disabled: true } ],
      usedDays: [request?.usedDays, Validators.required ],
      status: [ request?.status ],
      approvers: this.formBuilder.array([]),
      documents: this.formBuilder.array([])
    });
  }

  populateFormArrays() {
    this.request?.approvers
    .sort((a: any, b: any) => b.role.localeCompare(a.role))
    .forEach((approver: any) => {
      this.formModel.get('approvers').push(this.approver(approver));
    });

    // this.request?.leaveSchedule
    //   .forEach((schedule: any) => {
    //   if (schedule?.leaveDayType === LeaveDayType.All_day) schedule.usedDays = 1;
    //   this.formModel.get('leaveSchedule').push(this.leaveSchedule(schedule));
    // });

    this.request?.documents.forEach((document: any) => {
      this.formModel.get('documents').push(this.document(document));
    });

  }

  approver(approver: any): any {
    return this.formBuilder.group({
      userId: [approver?.userId, Validators.required],
      role: [approver?.role, Validators.required],
      status: [approver?.status, Validators.required],
      comments: [approver?.comments, Validators.required],
    });
  }

  leaveSchedule(data?: any) {
    return this.formBuilder.group({
      date: [data?.date, Validators.required],
      leaveDayType: [data?.leaveDayType, Validators.required],
      halfDaySchedule: [data?.halfDaySchedule, Validators.required],
      usedDays: [data?.usedDays | 0.5, Validators.required]
    });
  }

  document(fileUpload: any) {
    return this.formBuilder.group({
      fileName: [ fileUpload?.fileName, Validators.required ],
      filePath: [ fileUpload?.filePath, Validators.required ]
    });
  }

  calculateUsedDays() {
    const form = this.formModel.get('leaveSchedule').value;
    return form.reduce((a: any, b: any) => a + b.usedDays, 0);
  }

  // Start
  getLeaveBalance(leaveType: any) {
    return this.request?.usedDays;
  }

  updateLeaveStatus(status: any) {
    var form: any;
    this.formModel.markAllAsTouched();

    switch (this.role) {
      case Roles.Employee:
        form = this.formModel.get('approvers').at(1);
        break;
      case Roles.Employee:
        form = this.formModel.get('approvers').at(0);
        break;
      default:
        break;
    }

    form.get('status').patchValue(status);
    this.updateStatusOnTheRequest();
    console.log(this.formModel.value);

    if (this.formModel.invalid) {
      return;
    }

    this.leaveService.updateLeaveRequest(this.formModel.value).subscribe(_ => {
      this.toastr.success(`Leave request successfully updated.`);
      this.modalRef.close(true);
    });
  }
  updateStatusOnTheRequest() {
    const trainerForm = this.formModel.get('approvers').at(0);
    const adminForm = this.formModel.get('approvers').at(1);

    const responseFromTrainer = trainerForm.get('status').value;
    const responseFromAdmin = adminForm.get('status').value;

    trainerForm.get('comments').setValidators(null);
    adminForm.get('comments').setValidators(null);
    trainerForm.get('comments').updateValueAndValidity();
    adminForm.get('comments').updateValueAndValidity();

    if (responseFromAdmin === LeaveStatus.Approved && responseFromTrainer === LeaveStatus.Approved) {
      this.formModel.get('status').patchValue(LeaveStatus.Approved);
    } else if ((responseFromAdmin === LeaveStatus.Pending && responseFromTrainer === LeaveStatus.Approved)
      || (responseFromAdmin === LeaveStatus.Approved && responseFromTrainer === LeaveStatus.Pending)) {
      this.formModel.get('status').patchValue(LeaveStatus.Partially_Approved);
    } else if ((responseFromAdmin === LeaveStatus.Rejected || responseFromTrainer === LeaveStatus.Rejected)) {
      this.formModel.get('status').patchValue(LeaveStatus.Rejected);
      switch (this.role) {
        case Roles.Employee:
          if (trainerForm.get('comments').value === '') {
            trainerForm.get('comments').setValidators(Validators.required);
            trainerForm.get('comments').updateValueAndValidity();
          }
          break;
        case Roles.HR_Admin:
          if (adminForm.get('comments').value === '') {
            adminForm.get('comments').setValidators(Validators.required);
            adminForm.get('comments').updateValueAndValidity();
          }
          break;
        default:
          break;
      }
    }
  }

  proposeChanges() {

  }

  openOnNewTab(link: any) {
    window.open(link, '_blank');
  }

  getStatusBgColor(status: any): any {
    switch (status) {
      case LeaveStatus.Pending:
        return 'bg-5-g4l-orange'
      case LeaveStatus.Approved:
        return 'bg-5-green-text'
      case LeaveStatus.Partially_Approved:
        return 'bg-5-g4l-greeny-blue'
      case LeaveStatus.Cancelled:
        return 'bg-5-red'
      case LeaveStatus.Rejected:
        return 'bg-5-red'
      default:
        break;
    }
  }

  getStatusIcon(status: any): any {
    switch (status) {
      case LeaveStatus.Pending:
        return 'fa-circle-pause g4l-orange-text'
      case LeaveStatus.Approved:
        return 'fa-circle-check green-text'
      case LeaveStatus.Partially_Approved:
        return 'fa-circle-half-stroke g4l-greeny-blue-text'
      case LeaveStatus.Cancelled:
        return 'fa-ban red-text'
      case LeaveStatus.Rejected:
        return 'fa-circle-xmark red-text'
      default:
        break;
    }
  }

  getFileIcon(fileName: any) {
    if (fileName.toLowerCase().includes('.pdf')) {
      return "fa-file-pdf";
    } else if (fileName.toLowerCase().includes('.png')
    || fileName.toLowerCase().includes('.jpeg')
    || fileName.toLowerCase().includes('.jpg')) {
      return "fa-file-image";
    } else {
      return "fa-file";
    }
  }

  getFormControl(form: any, formControlName: string): any {
    return form.controls[formControlName];
  }

  isAllowedToViewAll(role: any) {
    if (role === this.role || this.role === Roles.HR_Admin) {
      if (this.role === Roles.HR_Admin) {
        const form = this.formModel.get('approvers').at(0);
        form.get('comments').disable();
      }
      return true;
    } else {
      return false;
    }
  }

  close() {
    this.modalRef.close();
  }

}

