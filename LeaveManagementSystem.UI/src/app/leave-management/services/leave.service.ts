import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaveTypes } from 'src/app/shared/global/leave-types';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  //mimic the response the the server
  leaveBalance =  new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {
    this.leaveBalance.next([
      {
        leaveType: LeaveTypes.Annual,
        days: 10
      },
      {
        leaveType: LeaveTypes.Family_Responsibility,
        days: 3
      },
      {
        leaveType: LeaveTypes.Sick,
        days: 5
      }
    ])
  }

  applyForLeave(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/leave`, value);
  }

  getLeaveBalance(): Observable<any> {
    return this.leaveBalance.asObservable();
  }

  getLeaveApplications(userId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/leave/${userId}`);
  }

  getLeaveToApprove(userId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/leave/approve/${userId}`);
  }

  updateLeave(leave: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/leave/${leave?.id}`, leave);
  }
  getAllLeaveApplications(){
    return this.http.get(`${environment.apiUrl}/leave`);
  }

  getLeaveBalances(userId: any) {
    return this.http.get(`${environment.apiUrl}/leave/balances/${userId}`);
  }

  uploadAttachments(value: any) : Observable <any> {

     return this.http.post(`${environment.apiUrl}/Leave/Post_Attachments`, value);
  }

  getAttachments(leave: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/leave/Get_Attachments/${leave?.Id}`);
  }

  updateLeaveRequest(value: any) {
    return this.http.put(`${environment.apiUrl}/leave`, value);
  }

}
