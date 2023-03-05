import { UsermanagementComponent } from './usermanagement.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnrolComponent } from './enrol/enrol.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { PipesModule } from '../shared/pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UsermanagementComponent,
    LoginComponent,
    RegisterComponent,
    EnrolComponent,
  ],
  imports: [
    CommonModule,
    MdbModalModule,
    PipesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class UsermanagementModule {}
