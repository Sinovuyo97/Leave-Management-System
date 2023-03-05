import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ServerErrorCodes } from '../global/server-error-codes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  exceptionObject: any | undefined = {};

  constructor(private toastr: ToastrService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorObj: any = {};
        if (error.error instanceof ErrorEvent) {
          errorObj = {
            title: 'Client side error',
            message: `${error.error.message}`
          };
        }
        else {
          this.exceptionObject = JSON.parse(error.error.message);

          errorObj = {
            title: 'Server side error',
            errorCode: this.exceptionObject?.ErrorCode,
            message: `${this.exceptionObject?.Message}`
          };
        }

        switch (this.exceptionObject?.ErrorCode) {
          case ServerErrorCodes.UserNotFound:
          case ServerErrorCodes.DuplicateEmail:
          case ServerErrorCodes.DuplicatePhoneNumber:
          case ServerErrorCodes.DuplicateIdNumber:
            break;
          default:
            this.toastr.error(errorObj?.message, errorObj?.title);
            break;
        }

        return throwError(errorObj);
      })
    )
  }
}
