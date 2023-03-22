import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaveManagementModule } from './leave-management/leave-management.module';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { LoaderInterceptor } from './shared/loader/interceptor/loader.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { UsermanagementModule } from './usermanagement/usermanagement.module';
import { MasterLayoutModule } from './master-layout/master-layout.module';
import { APP_SERVICE_CONFIG, APP_CONFIG } from './shared/app-config/app-configuration.service';

@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LeaveManagementModule,
    BrowserAnimationsModule,
    UsermanagementModule,
    MasterLayoutModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
