import { LeaveTypes } from './../../shared/global/leave-types';
import { LeaveDayType } from './../../shared/global/leave-day-type';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { LeaveService } from '../services/leave.service';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { HalfDaySchedule } from 'src/app/shared/global/half-day-schedule';
import { UploadService } from '../services/upload.service';
import { FileUpload } from '../models/file-upload';
import { ApproversService } from '../services/approvers.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  Id: any;
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

  openOnNewTab(link: any) {
    window.open(link, '_blank');
  }

  formModel: any;
  userId: any;
  daysAvailable: number | undefined = 10;
  daysRemaining: number = 0;

  keys = Object.keys;

  leaveTypes: any[]= [];
  daysType = LeaveDayType;
  halfDaySchedule = HalfDaySchedule;

  negativeDays: boolean = false;

  leaveBalances: any[] = [];

  constructor(
    public modalRef: MdbModalRef<LeaveRequestComponent>,
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private uploadService: UploadService,
    private getApproversService: ApproversService,
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.leaveTypes.push(LeaveTypes.Please_Select_A_Leave,LeaveTypes.Annual,LeaveTypes.Family_Responsibility,LeaveTypes.Sick,LeaveTypes.Unpaid)
    this.buildForm();
    console.log(this.userId)
  }

  buildForm() {
    this.formModel = this.formBuilder.group({
      userId: [this.userId],
      leaveType: [LeaveTypes.Please_Select_A_Leave , Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      leaveDayDuration: [ LeaveDayType.All_day ],
      leaveSchedule: this.formBuilder.array([]),
      comments: [''],
      usedDays: ['', Validators.required ],
      status: [ LeaveStatus.Pending ],
      approvers: this.formBuilder.array([
        {
          "userId": "09705200-31FF-4947-4E7D-08DB2A5598B2",
          "status": "Pending",
          "comments": ""
        },
        {
          "userId": "4DBA56DC-58DD-4BE3-835C-08DB1DA7A36A",
          "status": "Pending",
          "comments": ""
        },
        {
          "userId": "776e370a-df10-4b58-a678-08db1cc9de42",
          "status": "Pending",
          "comments": ""
        }
      ]), // How do we know who will approver
      documents: this.formBuilder.array([])
    });
  }

  getApprovers() {
    this.getApproversService.getApprovers(this.Id)
      .subscribe((response: any) => {
        response?.sort((a: any, b: any) => b?.role.localeCompare(a?.role))
          .forEach((approver: any) => {
            this.formModel.get('approvers').push(this.approver(approver));
          });
      }
      );
  }
  approver(approver: any): any {
    return this.formBuilder.group({
      userId: [approver?.id, Validators.required],
      role: [approver?.role, Validators.required],
      status: [LeaveStatus.Pending, Validators.required],
      comments: [''],
    });
  }
  leaveSchedule(data?: any) {
    return this.formBuilder.group({
      date: [data?.date, Validators.required],
      leaveDayType: [LeaveDayType.Half_day],
      halfDaySchedule: [HalfDaySchedule.Afternoon_Hours],
      usedDays: [0.5, Validators.required]
    });
  }

  document(fileUpload: FileUpload | null) {
    return this.formBuilder.group({
      fileName: [ fileUpload?.name, Validators.required ],
      filePath: [ fileUpload?.url, Validators.required ]
    });
    
  }

  calculateDaysRequested() {
    let days = 0;

    switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.All_day:
        days = this.getBusinessDatesCount(this.formModel.get('startDate').value, this.formModel.get('endDate').value);
        break;
      case LeaveDayType.Half_day:
        days = this.calculateUsedDays();
        break;
    }

    this.formModel.get('usedDays').patchValue(days);
    return Number(this.formModel.get('usedDays').value);
  }

  getBusinessDatesCount(startDate: any, endDate: any) {
    let count = 0;
    let curDate = +startDate;
    while (curDate <= +endDate) {
      const dayOfWeek = new Date(curDate).getDay();
      const isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
      if (!isWeekend) {
        count++;
      }
      curDate = curDate + 24 * 60 * 60 * 1000
    }
    return count;
  }

  calculateDaysRemaining(): number | undefined {
    this.negativeDays = false;
    var leaveType = this.formModel.get('leaveType').value;
    switch (leaveType) {
      case LeaveTypes.Annual:
      case LeaveTypes.Family_Responsibility:
      case LeaveTypes.Sick:
      case LeaveTypes.Unpaid:
        this.daysAvailable = this.leaveBalances.find(x => x.balanceType === leaveType).remaining;
        break;
      default:
        return 0;
    }

    if (this.daysAvailable) {
      this.daysRemaining = this.daysAvailable - this.calculateDaysRequested();

      // display the error message
      if (this.daysRemaining < 0) {
        this.negativeDays = true;
      }
      return this.daysRemaining;
    }
    return undefined;
  }

  applyForLeave() {
    console.log(this.formModel.value);
    this.leaveService.applyForLeave(this.formModel.value).subscribe(_ => {
      this.toastr.success(`Your leave was successfully created.`);
      this.modalRef.close(true);
    });
  }

  onOptionsSelected() {
   switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.Half_day:
        const startDate = new Date(this.formModel.get('startDate').value);
        const newDate = new Date(startDate.setDate(startDate.getDate() - 1));
        let index = 0;
        while(index < this.getBusinessDatesCount(this.formModel.get('startDate').value, this.formModel.get('endDate').value)){
            const endDate = new Date(newDate.setDate(newDate.getDate() + 1));
            if(endDate.getDay() != 0 && endDate.getDay() != 6) {
                this.formModel.get('leaveSchedule').push(this.leaveSchedule({
                  date: new Date(endDate)
                }));
              index++;
            }
        }
        break;
      default:
        break;
    }
  }

  isAllowed(leaveType: any) {
    switch (leaveType) {
      case LeaveTypes.Annual:
      case LeaveTypes.Sick:
      case LeaveTypes.Family_Responsibility:
        if (this.leaveBalances.find(x => x.balanceType === leaveType).remaining === 0) {
          return true;
        }
        return false;
      case LeaveTypes.Unpaid:
        return false;
      default:
        return true;
    }
  }

  onLeaveTypeSelected(leaveType: any) {
    if (
      (leaveType === LeaveTypes.Sick && Number(this.formModel.get('usedDays').value) > 1)
      || leaveType === LeaveTypes.Family_Responsibility) {
      this.formModel.get('documents').setValidators(Validators.required);
      this.formModel.get('documents').updateValueAndValidity();
      return true;
    } else {
      this.formModel.get('documents').setValidators(null);
      this.formModel.get('documents').updateValueAndValidity();
      return false;
    }
  }

  isDefault(leaveType: any) {
    switch (leaveType) {
      case LeaveTypes.Please_Select_A_Leave:
        return true;
      default:
        return false;
    }
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    Array.from(files).forEach((file: File) => {
      var fileUpload: FileUpload | null = new FileUpload(file);
      this.uploadService.uploadToStorage(fileUpload)?.then((response) => {
        console.log(fileUpload+" Snow");
        this.formModel.get('documents').push(this.document(response));
      });
    });
  }

  getFormControl(form: any, formControlName: string): any {
    return form.controls[formControlName];
  }

  isAllDay() {
    switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.All_day:
        return true;
      default:
        return false;
    }
  }

  dateRangeChange() {
    this.formModel.get('leaveSchedule').controls = [];
    this.formModel.get('leaveDayDuration').patchValue(LeaveDayType.All_day);
  }

  holidaysAndWeekendsDatesFilter(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }

  updateUsedDays(index: number) {
    const form = this.formModel.get('leaveSchedule').at(index);

    switch (form.get('leaveDayType')?.value) {
      case LeaveDayType.All_day:
        form.get('halfDaySchedule')?.patchValue(HalfDaySchedule.None);
        form.get('usedDays')?.patchValue(1);
        break;
      case LeaveDayType.Half_day:
        form.get('halfDaySchedule')?.patchValue(HalfDaySchedule.Morning_Hours);
        form.get('usedDays')?.patchValue(0.5);
        break;
    }
  }

  calculateUsedDays() {
    const form = this.formModel.get('leaveSchedule').value;
    return form.reduce((a: any, b: any) => a + b.usedDays, 0);
  }

  close() {
    this.modalRef.close();
  }

}
