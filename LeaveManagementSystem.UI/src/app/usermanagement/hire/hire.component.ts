import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { contants } from 'src/app/shared/global/global.contants';
import { Roles } from 'src/app/shared/global/roles';
import { ServerErrorCodes } from 'src/app/shared/global/server-error-codes';
import { Streams } from 'src/app/shared/global/streams';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css'],
})
export class HireComponent implements OnInit {
  formModel: any;
  // formModel: FormGroup = new FormGroup({});

  keys = Object.keys;

  roles = Roles;
  streams = Streams;
  user: any | null = null;
  userRole: string | null = null;
  serverErrorMessage: any;
  editCrucialInfo: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public modalRef: MdbModalRef<HireComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm(this.user);
    this.userRole = sessionStorage.getItem(contants.role);
  }

  buildForm(user?: any) {
    this.formModel = this.formBuilder.group({
      Id: [user?.id],
      Name: [user?.name, [Validators.required, CustomValidators.names]],
      Surname: [user?.surname, [Validators.required, CustomValidators.names]],
      IdNumber: [
        { value: user?.idNumber, disabled: user?.idNumber },
        [Validators.required, CustomValidators.IdNumber],
      ],
      Phone: [user?.phone, [Validators.required, CustomValidators.phone]],
      Email: [user?.email, [Validators.required, CustomValidators.email]],
      Role: [
        {
          value: user?.role || Roles.Please_select_a_role,
          disabled: !this.editCrucialInfo,
        },
        Validators.required,
      ],
      Career: [
        {
          value: user?.career || Streams.Please_select_a_stream,
          disabled: !this.editCrucialInfo,
        },
      ],
      Client: [
        {
          value: user?.client,
          disabled: !this.editCrucialInfo,
        }],
      WorkStartDate: [
        {
          value: user?.workStartDate
          ? formatDate(new Date(user?.workStartDate), 'yyyy-MM-dd', 'en')
          : formatDate(new Date('0001-01-01'), 'yyyy-MM-dd', 'en'),
          disabled: !this.editCrucialInfo,
        },
      ],
      Password: [environment.defaultPassword, Validators.required],
    });
  }

  addUser() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.removeDropDownDefaults();

    this.userService.addUser('User', this.formModel.value).subscribe(
      () => {
        this.toastr.success(`${this.formModel.value?.Name} ${this.formModel.value?.Surname} was successfully added.`);
        this.modalRef.close(true);
      },
      (error) => {
        this.serverErrorHandling(error);
      }
    );
  }

  updateUser() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.removeDropDownDefaults();

    this.userService.updateUser('User', this.formModel.value).subscribe(
      () => {
        this.toastr.success(`${this.formModel.value?.Name} ${this.formModel.value?.Surname} was successfully updated.`);
        this.modalRef.close(true);
      },
      (error) => {
        this.serverErrorHandling(error);
      }
    );
  }

  serverErrorHandling(error: any) {
    switch (error?.errorCode) {
      case ServerErrorCodes.DuplicateEmail:
        this.formModel.controls['Email'].setErrors({
          duplicateEmailError: true,
        });
        this.serverErrorMessage = error?.message;
        break;
      case ServerErrorCodes.DuplicatePhoneNumber:
        this.formModel.controls['Phone'].setErrors({
          duplicatePhoneNumberError: true,
        });
        this.serverErrorMessage = error?.message;
        break;
      case ServerErrorCodes.DuplicateIdNumber:
        this.formModel.controls['IdNumber'].setErrors({
          duplicateIdNumberError: true,
        });
        this.serverErrorMessage = error?.message;
        break;
    }
    this.formModel.updateValueAndValidity();
  }

  removeDropDownDefaults() {
    if (
      this.formModel.controls['Career'].value === Streams.Please_select_a_stream
    ) {
      this.formModel.controls['Career'].patchValue('None');
    }
  }

  close() {
    this.modalRef.close();
  }

  isAllowed(role: any) {
    if (this.userRole == Roles.Manager) {
      switch (role) {
        case Roles.Manager:
          return true;
        default:
          return false;
      }
    } else if (this.userRole == Roles.HR_Admin) {
      switch (role) {
        case Roles.Manager:
        case Roles.HR_Admin:
          return true;
        default:
          return false;
      }
    } else {
      return true;
    }
  }

  isEmployee() {
    const role = this.formModel.controls['Role'].value;
    switch (role) {
      case Roles.Employee:
        return true;
      case Roles.Payroll_Admin:
        this.setLMSDefaults();
        return false;
      case Roles.HR_Admin:
      case Roles.Manager:
        this.setLMSDefaults();
        return false;
      default:
        return false;
    }
  }

  setLMSDefaults() {
    const today = Date.now();

    this.formModel.controls['Career'].patchValue(
      Streams.Please_select_a_stream
    );
    this.formModel.controls['WorkStartDate'].patchValue(
      formatDate(new Date(new Date(today).toISOString()), 'yyyy-MM-dd', 'en')
    );
  }

  isDefault(stream: any) {
    switch (stream) {
      case Streams.Please_select_a_stream:
      case Roles.Please_select_a_role:
        return true;
      default:
        return false;
    }
  }
}
